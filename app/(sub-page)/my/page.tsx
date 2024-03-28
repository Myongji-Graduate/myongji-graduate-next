import LectureSearch from '@/app/ui/lecture/lecture-search';
import TakenLecture from '@/app/ui/lecture/taken-lecture';
import ContentContainer from '@/app/ui/view/atom/content-container';
import React from 'react';

export default function Page() {
  return (
    <ContentContainer className="flex">
      <div className="hidden lg:w-[30%] lg:block">정보칸</div>
      <div className="w-full lg:w-[70%] lg:px-[20px]">
        <LectureSearch />
        <TakenLecture />
      </div>
    </ContentContainer>
  );
}
