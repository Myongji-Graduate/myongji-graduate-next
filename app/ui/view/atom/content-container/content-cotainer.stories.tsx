import type { Meta, StoryObj } from '@storybook/react';
import ContentContainer from './content-container';
import background from '../../../../../public/assets/background.png';
import Image from 'next/image';

const meta = {
  title: 'ui/view/atom/ContentContainer',
  component: ContentContainer,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '페이지 레이아웃을 설정하는데 사용되는 컴포넌트입니다',
  },
  argTypes: {
    children: {
      description: 'container 내부 들어갈 컴포넌트를 설정합니다.',
    },
    size: {
      description: 'ContentContainer의 size를 설정합니다.',
      table: {
        type: { summary: 'ContentContainerSize' },
        defaultValue: { summary: 'md' },
      },
      options: ['lg', 'md'],
      control: {
        type: 'radio',
      },
    },
    className: {
      description: '추가적인 스타일을 설정합니다',
    },
  },
} satisfies Meta<typeof ContentContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryButton: Story = {
  args: {
    size: 'md',
    children: <div className="h-40"></div>,
  },
  render: (args) => (
    <>
      <Image src={background} width={800} height={288} className="w-full bg-white h-[18rem]" alt="background" />
      <div className="flex justify-center">
        <ContentContainer {...args} />
      </div>
    </>
  ),
};
