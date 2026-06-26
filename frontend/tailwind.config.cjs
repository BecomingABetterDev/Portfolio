module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
          light: '#67e8f9',
        },
      },
      backgroundOpacity: {
        '85': '0.85',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['group-hover'],
      translate: ['group-hover'],
      borderColor: ['group-hover', 'focus'],
      ringColor: ['focus'],
      ringWidth: ['focus'],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: false,
    styled: false,
  },
}
