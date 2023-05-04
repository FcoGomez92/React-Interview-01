const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY
const API_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=movie&s=`
const MAX_RESULTS_PER_PAGE = 10

export function searchMovies ({ query, page = 1 }) {
  const url = API_URL + encodeURI(query) + `&page=${page}`
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.Error) {
        throw new Error(data.Error)
      }

      const maxPage = Math.ceil(data.totalResults / MAX_RESULTS_PER_PAGE)
      const hasNextPage = page < maxPage
      const results = data.Search.map(m => ({
        id: m.imdbID,
        title: m.Title,
        year: m.Year,
        image: m.Poster
      }))
      return { results, hasNextPage }
    })
}
