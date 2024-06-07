'use client';
import { useEffect } from 'react';

export function CypressProvider({ children }: React.PropsWithChildren) {
  useEffect(() => {
    if (window.Cypress) {
      window.resetMockData = () => {};
    }
  }, []);

  return <>{children}</>;
}

declare global {
  interface Window {
    resetMockData: () => void;
  }
}
