import { render, screen } from '@testing-library/react'
import RevenueChart from "../ui/invoice/revenu-chart"


describe('RevenueChart', () => {
  it('renders the chart', async () => {
    render( await RevenueChart());

    expect(await screen.findByText(/Recent Revenue/i)).toBeInTheDocument()
    expect(await screen.findByText(/2000/i)).toBeInTheDocument()
  })
})