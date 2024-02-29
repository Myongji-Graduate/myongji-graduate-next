import TakenLectureList from '@/app/ui/lecture/taken-lecture-list';
import { render, screen } from '@testing-library/react';

describe('Taken lecture list', () => {
  it('기이수 과목 리스트를 보여준다.', async () => {
    render(await TakenLectureList());
    expect(await screen.findByTestId('table-data'));
  });
});
