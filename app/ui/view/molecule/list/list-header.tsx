import { twMerge } from 'tailwind-merge';

type ListHeaderProps = {
  columns: string[];
};

export function ListHeader({ columns }: ListHeaderProps) {
  return (
    <div className="flex bg-[#e7ebff] h-[56px] rounded-[100px] items-center">
      {columns.map((column, index) => (
        <div
          key={index}
          className={twMerge(
            'text-[#7590ff] leading-4 text-lg font-bold w-[19%] text-center',
            columns.length === 5 ? 'w-[19%]' : 'w-[33%]',
          )}
        >
          {column}
        </div>
      ))}
    </div>
  );
}
