const searchFormEl = document.getElementById('searchForm');
const movieTitleEl = document.getElementById('movieTitle');
const searchBtnEl = document.getElementById('searchBtn');

searchBtnEl.addEventListener('click', handleSearch);

async function handleSearch() {
  if (movieTitleEl) {
    // console.log(movieTitleEl.value)
    const movies = await getMoviesByTitle(movieTitleEl.value);
    movies.forEach((movie) => {
      renderHtml(movie)
      // renderhtml() every loop 
        // in renderhtml() we req to API for movie detail by ID
    });
  }
}

async function getMoviesByTitle(title) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=616b3029&s=${title}`
  );
  // const res = await fetch(`https://www.omdbapi.com/?apikey=616b3029&t=${title}`)
  const data = await res.json();

  return data.Search;
}

async function renderHtml(movie) {
  let htmlString = ''
  
  const res = await fetch(`https://www.omdbapi.com/?apikey=616b3029&i=${movie.imdbID}`)
  const movieDetails = await res.json()

  const { Title, Poster, Runtime, imdbRating, Genre, Plot } = movieDetails
  console.log(Title, Poster, Runtime, imdbRating, Genre)
}
