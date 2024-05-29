import { cn } from '@/app/utils/shadcn/utils';
import Image, { StaticImageData } from 'next/image';

export interface ImageCardProps {
  image: StaticImageData;
  title: string;
  content: string;
  className?: string;
}

function ImageCard({ image, title, content, className }: ImageCardProps) {
  return (
    <div className={cn('flex flex-col gap-2', 'md:gap-4')}>
      <Image src={image} alt={title} className={className} />
      <h5 className={cn('font-lg font-medium', 'md:text-2xl')}>{title}</h5>
      <p className={cn('text-xs', 'md:text-base')}>{content}</p>
    </div>
  );
}

export default ImageCard;
