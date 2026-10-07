import { isServer, QueryClient } from '@tanstack/react-query';

let browserQueryClient: QueryClient | undefined;
let browserSessionKey: string | undefined;

export function getQueryClient(sessionKey: string): QueryClient {
  // Each server render must have its own cache, even for the same session.
  if (isServer) return new QueryClient();

  // Keep the browser cache through renders and Suspense retries, but never
  // reuse one session's private queries after login, logout or token renewal.
  if (!browserQueryClient || browserSessionKey !== sessionKey) {
    browserQueryClient = new QueryClient();
    browserSessionKey = sessionKey;
  }
  return browserQueryClient;
}
