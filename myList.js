import {
  ref,
  onValue,
  remove
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
import { database } from './appSettings.js';

const myListEl = document.getElementById('my-list');
const favsMovieDB = ref(database, 'movies');
const modalRemoveEl = document.getElementById('modal-remove')

onValue(favsMovieDB, function (snapshot) {
  if (snapshot.exists()) {
    // snapshot.val() returns objects
    const movieObj = snapshot.val();
    const moviesArray = Object.entries(movieObj);

    // by clearing the movie list first, it kinda refresh the UI, when user remove item from list
    myListEl.innerHTML = ''

    moviesArray.forEach((movie) => {
      renderHtml(movie);
    });
  } else {
    myListEl.innerHTML = `
      <div class='moviesEmpty'>
        <h2>Looks bit empty here</h2>
        <p>Let's <a href='/' class='btn btn-myList'> 🔥 🎬  ADD</a> some movies </p>
      </div>
    `
  }
  
});

async function renderHtml(movie) {
  const movieIDinDB = (movie[0])
  const movieImdbID = (movie[1])

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=616b3029&i=${movieImdbID}`
  );

  const data = await res.json();

  const { Title, Poster, Runtime, imdbRating, Genre, Plot } = data

  myListEl.innerHTML += `
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
                <button class='btn btn-add' data-remove-fav='${movieIDinDB}'>💪🏾 Remove From Watchlist</button>
              </div>
              <p class='card-description'>
                ${Plot}
              </p>
            </div>
          </div>
          `;

    //REMOVE from LIST
  myListEl.addEventListener('click', (e) => {
    if (e.target.dataset.removeFav) {
      const dataInDB = ref(database, `movies/${e.target.dataset.removeFav}`)
      remove(dataInDB)
      modalRemoveEl.style.display = 'inline'
      setTimeout(function () {
        modalRemoveEl.style.display = 'none'
      }, 3000)
    }
  })
}

