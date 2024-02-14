import { Listbox } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

type SelectItemProps = {
  value: string;
  placeholder: string;
};

export function SelectItem({ value, placeholder }: SelectItemProps) {
  return (
    <Listbox.Option
      className={twMerge(
        'flex justify-start items-center cursor-default text-base px-2.5 py-2.5',
        'hover:bg-gray-100 text-gray-700 ui-selected:bg-gray-200 ',
      )}
      value={value}
    >
      <span className="whitespace-nowrap truncate">{placeholder}</span>
    </Listbox.Option>
  );
}
