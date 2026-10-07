import { getQueryClient } from '@/app/utils/query/query-client';
import { ReactQueryProvider } from '@/app/utils/global/react-query-provider';
import { useQueryClient } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

function CachedValue() {
  const client = useQueryClient();
  return <span>{client.getQueryData<string>(['private']) ?? 'empty'}</span>;
}

describe('browser query cache lifecycle', () => {
  it('retains data when the provider renders again in the same session', () => {
    const client = getQueryClient('session-a');
    client.setQueryData(['private'], 'synthetic-a');
    const { rerender, unmount } = render(
      <ReactQueryProvider sessionKey="session-a">
        <CachedValue />
      </ReactQueryProvider>,
    );
    rerender(
      <ReactQueryProvider sessionKey="session-a">
        <CachedValue />
      </ReactQueryProvider>,
    );
    expect(screen.getByText('synthetic-a')).toBeInTheDocument();
    expect(getQueryClient('session-a')).toBe(client);
    unmount();
    client.clear();
  });

  it('does not expose old queries after logout, another login, or token renewal', () => {
    const oldClient = getQueryClient('old-session');
    oldClient.setQueryData(['private'], 'synthetic-a');
    const { rerender, unmount } = render(
      <ReactQueryProvider key="old-session" sessionKey="old-session">
        <CachedValue />
      </ReactQueryProvider>,
    );
    for (const sessionKey of ['guest', 'new-session', 'renewed-session', 'old-session']) {
      rerender(
        <ReactQueryProvider key={sessionKey} sessionKey={sessionKey}>
          <CachedValue />
        </ReactQueryProvider>,
      );
      expect(screen.getByText('empty')).toBeInTheDocument();
      expect(getQueryClient(sessionKey)).not.toBe(oldClient);
    }
    unmount();
    oldClient.clear();
    getQueryClient('old-session').clear();
  });
});
