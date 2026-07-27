/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces (glass is layered on top of these via CSS)
        term: {
          bg: '#0a0a0c',
          panel: '#151318',
          panel2: '#1c1a20',
          line: '#2a2830',
        },
        // Warm accent
        rust: {
          DEFAULT: '#e07856',
          dim: '#6f4233',
          bright: '#ff9b78',
        },
        // Text — high-contrast for vibrancy over translucent material
        fg: '#f2efea',
        muted: '#9a938c',
        tag: {
          teal: '#4fd1c5',
          violet: '#a78bfa',
          green: '#4ade80',
          blue: '#60a5fa',
          rust: '#e07856',
        },
        success: '#4ade80',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        pixel: ['Silkscreen', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
