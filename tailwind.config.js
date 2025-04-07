 /** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"]
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
        },
    },
    plugins: [],
}