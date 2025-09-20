'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/app/utils/shadcn/utils';

interface RadioGroupOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioGroupOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
}

const RadioGroup = ({ options, value, onChange, name, className }: RadioGroupProps) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex gap-3', className)}
      value={value}
      onValueChange={onChange}
      name={name}
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <RadioGroupPrimitive.Item
            value={option.value}
            id={option.value}
            className={cn(
              'h-4 w-4 rounded-full border border-gray-400',
              'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
            )}
            aria-label={option.value}
          >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full">
              <div className="h-2 w-2 rounded-full bg-white" />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
          <label htmlFor={option.value} className="text-sm text-gray-800 cursor-pointer">
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroupPrimitive.Root>
  );
};

export default RadioGroup;
