// optimization: https://storybook.js.org/blog/optimize-storybook-7-6/

import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../app/**/*.mdx', '../app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
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
};
export default config;
