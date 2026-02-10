/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'harvest-green': '#2D5A27',
                'eco-charcoal': '#1A1A1A',
            },
            fontFamily: {
                'eco-font': ['sans-serif'], // User requested generic sans-serif for now, implied system or specific import not provided.
            },
        },
    },
    plugins: [],
}
