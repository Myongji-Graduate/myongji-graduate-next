import TakenLecture from '@/app/ui/lecture/taken-lecture';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Taken lecture list', () => {
  it('기이수 과목 리스트를 보여준다.', async () => {
    render(await TakenLecture());
    expect(await screen.findByTestId('table-data'));
  });
  it('커스텀하기 클릭 시 기이수 과목 리스트가 변경된다.', async () => {
    render(await TakenLecture());

    const customButton = await screen.findByTestId('custom-button');
    userEvent.click(customButton);

    const deleteButton = await screen.findAllByTestId('taken-lecture-delete-button');
    expect(deleteButton[0]).toBeInTheDocument();
  });
  it('삭제 버튼 클릭 시 해당하는 lecture가 사라진다', async () => {
    render(await TakenLecture());

    const customButton = await screen.findByTestId('custom-button');
    userEvent.click(customButton);

    const deleteButton = await screen.findAllByTestId('taken-lecture-delete-button');
    await userEvent.click(deleteButton[0]);

    expect(screen.queryByText('딥러닝')).not.toBeInTheDocument();
  });
});
