'use client';
import { API_PATH } from '@/app/business/api-path';
import { addTakenLecture } from '@/app/business/services/lecture/taken-lecture.command';
import { useEffect } from 'react';

export function CypressProvider({ children }: React.PropsWithChildren) {
  useEffect(() => {
    if (window.Cypress) {
      window.addTakenLecture = async (lectureId: number[]) => {
        await Promise.all(lectureId.map((id) => addTakenLecture(id)));
      };

      window.resetMockDB = async () => {
        await fetch(`${API_PATH.default}/reset`);
      };
    }
  }, []);

  return <>{children}</>;
}

declare global {
  interface Window {
    addTakenLecture: (lectureId: number[]) => Promise<void>;
    resetMockDB: () => Promise<void>;
  }
}
