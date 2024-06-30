import type { Meta, StoryObj } from '@storybook/react';
import UploadPdf from './upload-pdf';

const meta = {
  title: 'ui/view/molecule/UploadPdf',
  component: UploadPdf,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      'pdf를 click이나 drag&drop을 통해 업로드 할 수 있는 컴포넌트입니다. 파일을 등록한 경우에는 파일 명이 노출됩니다.',
  },
} satisfies Meta<typeof UploadPdf>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => <UploadPdf />,
};
