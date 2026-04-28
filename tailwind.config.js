/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        gold: { 400: '#f6c860', 500: '#e8a920', 600: '#c98a10' },
        purple: { 400: '#b57bee', 500: '#9b59d6', 900: '#2d1b4e' },
      },
      animation: {
        'scan': 'scan 3s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px #f6c860' },
          '50%': { boxShadow: '0 0 30px #f6c860, 0 0 60px #e8a920' },
        },
      },
    },
  },
  plugins: [],
}
