import React from 'react';
import Button from '@/app/ui/view/atom/button/button';
import { DetailedLecture } from '@/app/business/services/lecture-finder/lecture-finder.types';

interface ProfessorSelectorProps {
  professors: Pick<DetailedLecture, 'professor'>[];
  selectedProfessor: string;
  onSelectProfessor: (p: string) => void;
  isMobile?: boolean;
}

export default function ProfessorSelector({
  professors,
  selectedProfessor,
  onSelectProfessor,
  isMobile = false,
}: ProfessorSelectorProps) {
  return (
    <div>
      {isMobile ? (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide ">
          {professors.map(({ professor }) => {
            const selected = professor === selectedProfessor;
            return (
              <Button
                key={professor}
                size="xs"
                label={professor}
                onClick={() => onSelectProfessor(professor)}
                variant={selected ? 'primary' : 'secondary'}
                className={`shrink-0 ${!selected && 'bg-white border text-gray-800 hover:bg-gray-50'}`}
              />
            );
          })}
        </div>
      ) : (
        <div className="space-y-2 pb-2 pr-1">
          {professors.map(({ professor }) => {
            const selected = professor === selectedProfessor;
            return (
              <Button
                key={professor}
                size="xs"
                label={professor}
                onClick={() => onSelectProfessor(professor)}
                variant={selected ? 'primary' : 'secondary'}
                className={`w-full md:w-25 whitespace-nowrap ${!selected && 'bg-white border text-gray-800 hover:bg-gray-50'}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
