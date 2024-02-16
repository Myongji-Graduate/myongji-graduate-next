import { twMerge } from 'tailwind-merge';

type ListRowProps = {
  columns: string[];
  invalid?: boolean;
};
export function ListRow({ columns, invalid = false }: ListRowProps) {
  return (
    <div className="flex border-solid border-gray-300 border-b-[1px] items-center last:border-b-0">
      {columns.map((column, index) => (
        <div
          key={index}
          className={twMerge(
            'text-center my-4 font-medium text-lg text-[#2f2f2f]',
            columns.length === 5 ? 'w-[19%]' : 'w-[33%]',
            invalid ? 'text-red-500' : 'text-[#2f2f2f]',
          )}
        >
          {column}
        </div>
      ))}
    </div>
  );
}
