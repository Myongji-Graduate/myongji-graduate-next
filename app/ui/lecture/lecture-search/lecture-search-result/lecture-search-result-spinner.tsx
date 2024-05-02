import LoadingSpinner from '@/app/ui/view/atom/loading-spinner';

export function LectureSearchResultSpinner() {
  return (
    <div
      className={'rounded-xl border-[1px] border-gray-300 w-full h-72 overflow-auto flex justify-center items-center'}
    >
      <LoadingSpinner
        className={'animate-spin shrink-0 h-12 w-12 mr-1.5 -ml-1 fill-gray-400'}
        style={{ transition: `width 150ms` }}
      />
    </div>
  );
}
