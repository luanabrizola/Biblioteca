@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

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

@theme{
    --font-display: "Poppins", "sans-serif";
}