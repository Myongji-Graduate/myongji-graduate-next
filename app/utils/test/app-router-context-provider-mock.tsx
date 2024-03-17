// https://github.com/vercel/next.js/discussions/48937#discussioncomment-6395245
import { AppRouterContext, AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React from 'react';

export type AppRouterContextProviderMockProps = {
  router: Partial<AppRouterInstance>;
  children: React.ReactNode;
};

export const AppRouterContextProviderMock = ({
  router,
  children,
}: AppRouterContextProviderMockProps): React.ReactNode => {
  const mockedRouter: AppRouterInstance = {
    back: () => {},
    forward: () => {},
    push: () => {},
    replace: () => {},
    refresh: () => {},
    prefetch: () => {},
    ...router,
  };
  return <AppRouterContext.Provider value={mockedRouter}>{children}</AppRouterContext.Provider>;
};
