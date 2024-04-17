'use client';
import { useEffect } from 'react';

// https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
// global-error는 프로덕션에서만 활성화
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>Something went wrong!!!!!</h2>
        <button
          onClick={
            // 세그먼트를 재 렌더링 하여 복구를 시도합니다.
            () => reset()
          }
        >
          Try again
        </button>
      </body>
    </html>
  );
}
