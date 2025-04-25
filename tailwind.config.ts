import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Add other paths that contain Tailwind classes if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config 