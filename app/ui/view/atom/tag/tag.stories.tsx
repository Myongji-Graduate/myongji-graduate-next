import { Meta, StoryObj } from '@storybook/react';
import Tag from './tag';

const meta = {
  title: 'ui/view/atom/tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Tag는 텍스트를 표시하고 필요시 삭제할 수 있는 UI 컴포넌트입니다.',
  },
  argTypes: {
    value: {
      description: '화면에 출력하고 싶은 text를 설정합니다.',
    },
    deletable: {
      description: '삭제가 가능한지 여부를 설정합니다.',
    },
    onClick: {
      description: '삭제가 가능한 경우, 삭제 버튼을 눌렀을 때 실행할 함수를 설정합니다.',
    },
    maxWidth: {
      description: 'max width와 관련한 설정을 할 수 있습니다.',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

export const SearchWordTag: StoryObj<typeof Tag> = {
  args: {
    value: '김일주',
    deletable: true,
    onClick: () => console.log('삭제 버튼 클릭'),
    maxWidth: 'max-w-32 sm:max-w-48 md:max-w-48',
  },
};
