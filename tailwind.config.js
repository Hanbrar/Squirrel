/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F5F9',
        'background-alt': '#FDF4F7',
        card: '#FFFFFF',
        'text-primary': '#1A1A2E',
        'text-secondary': '#6B7280',
        accent: '#18181B',
        border: '#E5E7EB',
        focus: '#93C5FD',
        status: {
          'not-applied': { bg: '#F3F4F6', text: '#6B7280' },
          'applied': { bg: '#DBEAFE', text: '#2563EB' },
          'pending': { bg: '#FEF3C7', text: '#D97706' },
          'interview': { bg: '#F3E8FF', text: '#7C3AED' },
          'offer': { bg: '#D1FAE5', text: '#059669' },
          'rejected': { bg: '#FEE2E2', text: '#DC2626' },
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'elevated': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'pill': '20px',
        'modal': '16px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
