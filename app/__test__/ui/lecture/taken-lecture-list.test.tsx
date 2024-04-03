import TakenLecture from '@/app/ui/lecture/taken-lecture';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Taken lecture list', () => {
  it('기이수 과목 리스트를 보여준다.', async () => {
    render(await TakenLecture());
    expect(await screen.findAllByTestId('table-data'));
  });
  it('기이수 과목 리스트에서 과목 삭제를 클릭하면 과목이 삭제된다.', async () => {
    //when
    render(await TakenLecture());
    const deleteButton = await screen.findAllByTestId('taken-lecture-delete-button');

    //given
    await userEvent.click(deleteButton[0]);

    //then
    expect(screen.queryByText('인공지능')).not.toBeInTheDocument();
  });
});
