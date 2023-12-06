const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7d2a446aceb11d91875ece5f9a7f7d14&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=7d2a446aceb11d91875ece5f9a7f7d14&query="'


const form = document.getElementById("form");
const searchMovie = document.getElementById("search");
const main = document.getElementById("main");

getMovies(API_URL);

async function getMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
            console.log(data.results);
            showMovies(data.results);
        } else {
            console.log("No data");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchKeyword = searchMovie.value;

    if (searchKeyword && searchKeyword !== "") {
        getMovies(SEARCH_API + searchKeyword) ;
        searchMovie.value = "";
    } 
})

function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach(movie => {
        const {title, poster_path, overview, vote_average, release_date
        } = movie;
        
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        
        const imageOfMovie = document.createElement("img")
        imageOfMovie.src = `${IMG_PATH}${poster_path}`;
        imageOfMovie.alt = `${title}`;

        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");

            const voteOfMovie = document.createElement("span");
            voteOfMovie.classList.add(getClassByRate(vote_average));
            voteOfMovie.textContent = vote_average;

            const titleElement = document.createElement("h2");
            titleElement.textContent = title;

            movieInfo.appendChild(voteOfMovie);
            movieInfo.appendChild(titleElement);

        const overviewOfMovie = document.createElement("div");
        overviewOfMovie.classList.add("overview");

            const overviewTitle = document.createElement("h2");
            const titleSpan = document.createElement("span");
            titleSpan.textContent = "Overview";
            overviewTitle.textContent = title;
            overviewTitle.appendChild(titleSpan);

            const releaseDateParagraph = document.createElement("p");
            releaseDateParagraph.textContent = `Release Date: ${release_date}`;

            const overviewParagraph = document.createElement("p");
            overviewParagraph.textContent = overview;

            overviewOfMovie.appendChild(overviewTitle);
            overviewOfMovie.appendChild(releaseDateParagraph);
            overviewOfMovie.appendChild(overviewParagraph);

        movieElement.appendChild(imageOfMovie);
        movieElement.appendChild(movieInfo);
        movieElement.appendChild(overviewOfMovie);
        main.appendChild(movieElement);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green"
    } else if (vote >= 6) {
        return "yellow";
    } else if (vote >= 4) {
        return "orange";
    }else {
        return "red";
    }
}