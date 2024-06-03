import { cn } from '@/app/utils/shadcn/utils';

function TitleBox({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className={cn('text-lg font-bold', 'md:text-2xl')}>{title}</h1>
      <div className="bg-primary h-1 w-10 text-center rounded-md"></div>
      {children}
    </div>
  );
}

export default TitleBox;
