/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/@ntv360/component-pantry/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f0f',
        surface: '#15171a',
        border: {
          DEFAULT: 'rgba(232, 238, 248, 0.1)',
          soft: 'rgba(232, 238, 248, 0.08)',
          strong: 'rgba(232, 238, 248, 0.18)',
        },
        accent: '#92c74d',
        heading: '#edf1f8',
        body: '#9fb0cc',
        muted: '#6b7688',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        pill: '25px',
      },
    },
  },
  plugins: [],
};
