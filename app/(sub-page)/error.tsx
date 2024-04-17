'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  if (error.message === 'Unauthorized') {
    return (
      <div>
        <h2>Unauthorized</h2>
        <Link href="/sign-in">to Login</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Something went wrong!!!!!</h2>
      <button
        onClick={
          // 세그먼트를 재 렌더링 하여 복구를 시도합니다.
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
