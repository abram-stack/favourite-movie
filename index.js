const searchFormEl = document.getElementById('searchForm');
const movieTitleEl = document.getElementById('movieTitle');
const searchBtnEl = document.getElementById('searchBtn');
const moviesListEl = document.getElementById('movies-list')
const moviesSubEl = document.getElementById('movies-subtitle')

searchBtnEl.addEventListener('click', handleSearch);

async function handleSearch() {
  moviesListEl.innerHTML = ``
  moviesSubEl.innerHTML = 'Movies'

  if (movieTitleEl) {
    const movies = await getMoviesByTitle(movieTitleEl.value);
    
    movies.forEach((movie) => {
      renderHtml(movie);
    });

  movieTitleEl.value = ''
  }
}

async function getMoviesByTitle(title) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=616b3029&s=${title}`
  );

  const data = await res.json();
  console.log(`API call ${title}`)
  return data.Search;
}

async function renderHtml(movie) {

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=616b3029&i=${movie.imdbID}`
    );
    const movieDetails = await res.json();
    
    let { Title, Poster, Runtime, imdbRating, Genre, Plot } = movieDetails;
    console.log(Title)

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
                <button class='btn btn-add'>🤙🏾 Add To Watchlist</button>
              </div>
              <p class='card-description'>
                ${Plot}
              </p>
            </div>
          </div>
          `;
}

