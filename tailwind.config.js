/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'harvest-green': {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                    950: '#052e16',
                },
                'eco-charcoal': {
                    50: '#f6f7f8',
                    100: '#eceef0',
                    200: '#d5d9de',
                    300: '#b1b9c3',
                    400: '#8693a2',
                    500: '#647285',
                    600: '#4e5a6a',
                    700: '#3f4956',
                    800: '#363d47',
                    900: '#2f343b',
                    950: '#1e2126',
                },
            },
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
            }
        },
    },
    plugins: [],
}
