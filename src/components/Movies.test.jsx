import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Movies } from './Movies'
import response1 from '../mocks/response1.json'

const movies = response1.Search.map(m => ({
  id: m.imdbID,
  title: m.Title,
  year: m.Year,
  image: m.Poster
}))

describe('Movies tests:', () => {
  afterEach(cleanup)

  it('Should render load more button when hasNextPage is true', () => {
    render(<Movies movies={movies} hasNextPage />)

    screen.getByText('Load More')
  })

  it('Should render the final text when hasNextPage is false', () => {
    render(<Movies movies={movies} hasNextPage={false} />)

    screen.getByText('All results loaded')
  })

  it('Should call loadMoreMocked when load more button is clicked', async () => {
    const loadMoreMocked = vi.fn()
    render(<Movies movies={movies} hasNextPage loadMore={loadMoreMocked} />)

    const loadMoreBtn = screen.getByText('Load More')
    await userEvent.click(loadMoreBtn)

    expect(loadMoreMocked).toHaveBeenCalled()
  })
})
