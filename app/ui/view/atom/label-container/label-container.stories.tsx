import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LabelContainer from './label-container';
import Button from '../button/button';

const meta = {
  title: 'ui/view/atom/Button',
  component: LabelContainer,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'LabelContainer는 기이수, 미이수 과목에 대한 정보를 나타낼 때 사용되는 view component입니다.',
    docs: {
      description: {
        component: `
- label 값으로 화면에 출력하고 싶은 text를 할당해야합니다. \n
- right element 값으로 오른쪽에 렌더링 될 요소를 할당해야합니다. \n
`,
      },
    },
  },
} satisfies Meta<typeof LabelContainer>;

export default meta;

export const TakenLectureLabel: StoryObj<typeof LabelContainer> = {
  args: {
    label: '내 기이수 과목',
    rightElement: (
      <div className="flex gap-2">
        <Button label="커스텀하기" variant="secondary" size="md" />
        <Button label="업데이트" variant="secondary" size="md" />
      </div>
    ),
  },
  render: (args) => (
    <div className="w-[800px]">
      <LabelContainer {...args} />
    </div>
  ),
};
