import { ReactNode } from 'react';

type LabelContainerProps = {
  label: string;
  rightElement: ReactNode;
};

export default function LabelContainer({ label, rightElement }: LabelContainerProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="rounded-[100px] bg-light-blue-6 p-2.5 text-white text-lg font-bold">{label}</div>
      {rightElement}
    </div>
  );
}
