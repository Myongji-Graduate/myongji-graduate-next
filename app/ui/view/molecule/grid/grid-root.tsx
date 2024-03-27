import { cva } from 'class-variance-authority';
import { ReactNode } from 'react';

export type ColType = 3 | 4 | 5 | 6 | 'custom';

type GridRootProps = {
  children: ReactNode;
  cols: ColType;
};

export const GridVariants = cva('grid', {
  variants: {
    cols: {
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      custom: 'grid-cols-custom',
    },
  },
});
export function GridRoot({ children, cols = 3 }: GridRootProps) {
  return <div className={GridVariants({ cols })}>{children}</div>;
}
