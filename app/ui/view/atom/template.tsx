import { twMerge } from 'tailwind-merge';

interface TemplateProps {
  children: React.ReactNode;
  size?: 'md' | 'lg';
  className?: string;
}

export default function Template({ children, size = 'md', className }: TemplateProps) {
  return (
    <div
      className={twMerge(
        'absolute bg-white top-[7rem] z-10 rounded-xl p-[1.5rem] shadow-lg max-md:w-full',
        size === 'md' ? 'md:w-[70%]' : 'md:w-[80%]',
        className,
      )}
    >
      {children}
    </div>
  );
}
