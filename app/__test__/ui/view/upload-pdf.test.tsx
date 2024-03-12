import UploadPdf from '@/app/ui/view/molecule/upload-pdf/upload-pdf';
import { render, screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';

describe('성적 업로드', () => {
  it('pdf가 아닌 파일을 업로드할 수 없다', async () => {
    render(<UploadPdf />);

    const targetFile = new File(['grade'], 'grade.pdf', {
      type: 'text/plain',
    });

    const uploadBox = await screen.findByTestId('upload-box');
    fireEvent.upload(uploadBox, targetFile);

    expect(screen.queryByText('추가')).not.toBeInTheDocument();
  });
});
