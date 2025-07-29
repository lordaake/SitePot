// tailwind.config.js
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Keep this as 'class'
    theme: {
        extend: {
            backgroundImage: {
                // THIS IS YOUR LIGHT MODE GRADIENT
                'gradient-normal': 'linear-gradient(to bottom right, #f0f9ff, #fef2f2)', // light blue to light red
                // THIS IS YOUR DARK MODE GRADIENT
                'gradient-dark': 'linear-gradient(to right, #4c2d73, #6a329f)',
            },
        },
    },
    plugins: [],
};
