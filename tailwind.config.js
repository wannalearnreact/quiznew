/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            white: '#ffffff',
            black: '#000000',
            green: {
                primary: '#50C878',
                secondary: '#008000',
            },
            blue: {
                primary: '#3085d6',
                secondary: '#00308F',
            },
            black: {
                light: '#262626',
                faded: '#00000059',
            },
            gray: {
                base: '#616161',
                primary: '#363636',
                background: '#ececec',
            },
            red: {
                primary: '#dd3333',
                secondary: '#BA0021',
            },
        },
        screens: {
            '2xl': { max: '1535px' },
            // => @media (max-width: 1535px) { ... }

            xl: { max: '1279px' },
            // => @media (max-width: 1279px) { ... }

            lg: { max: '1023px' },
            // => @media (max-width: 1023px) { ... }

            md: { max: '767px' },
            // => @media (max-width: 767px) { ... }

            sm: { max: '639px' },
            // => @media (max-width: 639px) { ... }
        },
        extend: {
            fontFamily: {
                Roboto: ['Roboto', 'sans-serif'],
                IndieFlower: ['Indie Flower', 'cursive'],
                Patrick: ['Patrick Hand', 'cursive'],
            },
        },
    },
    plugins: [],
};
