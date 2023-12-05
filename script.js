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
    } else {
        window.location.reload();
    }
})

function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach(movie => {
        const {title, poster_path, overview, vote_average, release_date
        } = movie;
        
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${IMG_PATH}${poster_path}" alt="${title}">
            </div>
            <div class="movie-info">
                
                <span class="${getClassByRate(vote_average)}">${vote_average}</span><h2>${title}</h2>
            </div>
            <div class="overview">
                <h2>${title} <span>Overview</span></h2><p>Release Date: ${release_date}</p>
                <p>${overview}</p>
            </div>`;

        main.appendChild(movieElement);
    });
}

/*const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        
        const imageOfMovie = document.createElement("img")
        imageOfMovie.src = `${IMG_PATH}${poster_path}`;
        imageOfMovie.alt = `${title}`;

        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");
        movieInfo.innerHTML = `<span class="${getClassByRate(vote_average)}">${vote_average}</span><h2>${title}</h2>`;

        const overviewOfMovie = document.createElement("div");
        overviewOfMovie.classList.add("overview");
        overviewOfMovie.innerHTML = `<h2>${title} <span>Overview</span></h2><p>Release Date: ${release_date}</p>
        <p>${overview}</p>`;

        main.appendChild(imageOfMovie);
        main.appendChild(movieInfo);
        main.appendChild(overviewOfMovie);*/

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