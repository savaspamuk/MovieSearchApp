# Movie Finder

Movie Finder is a simple web application that allows users to discover popular movies and search for specific movies based on keywords. The application fetches data from The Movie Database (TMDb) API to provide real-time information about movies.

## Features

- **Discover Movies:** View a list of popular movies sorted by popularity.
- **Search Movies:** Search for movies by entering keywords.
- **Dynamic Ratings:** Movies are categorized with dynamic rating colors based on their average votes.

## How to Use

1. Open the `index.html` file in your preferred web browser.

2. Browse Popular Movies:
   - Upon opening the application, you will see a list of popular movies.
   - Each movie card includes the title, poster, average vote, release date, and a brief overview.

3. Search for Movies:
   - Use the search bar to find movies based on keywords.
   - Enter a keyword and press "Enter" to see matching results.

## API Configuration

The application uses The Movie Database (TMDb) API to fetch movie data. The API key is included in the `API_URL` and `SEARCH_API` constants. Make sure to replace the API key with your own key if needed.

```javascript
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=YOUR_API_KEY&page=1";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query="';
