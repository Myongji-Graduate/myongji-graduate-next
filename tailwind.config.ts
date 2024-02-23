import type { Config } from 'tailwindcss';
import headlessui from '@headlessui/tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'light-blue-1': '#E7EBFF',
        'light-blue-2': '#d6deff',
        'light-blue-3': '#bac8ff',
        'light-blue-4': '#9eb1ff',
        'light-blue-5': '#91a6ff',
        'light-blue-6': '#7590FF',
        'light-blue-7': '#6982e6',
        'light-blue-8': '#839BFF',
        'point-blue': '#3B61FF',
        'point-blue-hover': '#2F4ECC',
        primary: '#0B4093',
        'primary-hover': '#093376',
        dark: '#002968',
        'dark-hover': '#002153',
        'gray-1': '#F5F5F5',
        'gray-2': '#e5e5e5',
        'gray-3': '#cfcfcf',
        'gray-4': '#c4c4c4',
        'gray-5': '#acacac',
        'gray-6': '#9F9F9F',
        'black-1': '#353535',
        'black-2': '#2F2F2F',
        'black-3': '#262626',
        'black-4': '#090909',
        yellow: '#FFF38B',
        pink: '#FFC8C8',
        red: '#FF6D6D',
        'white-hover': '#f3f4f6',
      },
      zIndex: {
        1: '100', // upper layout
        2: '200', // upper content
        3: '300', // upper all
      },
    },
  },
  plugins: [headlessui, require('tailwindcss-animate')],
};
export default config;
