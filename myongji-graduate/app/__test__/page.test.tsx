import '@testing-library/jest-dom'
import { findByText, render, screen } from '@testing-library/react'
import Home from '../page'

describe('Page', () => {
  it('renders a heading', async () => {
    render(<Home />)
  
    expect(await screen.findByText(/dashboard/i)).toBeInTheDocument()
  })
})