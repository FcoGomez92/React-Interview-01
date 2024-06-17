import { vi, describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMovies } from './useMovies'
import { searchMovies } from '../services/movies'
import response1 from '../mocks/response1.json'
import response2 from '../mocks/response2.json'

vi.mock('../services/movies', () => ({
  searchMovies: vi.fn()
}))
const mockResults = response1.Search.map(m => ({
  id: m.imdbID,
  title: m.Title,
  year: m.Year,
  image: m.Poster
}))
const mockResultsPage2 = response2.Search.map(m => ({
  id: m.imdbID,
  title: m.Title,
  year: m.Year,
  image: m.Poster
}))

const mockHasNextPage = true

describe('useMovies Hook', () => {
  it('should set error message when search query is empty', async () => {
    const { result } = renderHook(() => useMovies())
    expect(result.current.error).toBe('')

    act(() => {
      result.current.getMovies('')
    })

    expect(result.current.error).toBe('Empty search!')
  })

  it('Should update movies and hasNextPage on successful search', async () => {
    searchMovies.mockResolvedValueOnce({ results: mockResults, hasNextPage: mockHasNextPage })

    const { result } = renderHook(() => useMovies())
    expect(result.current.movies).toEqual([])
    expect(result.current.hasNextPage).toBe(null)

    await act(async () => {
      result.current.getMovies('The Godfather')
    })

    expect(searchMovies).toHaveBeenCalledWith({ query: 'the godfather' })

    expect(result.current.movies).toEqual(mockResults)
    expect(result.current.hasNextPage).toBe(mockHasNextPage)
  })

  it('should set error message when searching the same query twice', async () => {
    searchMovies.mockResolvedValueOnce({ results: mockResults, hasNextPage: mockHasNextPage })
    const { result } = renderHook(() => useMovies())

    await act(async () => {
      result.current.getMovies('The Godfather')
    })

    expect(result.current.error).toBe('')

    act(() => {
      result.current.getMovies('The Godfather')
    })
    expect(result.current.error).toBe('Not search the same twice')
  })

  it('should set error message when searchMovies throws an error', async () => {
    const errorMessage = 'Movie not found!'
    searchMovies.mockRejectedValueOnce(new Error(errorMessage))

    const { result } = renderHook(() => useMovies())
    expect(result.current.error).toBe('')

    await act(async () => {
      result.current.getMovies('basfhiauenfhui')
    })

    expect(result.current.error).toBe(errorMessage)
  })

  it('Should increment movies when loadMore is called', async () => {
    searchMovies.mockResolvedValueOnce({ results: mockResults, hasNextPage: mockHasNextPage })
    const { result } = renderHook(() => useMovies())

    await act(async () => {
      result.current.getMovies('The Godfather')
    })

    expect(result.current.movies).toHaveLength(10)

    searchMovies.mockResolvedValueOnce({ results: mockResultsPage2, hasNextPage: mockHasNextPage })

    await act(async () => {
      result.current.loadMore()
    })

    expect(result.current.movies).toHaveLength(20)
  })
})
