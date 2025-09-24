import { twMerge } from 'tailwind-merge';

interface TagProps {
  value: string;
  onClick?: () => void;
  maxWidth?: string;
  deletable?: boolean;
}

const Tag = ({ value, onClick, maxWidth = 'max-w-32 sm:max-w-48 md:max-w-48', deletable = false }: TagProps) => {
  return (
    <div
      className={twMerge(
        `flex h-8 items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-2xl border border-primary justify-between ${maxWidth}`,
      )}
    >
      <p className="text-sm truncate whitespace-nowrap overflow-hidden">{value}</p>
      {deletable && (
        <button className="text-primary hover:text-primary/80 rounded-full" onClick={onClick} aria-label="delete">
          ×
        </button>
      )}
    </div>
  );
};

export default Tag;
