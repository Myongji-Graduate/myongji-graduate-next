'use client';
import { createContext, useState, ReactNode, useContext } from 'react';
import { AnonymousResultType } from '@/app/utils/parser/anonymous';

interface AnonymousContextType {
  result?: AnonymousResultType;
  setResult: (data: AnonymousResultType) => void;
}

export const AnonymousContext = createContext<AnonymousContextType | null>(null);

export const AnonymousProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<AnonymousResultType>();

  return <AnonymousContext.Provider value={{ result, setResult }}>{children}</AnonymousContext.Provider>;
};

export function useAnonymousContext() {
  const context = useContext(AnonymousContext);
  if (!context) {
    throw new Error('useAnonymousContext must be used within an AnonymousProvider');
  }
  return context;
}
