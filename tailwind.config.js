/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Terminal surfaces
        term: {
          bg: '#0c0a0a',
          panel: '#15110f',
          panel2: '#1c1613',
          line: '#2c211c',
        },
        // Rust / coral accent
        rust: {
          DEFAULT: '#e07856',
          dim: '#6f4233',
          bright: '#ff9b78',
        },
        // Text
        fg: '#e8e2da',
        muted: '#8a817a',
        // Tag accent colors
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
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        pixel: ['Silkscreen', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        'pulse-dot': 'pulse-dot 2s ease-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-dot': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(74, 222, 128, 0.5)' },
          '70%': { boxShadow: '0 0 0 6px rgba(74, 222, 128, 0)' },
        },
      },
    },
  },
  plugins: [],
}
