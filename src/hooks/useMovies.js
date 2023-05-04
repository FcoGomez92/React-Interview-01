import { useState, useRef } from 'react'
import { searchMovies } from '../services/movies'
import { normalizeText } from '../helpers/helpers'
import debounce from 'just-debounce-it'

export function useMovies () {
  const prevSearch = useRef(null)
  const currentPage = useRef(1)
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [hasNextPage, setHasNextPage] = useState(null)

  const getMovies = (search) => {
    setError('')
    setHasNextPage(null)
    const query = normalizeText(search)

    if (!query) {
      setError('Empty search!')
      return
    }
    if (prevSearch.current === query) {
      setError('Not search the same twice')
      return
    }
    searchMovies({ query })
      .then(({ results, hasNextPage }) => {
        setMovies(results)
        setHasNextPage(hasNextPage)
      })
      .catch(e => {
        setError(e.message)
      })
      .finally(() => {
        currentPage.current = 1
        prevSearch.current = query
      })
  }

  const debouncedGetMovies = debounce(query => {
    getMovies(query)
  }, 1000)

  const loadMore = () => {
    const page = currentPage.current + 1
    const query = prevSearch.current

    searchMovies({ query, page })
      .then(({ results, hasNextPage }) => {
        setMovies(prevMovies => {
          const newMovies = prevMovies.concat(results)
          currentPage.current = page
          return newMovies
        })
        setHasNextPage(hasNextPage)
      })
      .catch(e => {
        setError(e.message)
      })
  }

  return { movies, getMovies, debouncedGetMovies, loadMore, hasNextPage, error }
}
