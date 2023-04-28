/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-out': 'slide-out 1s ease forwards'
      }
    },
    keyframes: {
      'slide-out': {
        from: {
          opacity: 1,
          transform: 'translateX(0)'
        },
        to: {
          opacity: 0,
          transform: 'translateX(100%)'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [],
}