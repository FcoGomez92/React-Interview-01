import { afterEach, describe, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { App } from './App.jsx'

describe('App render tests:', () => {
  afterEach(cleanup)

  it('Should render', () => {
    render(<App />)
  })

  it('Should render the title', () => {
    render(<App />)

    screen.getByText('Movies searcher!')
  })
})
