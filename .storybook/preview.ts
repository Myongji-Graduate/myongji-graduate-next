import type { Preview } from '@storybook/react';
import '../app/globals.css';
import { handlers } from '../app/mocks/handlers';
import { initialize, mswDecorator } from 'msw-storybook-addon';

initialize({}, [...handlers]);

const preview: Preview = {
  decorators: [mswDecorator],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
