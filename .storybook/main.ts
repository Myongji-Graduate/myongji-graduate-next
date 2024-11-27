// optimization: https://storybook.js.org/blog/optimize-storybook-7-6/

import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  features: {
    experimentalRSC: true,
  },
  stories: ['../app/**/*.mdx', '../app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: { builder: { useSWC: true } },
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../'),
        'next/headers': path.resolve(__dirname, '../app/utils/test/__mock__/next/headers.ts'),
        'next/navigation': path.resolve(__dirname, '../app/utils/test/__mock__/next/navigation.ts'),
        'next/cache': path.resolve(__dirname, '../app/utils/test/__mock__/next/cache.ts'),
      };
    }
    return config;
  },
  typescript: {
    reactDocgen: 'react-docgen', // or false if you don't need docgen at all
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  env: (config) => ({
    ...config,
    STORY_BOOK: 'true',
  }),
};
export default config;
