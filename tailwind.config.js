/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          elegant: {
            primary: '#1E364D',      // Deep steel blue
            secondary: '#F5F3F0',    // Warm gray
            sage: '#94A89A',
            terracotta: '#C8A598',
            navy: '#2A4365',
            gold: '#B7A99A',
            background: '#FDFCFA',
          },
        },
      },
    },
    plugins: [],
  }