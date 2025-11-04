import React from 'react';
import Button from '@/app/ui/view/atom/button/button';
import { DetailedLecture } from '@/app/business/services/lecture-finder/lecture-finder.types';

interface ProfessorSelectorProps {
  professors: Pick<DetailedLecture, 'professor'>[];
  selectedProfessor: string;
  onSelectProfessor: (professor: string) => void;
  isMobile?: boolean;
}

export default function ProfessorSelector({
  professors,
  selectedProfessor,
  onSelectProfessor,
  isMobile = false,
}: ProfessorSelectorProps) {
  const containerClassName = isMobile ? 'flex overflow-x-auto scrollbar-hide gap-2 pr-1' : 'space-y-2';

  const buttonClassName = isMobile ? 'shrink-0 justify-center' : 'w-full justify-center';

  return (
    <div>
      <div className={`text-base ${isMobile ? '' : 'md:text-lg'} font-semibold mb-2`}>교수명</div>
      <div className={containerClassName}>
        {professors.map((lecture) => {
          const selected = lecture.professor === selectedProfessor;
          return (
            <Button
              key={lecture.professor}
              onClick={() => onSelectProfessor(lecture.professor)}
              label={lecture.professor}
              size="xs"
              variant={selected ? 'primary' : 'secondary'}
              className={`${buttonClassName} ${selected ? '' : 'bg-white hover:bg-gray-50 text-gray-800 border'}`}
              aria-pressed={selected}
            />
          );
        })}
      </div>
    </div>
  );
}
