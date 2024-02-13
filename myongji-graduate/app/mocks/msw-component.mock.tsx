'use client';

// msw-component를 사용하면 streaming이 작동하지 않는 버그 발생
// 원인으로는 아마 hydrate 관련 문제로 보임, 추후 확인 필요
import { useEffect, type PropsWithChildren, useState } from 'react';

export default function MSWComponent({ children }: PropsWithChildren) {
  const [init, setInit] = useState(process.env.NODE_ENV !== 'development');

  useEffect(() => {
    async function enableMocking() {
      if (typeof window !== 'undefined') {
        const { worker } = await import('./browser.mock');

        await worker.start();
        setInit(true);
      }
    }
    if (!init) {
      enableMocking();
    }
  }, [init]);

  if (!init) {
    return null;
  }

  return <>{children}</>;
}
