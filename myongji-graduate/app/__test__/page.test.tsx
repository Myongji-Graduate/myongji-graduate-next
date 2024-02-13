import '@testing-library/jest-dom';
import { findByText, render, screen } from '@testing-library/react';
import Home from '../page';

// test sample: RSC가 아닌 컴포넌트 테스트할 때
describe('Home', () => {
  it('Home을 렌더링한다.', async () => {
    render(<Home />);

    expect(await screen.findByText(/dashboard/i)).toBeInTheDocument();
  });
});
