import { twMerge } from 'tailwind-merge';

interface ContentContainerProps {
  children: React.ReactNode;
  size?: 'md' | 'lg';
  style?: string;
}

export default function ContentContainer({ children, size = 'md', style }: ContentContainerProps) {
  return (
    <div
      className={twMerge(
        'absolute bg-white top-[7rem] zIndex-1 rounded-xl p-[1.5rem] shadow-lg max-md:w-full',
        size === 'md' ? 'md:w-[70%]' : 'md:w-[80%]',
        style,
      )}
    >
      {children}
    </div>
  );
}
