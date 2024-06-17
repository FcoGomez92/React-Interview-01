import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { Card } from './Card'

describe('Card tests:', () => {
  const movie = {
    id: 'tt0848228',
    title: 'The Avengers',
    year: '2012',
    image: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
  }

  afterEach(cleanup)

  it('Render movie data properly', () => {
    render(<Card movie={movie} />)

    screen.getByAltText('Poster of The Avengers film')
    screen.getByText('The Avengers')
    screen.getByText('2012')
  })
})
