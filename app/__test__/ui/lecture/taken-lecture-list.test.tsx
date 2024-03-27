import LectureSearch from '@/app/ui/lecture/lecture-search';
import TakenLecture from '@/app/ui/lecture/taken-lecture';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Taken lecture list', () => {
  it('기이수 과목 리스트를 보여준다.', async () => {
    render(await TakenLecture());
    expect(await screen.findByTestId('table-data'));
  });

  it('커스텀하기 버튼을 클릭하면 기이수 과목 리스트가 변경되며 과목 검색 컴포넌트가 렌더링된다.', async () => {
    //given
    render(await TakenLecture());
    render(<LectureSearch />);

    //when
    const customButton = await screen.findByTestId('custom-button');
    await userEvent.click(customButton);

    //then
    const deleteButton = await screen.findAllByTestId('taken-lecture-delete-button');
    expect(deleteButton[0]).toBeInTheDocument();

    const lectureSearchComponent = await screen.findByTestId('lecture-search-component');
    expect(lectureSearchComponent).toBeInTheDocument();
  });

  it('커스텀 시 삭제 버튼을 클릭하면 해당하는 lecture가 사라진다', async () => {
    //given
    render(await TakenLecture());

    const customButton = await screen.findByTestId('custom-button');
    await userEvent.click(customButton);

    //when
    const deleteButton = await screen.findAllByTestId('taken-lecture-delete-button');
    await userEvent.click(deleteButton[0]);

    //then
    expect(screen.queryByText('딥러닝')).not.toBeInTheDocument();
  });
});
