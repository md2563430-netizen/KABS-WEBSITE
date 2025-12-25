import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#070A10',
        card: '#0B1220',
        border: 'rgba(255,255,255,0.08)',
        'text-primary': '#E7EAF0',
        'text-muted': '#9AA3B2',
        'accent-gold': '#F5B301',
        'accent-orange': '#FF8A00',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(245, 179, 1, 0.3)',
        'gold-glow-sm': '0 0 10px rgba(245, 179, 1, 0.2)',
      },
    },
  },
  plugins: [],
}
export default config

