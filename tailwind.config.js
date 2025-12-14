/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFB62F',
        secondary: '#C400EB',
        accent: '#FF4E4C',
        alert: '#FF3C53',
        dark: '#180C39'
      },
      borderRadius: {
        'button': '8px'
      }
    }
  },
  plugins: [],
}
