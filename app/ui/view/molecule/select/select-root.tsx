import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import React, { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { getInputColors } from '@/app/utils/style/color.util';

export interface SelectProps extends React.HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  defaultValue?: string;
  name?: string;
  icon?: React.ElementType;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onValueChange?: (value: unknown) => void;
}

export const SelectRoot = React.forwardRef<HTMLInputElement, SelectProps>(function Select(
  { defaultValue, icon, error = false, errorMessage, disabled = false, name, children, placeholder, onValueChange },
  ref,
) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
  const Icon = icon;
  console.log(selectedValue);

  const selectedPlaceholder = useMemo(() => {
    const reactElementChildren = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child.props.value === selectedValue,
    );
    return reactElementChildren.length > 0
      ? (reactElementChildren[0] as React.ReactElement).props.placeholder
      : placeholder;
  }, [selectedValue, children]);

  return (
    <div className="w-full min-w-[10rem] relative text-base">
      <Listbox
        as="div"
        ref={ref}
        value={selectedValue}
        onChange={(value: string) => {
          onValueChange?.(value);
          setSelectedValue(value);
        }}
        disabled={disabled}
        name={name}
        className="relative"
      >
        <Listbox.Button
          className={twMerge(
            'w-full min-w-[10rem] outline-none text-left whitespace-nowrap truncate rounded-xl focus:ring-2 transition duration-100 border pr-8 py-2',
            'border-gray-800 shadow-sm focus:border-blue-400 focus:ring-blue-200 text-gray-700',
            Icon ? 'pl-10' : 'pl-3',
            getInputColors(disabled, error),
          )}
        >
          {Icon && (
            <span className="absolute inset-y-0 left-0 flex items-center ml-px pl-2.5">
              <Icon className={twMerge('flex-none h-5 w-5', 'text-gray-600')} />
            </span>
          )}
          <span className={twMerge('block truncate p-0', disabled && 'text-gray-6')}>{selectedPlaceholder}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center mr-3">
            <ChevronUpDownIcon className={twMerge('flex-none h-5 w-5', 'text-gray-400')} />
          </span>
        </Listbox.Button>

        <Transition
          className="absolute z-10 w-full"
          enter="transition ease duration-100 transform"
          enterFrom="opacity-0 -translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease duration-100 transform"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-4"
        >
          <Listbox.Options
            className={twMerge(
              'divide-y overflow-y-auto outline-none rounded-lg max-h-[228px] left-0 border my-1',
              'bg-white border-gray-200 divide-gray-200 shadow-md	',
            )}
          >
            {children}
          </Listbox.Options>
        </Transition>
      </Listbox>
      {error && errorMessage ? <p className={'text-sm text-rose-500 mt-1'}>{errorMessage}</p> : null}
    </div>
  );
});
