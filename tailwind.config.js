/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E1116',
          2: '#161A21',
          3: '#1E232C',
        },
        paper: '#ECE7DC',
        silver: '#9AA0A6',
        rule: '#2A2F38',
        azure: '#5B8DEF',
        gold: '#C9A24A',
        bronze: '#B87333',
        steel: '#A8A9AD',
        warn: '#D97757',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      animation: {
        'flow-down': 'flow-down 4s linear infinite',
        'pulse-soft': 'pulse-soft 2.5s ease-out infinite',
      },
      keyframes: {
        'flow-down': {
          '0%':   { transform: 'translateY(-100%)', opacity: '0' },
          '20%':  { opacity: '1' },
          '80%':  { opacity: '1' },
          '100%': { transform: 'translateY(400%)', opacity: '0' },
        },
        'pulse-soft': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 162, 74, 0.5)' },
          '70%':      { boxShadow: '0 0 0 10px rgba(201, 162, 74, 0)' },
        },
      },
    },
  },
  plugins: [],
}
