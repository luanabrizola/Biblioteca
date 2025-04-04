import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins :'Poppins'
      },
      colors: {
        'texto-marrom': '#331a08',
        'fundo-marrom': '#5b3011',
        'botao-marrom': '#9f6d3d',
        'login-marrom': '#ad795b',
        'botao-bege': '#dbd0b3',
        'fundo-bege': '#f0e7c2',
        'botao-cinza': '#848484'
      }
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
