import { ReactNode } from 'react';

interface LabelContainerProps {
  label: string;
  rightElement: ReactNode;
}

export default function LabelContainer({ label, rightElement }: LabelContainerProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="rounded-[100px] bg-light-blue-6 p-2.5 text-white lg:text-sm xl:text-base 2xl:text-lg font-semibold">
        {label}
      </div>
      {rightElement}
    </div>
  );
}
