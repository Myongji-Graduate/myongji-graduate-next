import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TimeTable } from './index';
import type { ListRow } from '../list/list-root';

const meta = {
  title: 'ui/view/molecule/TimeTable',
  component: TimeTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 10 }}>
        <div>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TimeTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: ListRow[] = [
  {
    id: 'A1',
    classDivision: '5976',
    lectureCode: 'HEF01101',
    name: '고급웹프로그래밍',
    credit: 3,
    campus: '인문',
    year: 2025,
    semester: 2,
    maxStudent: '50',
    koreanCode: '인소102',
    department: '인공지능·소프트웨어융합대학',
    professor: '정재희',
    day1: '화요일',
    time1: '0800 - 0915',
    startMinute1: 630,
    endMinute1: 705,
    day2: '목요일',
    time2: '1030 - 1150',
    startMinute2: 630,
    endMinute2: 705,
    lectureRoom: 'S1558',
    note: '*인공지능·소프트웨어융합대학 전공이해기초교과',
  },
  {
    id: 'B1',
    classDivision: '5972',
    lectureCode: 'HEF21121',
    name: '알고리즘',
    credit: 3,
    campus: '인문',
    year: 2025,
    semester: 2,
    maxStudent: '50',
    koreanCode: '인소102',
    department: '인공지능·소프트웨어융합대학2',
    professor: '정wo희2',
    day1: '수요일',
    time1: '0830 - 1145',
    startMinute1: 630,
    endMinute1: 705,
    day2: '금요일',
    time2: '1400 - 1500',
    startMinute2: 630,
    endMinute2: 705,
    lectureRoom: 'S1558',
    note: '*인공지능·소프트웨어융합대학 전공이해기초교과2',
  },

  {
    id: 'B4',
    classDivision: '5976',
    lectureCode: 'HEF21103',
    name: '운영체제',
    credit: 3,
    campus: '인문',
    year: 2025,
    semester: 2,
    maxStudent: '50',
    koreanCode: '인소102',
    department: '인공지능·소프트웨어융합대학2',
    professor: '정wo희2',
    day1: '월요일',
    time1: '0830 - 1145',
    startMinute1: 630,
    endMinute1: 705,
    day2: '금요일',
    time2: '0800 - 1200',
    startMinute2: 630,
    endMinute2: 705,
    lectureRoom: 'S1558',
    note: '*인공지능·소프트웨어융합대학 전공이해기초교과2',
  },

  {
    id: 'B1',
    classDivision: '5976',
    lectureCode: 'HEF21104',
    name: '기초프로그래밍1',
    credit: 3,
    campus: '인문',
    year: 2025,
    semester: 2,
    maxStudent: '50',
    koreanCode: '인소102',
    department: '인공지능·소프트웨어융합대학2',
    professor: '정wo희2',
    day1: '화요일',
    time1: '1230 - 1445',
    startMinute1: 630,
    endMinute1: 705,
    day2: '월요일',
    time2: '1300 - 1400',
    startMinute2: 630,
    endMinute2: 705,
    lectureRoom: 'S1558',
    note: '*인공지능·소프트웨어융합대학 전공이해기초교과2',
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
    isEditable: false,
  },
};

export const IsEditable: Story = {
  args: {
    data: sampleData,
    isEditable: true,
  },
};
