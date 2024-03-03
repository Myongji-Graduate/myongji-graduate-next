import type { Meta, StoryObj } from '@storybook/react';
import UploadFile from './upload-file';

const meta = {
  title: 'ui/view/molecule/UploadFile',
  component: UploadFile,
} satisfies Meta<typeof UploadFile>;

export default meta;

interface UploadFileProps {
  file: File | null;
  changeFile: (file: File) => void;
}

export const WithFileForm: StoryObj<typeof meta> = {
  args: {
    file: new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    }),
  },
  render: (args: UploadFileProps) => <UploadFile {...args} />,
};

export const EmptyForm: StoryObj<typeof meta> = {
  args: {
    file: null,
  },
  render: (args: UploadFileProps) => <UploadFile {...args} />,
};
