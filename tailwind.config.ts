import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  daysiyu: {
    themes: ['light', 'dark'],
  },
  plugins: [require('daisyui')],
}
export default config
