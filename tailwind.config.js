/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: '#1252DF',
            deep: '#0B3EAF',
            light: '#2567F7',
            vibrant: '#0F55E8',
            glow: '#1252DF40',
          },
          cyan: {
            DEFAULT: '#00B4D8',
            glow: '#00B4D833',
            bright: '#00C8F5',
          },
          dark: {
            DEFAULT: '#0A0D14',
            surface: '#111625',
            card: '#161D30',
            elevated: '#1C253D',
            border: '#24304D',
            subtle: '#192135',
          },
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
            muted: '#64748B',
          },
          accent: {
            orange: '#FF6B00',
            red: '#EF4444',
            green: '#10B981',
          }
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 30px -5px rgba(0, 98, 255, 0.4)',
        'glow-cyan': '0 0 30px -5px rgba(0, 229, 255, 0.35)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
