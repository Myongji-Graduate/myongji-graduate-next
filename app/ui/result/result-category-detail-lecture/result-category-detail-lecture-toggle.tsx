'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/app/utils/shadcn/utils';

const ResultCategoryDetailLectureToggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'relative peer p-1 inline-flex h-10 w-20 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-200',
      className,
    )}
    {...props}
    ref={ref}
  >
    <div className={cn('z-1 absolute text-white text-base', props.checked ? 'left-1' : 'right-1')}>
      {props.checked ? '기이수' : '미이수'}
    </div>
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-11 data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
));

ResultCategoryDetailLectureToggle.displayName = SwitchPrimitives.Root.displayName;

export { ResultCategoryDetailLectureToggle };
