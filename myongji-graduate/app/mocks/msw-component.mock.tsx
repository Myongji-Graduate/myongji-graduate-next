'use client';
import { useEffect, type PropsWithChildren, useState } from 'react';

export default function MSWComponent({ children }: PropsWithChildren) {
  const [init, setInit] = useState(process.env.NODE_ENV !== 'development');

  useEffect(() => {
    async function enableMocking() {
      if (typeof window !== 'undefined') {
        const { worker } = await import('./browser.mock');

        await worker.start();
        
      } else {
        const { server } = await import('./server.mock');
    
        await server.listen();
      }
      setInit(true);
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
