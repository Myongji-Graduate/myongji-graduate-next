import UploadPdf from '@/app/ui/view/molecule/upload-pdf/upload-pdf';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('성적 업로드', () => {
  it('파일이 업로드 될 때, pdf file을 업로드 하면 file명이 노출된다.', async () => {
    render(<UploadPdf />);

    const targetFile = new File(['grade'], 'grade.pdf', {
      type: 'text/plain',
    });

    const uploadBox = await screen.findByTestId('upload-box');
    await userEvent.upload(uploadBox, targetFile);

    expect(screen.getByText(targetFile.name)).toBeInTheDocument();
  });

  it('파일이 업로드 될 때, pdf가 아닌 file을 업로드 하면 변화가 발생하지않는다.', async () => {
    render(<UploadPdf />);

    const targetFile = new File(['grade'], 'grade.png', {
      type: 'text/plain',
    });

    const uploadBox = await screen.findByTestId('upload-box');
    await userEvent.upload(uploadBox, targetFile);
    expect(screen.queryByText('마우스로 드래그 하거나 아이콘을 눌러 추가해주세요.')).toBeInTheDocument();
  });
});
