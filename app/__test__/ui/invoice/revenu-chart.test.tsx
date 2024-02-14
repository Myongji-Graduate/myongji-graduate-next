import { render, screen } from '@testing-library/react';
import RevenueChart from '../../../ui/invoice/revenu-chart';

// test sample: RSC 테스트할 때
// 참고로 정상적인 방법은 아님, next 문서를 보면 jest에서 아직 RSC를 공식적으로 지원하지 않기 때문에, RSC는 E2E 테스트를 권장하고 있음. 즉 어떤 지옥이 펼쳐질 지 모른다..
// https://nextjs.org/docs/app/building-your-application/testing/jest
describe('RevenueChart', () => {
  it('RevenueChart를 보여준다.', async () => {
    render(await RevenueChart());

    expect(await screen.findByText(/Recent Revenue/i)).toBeInTheDocument();
    expect(await screen.findByText(/2000/i)).toBeInTheDocument();
  });
});
