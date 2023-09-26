const searchFormEl = document.getElementById('searchForm');
const movieTitleEl = document.getElementById('movieTitle');
const searchBtnEl = document.getElementById('searchBtn');
const moviesListEl = document.getElementById('movies-list')
const moviesSubEl = document.getElementById('movies-subtitle')
const addFavMovieEl = document.getElementById('add-fav-movie')
const moviesContainer = document.getElementById('movies-container')

// DB Config Firestore
import { ref, push } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'
import {database } from './appSettings.js'

const favsMovieDB = ref(database, 'movies')


// SEARCH for Movies
searchBtnEl.addEventListener('click', handleSearch);


async function handleSearch() {
  moviesListEl.innerHTML = ``
  moviesSubEl.innerHTML = 'Movies'

  if (movieTitleEl.value && movieTitleEl.value.length >= 3) {
    const movies = await getMoviesByTitle(movieTitleEl.value);
    movies.forEach((movie) => {
      renderHtml(movie);
    });
    
    movieTitleEl.value = ''
  }
  else {
    moviesSubEl.innerHTML = 'Please Enter Movies Title(at least 2 Characters)'
  }
}

async function getMoviesByTitle(title) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=616b3029&s=${title}`
  );

  const data = await res.json();
  return data.Search;
}

async function renderHtml(movie) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=616b3029&i=${movie.imdbID}`
    );
    const movieDetails = await res.json();
    
    let { Title, Poster, Runtime, imdbRating, Genre, Plot, imdbID } = movieDetails;

     moviesListEl.innerHTML += `  
          <div class='card'>
            <div class='card-poster'>
              <img src='${Poster}' />
            </div>
            <div class='card-content'>
              <div class='card-content-header'>
                <h3 class='card-title'>${Title}</h3>
                <p class='card-rate'> 🎖 ${imdbRating}</p>
              </div>
              <div class='card-content-action'>
                <p>${Runtime} min</p>
                <p>${Genre}</p>
                <button class='btn btn-add' data-add-fav='${imdbID}'>🤙🏾 Add To Watchlist</button>
              </div>
              <p class='card-description'>
                ${Plot}
              </p>
            </div>
          </div>
          `;
}
moviesContainer.addEventListener('click', function (e) {
  if (e.target.dataset.addFav) {
    push(favsMovieDB, e.target.dataset.addFav)

  }
})