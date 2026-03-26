/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#EDECE7', 2: '#E8E7E1', 3: '#F4F3EE', 4: '#DDDCD6' },
        ink: { DEFAULT: '#3D3D38', 2: '#5C5C55', 3: '#8A8A80', 4: '#B8B8AE' },
        grove: { DEFAULT: '#4A5240', 2: '#6B7A5A', light: '#8A9A72', faint: 'rgba(74,82,64,0.08)' },
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'scale-in': 'scaleIn 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.9)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
