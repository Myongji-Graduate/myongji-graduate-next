import type { Meta, StoryObj } from '@storybook/react';
import UploadPdf from './upload-pdf';

const meta = {
  title: 'ui/view/molecule/UploadPdf',
  component: UploadPdf,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'pdf를 업로드 할 수 있는 컴포넌트로 grade-upload 페이지에서 사용됩니다',
  },
} satisfies Meta<typeof UploadPdf>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => <UploadPdf />,
};
