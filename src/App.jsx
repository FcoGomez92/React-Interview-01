import './style.css'
import { useRef } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { Form } from './components/Form'

export function App () {
  const searchInputRef = useRef(null)
  const { movies, getMovies, debouncedGetMovies, loadMore, hasNextPage, error } = useMovies()

  const handleSubmit = (e) => {
    e.preventDefault()

    getMovies(searchInputRef.current.value)
  }

  const handleInputChange = () => {
    debouncedGetMovies(searchInputRef.current.value)
  }

  return (
    <div className='app-container'>
      <header>
        <h1>Movies searcher!</h1>
        <Form searchInputRef={searchInputRef} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        {error && <p className='error'>{error}</p>}
      </header>
      {movies && movies.length > 0 && <Movies movies={movies} hasNextPage={hasNextPage} loadMore={loadMore} />}
    </div>
  )
}
