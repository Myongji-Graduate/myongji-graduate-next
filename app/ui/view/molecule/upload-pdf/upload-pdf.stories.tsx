import type { Meta, StoryObj } from '@storybook/react';
import UploadPdf from './upload-pdf';

const meta = {
  title: 'ui/view/molecule/UploadFile',
  component: UploadPdf,
} satisfies Meta<typeof UploadPdf>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => <UploadPdf />,
};
