import { twMerge } from 'tailwind-merge';

interface ContentContainerProps {
  children: React.ReactNode;
  size?: 'md' | 'lg';
  className?: string;
}

export default function ContentContainer({ children, size = 'md', className }: ContentContainerProps) {
  return (
    <div
      className={twMerge(
        'bg-white -mt-[11rem] rounded-xl shadow-lg max-md:w-full z-10 pb-5 mb-12',
        size === 'md' ? 'md:w-[70%]' : 'md:w-[80%]',
        className,
      )}
    >
      {children}
    </div>
  );
}
