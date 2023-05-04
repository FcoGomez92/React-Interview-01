export function Card ({ movie }) {
  return (
    <li className='card'>
      <img src={movie.image} alt={'Poster of ' + movie.title + ' film'} />
      <h4 title={movie.title}>{movie.title}</h4>
      <h5>{movie.year}</h5>
    </li>
  )
}
