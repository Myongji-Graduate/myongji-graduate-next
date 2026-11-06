import { act, render, screen, waitFor } from '@testing-library/react';
import MSWComponent from './msw-component.mock';
import { worker } from './browser.mock';

jest.mock('./browser.mock', () => ({ worker: { start: jest.fn() } }));

const originalEnvironment = process.env;

afterEach(() => {
  process.env = originalEnvironment;
  jest.clearAllMocks();
});

it('renders immediately without starting MSW when development mocking is disabled', () => {
  process.env = { ...originalEnvironment, NODE_ENV: 'development', NEXT_PUBLIC_API_MOCKING: 'disable' };
  render(<MSWComponent>visible application</MSWComponent>);

  expect(screen.getByText('visible application')).toBeInTheDocument();
  expect(worker.start).not.toHaveBeenCalled();
});

it('waits for the explicitly enabled development worker before rendering', async () => {
  process.env = { ...originalEnvironment, NODE_ENV: 'development', NEXT_PUBLIC_API_MOCKING: 'enable' };
  let ready!: () => void;
  (worker.start as jest.Mock).mockReturnValue(new Promise<void>((resolve) => (ready = resolve)));
  render(<MSWComponent>visible application</MSWComponent>);

  expect(screen.queryByText('visible application')).not.toBeInTheDocument();
  await waitFor(() => expect(worker.start).toHaveBeenCalledTimes(1));
  await act(async () => ready());
  expect(await screen.findByText('visible application')).toBeInTheDocument();
  expect(worker.start).toHaveBeenCalledTimes(1);
});

it('renders production children without a browser worker even if the flag is enabled', () => {
  process.env = { ...originalEnvironment, NODE_ENV: 'production', NEXT_PUBLIC_API_MOCKING: 'enable' };
  render(<MSWComponent>visible application</MSWComponent>);

  expect(screen.getByText('visible application')).toBeInTheDocument();
  expect(worker.start).not.toHaveBeenCalled();
});
