import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from './Form'
import { createRef } from 'react'

const mocked = {
  submit: (e) => {
    e.preventDefault()
    console.log('Submited!')
  },
  change: () => {
    console.log('Input changed!')
  }
}

describe('Form tests:', () => {
  afterEach(cleanup)

  it('Should render a text input and a search button', () => {
    render(<Form />)

    screen.getByPlaceholderText('The godfather, The great beauty, The hand of god...')
    screen.getByText('Search')
  })

  it('Should call handleSubmit on search button click', async () => {
    const handleSubmitMocked = vi.spyOn(mocked, 'submit')
    render(<Form handleSubmit={handleSubmitMocked} />)

    const searchButton = screen.getByText('Search')
    await userEvent.click(searchButton)

    expect(handleSubmitMocked).toHaveBeenCalled()
  })

  it('Should call handleInputChange on input change', async () => {
    const handleInputChangeMocked = vi.spyOn(mocked, 'change')
    render(<Form handleInputChange={handleInputChangeMocked} />)

    const input = screen.getByPlaceholderText('The godfather, The great beauty, The hand of god...')
    await userEvent.type(input, 'The Godfather')

    expect(handleInputChangeMocked).toHaveBeenCalled()
  })

  it('Should updates ref value on input change', async () => {
    const searchInputRef = createRef(null)
    render(<Form searchInputRef={searchInputRef} />)

    const input = screen.getByPlaceholderText('The godfather, The great beauty, The hand of god...')
    await userEvent.type(input, 'The Godfather')

    expect(searchInputRef.current.value).toBe('The Godfather')
  })
})
