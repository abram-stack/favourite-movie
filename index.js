const searchFormEl = document.getElementById('searchForm')

searchFormEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchFormData = new FormData(searchFormEl)
  const title = searchFormData.get('movieTitle')
  if (!title) {
    console.log('empty bruf')
  }
  console.log(title)
})