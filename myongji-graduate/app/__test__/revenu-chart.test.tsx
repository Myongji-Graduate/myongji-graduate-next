import { render, screen } from '@testing-library/react';
import RevenueChart from '../ui/invoice/revenu-chart';

// test sample: RSC 테스트할 때
describe('RevenueChart', () => {
  it('RevenueChart를 보여준다.', async () => {
    render(await RevenueChart());

    expect(await screen.findByText(/Recent Revenue/i)).toBeInTheDocument();
    expect(await screen.findByText(/2000/i)).toBeInTheDocument();
  });
});
