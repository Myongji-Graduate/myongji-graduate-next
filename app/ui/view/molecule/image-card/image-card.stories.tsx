import featureIamge from '@/public/assets/tutorial/tutorial-feature1.png';
import type { Meta, StoryObj } from '@storybook/react';
import ImageCard, { ImageCardProps } from './image-card';

const meta = {
  title: 'ui/view/molecule/ImageCard',
  component: ImageCard,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '요소는 이미지, 제목 그리고 설명 제공되는 경우에 사용됩니다.',
  },
  argTypes: {
    image: {
      description: 'ImageCard의 이미지를 설정할 수 있습니다.',
    },
    title: {
      description: 'ImageCard의 title 내용을 설정할 수 있습니다.',
    },
    content: {
      description: 'ImageCard의 content 내용을 설정할 수 있습니다.',
    },
  },
} as Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: featureIamge,
    title: 'first',
    content: '강의 커스텀을 통한 졸업 사정 예측',
  },
  render: (args: ImageCardProps) => <ImageCard {...args} />,
};
