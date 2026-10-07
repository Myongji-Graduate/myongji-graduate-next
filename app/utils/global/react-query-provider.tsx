'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '../query/query-client';

export function ReactQueryProvider({
  children,
  sessionKey = 'guest',
}: React.PropsWithChildren<{ sessionKey?: string }>) {
  const queryClient = getQueryClient(sessionKey);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
