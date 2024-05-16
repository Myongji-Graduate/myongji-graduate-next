import Skeleton from '../../view/atom/skeleton';

function UserInfoCardSkeleton() {
  return (
    <>
      <Skeleton className="h-10" />
      <div className="flex my-4 py-4 justify-between items-center">
        <div className="flex gap-4 md:gap-14">
          <ul className="flex flex-col gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={`${index}-title`}>
                <Skeleton className="h-8 w-28" />
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={`${index}-value`}>
                <Skeleton className="h-8 w-28" />
              </li>
            ))}
          </ul>
        </div>
        <div className="md:px-10">
          <Skeleton className="h-40 w-40" />
        </div>
      </div>
      <Skeleton className="h-4 w-30" />
    </>
  );
}

export default UserInfoCardSkeleton;
