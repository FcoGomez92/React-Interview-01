import { Card } from './Card'

export function Movies ({ movies, hasNextPage, loadMore }) {
  return (
    <main className='movies-container'>
      <ul className='movies-list'>
        {movies.map(movie => <Card key={movie.id} movie={movie} />)}
      </ul>
      <aside>
        {hasNextPage ? <button onClick={loadMore}>Load More</button> : <p>All results loaded</p>}
      </aside>
    </main>
  )
}
