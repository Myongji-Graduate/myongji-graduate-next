import featureIamge from '@/public/assets/tutorial/tutorial-feature1.png';
import type { Meta, StoryObj } from '@storybook/react';
import ImageCard, { ImageCardProps } from './image-card';

const meta = {
  title: 'ui/view/molecule/ImageCard',
  component: ImageCard,
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
