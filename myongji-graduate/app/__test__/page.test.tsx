import '@testing-library/jest-dom'
import { findByText, render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home', () => {
  it('Home을 렌더링한다.', async () => {
    render(<Home />)
  
    expect(await screen.findByText(/dashboard/i)).toBeInTheDocument()
  })
})