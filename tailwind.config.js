// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // This line scans all your component files
    ],
    theme: {
        extend: {
            // Define all the custom 'witchy' colors here
            colors: {
                'neon-orange': '#f6b800',
                'neon-green': '#3affa6',
                'neon-pink': '#ffaaff',
                'deep-purple': '#2a1b4d',
                'dark-purple': '#1a1032',
            },
            // Define custom animations
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                'slow-spin': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                }
            },
            // Register the animations
            animation: {
                'float': 'float 4s ease-in-out infinite',
                'slow-spin': 'slow-spin 25s linear infinite',
            },
            // Define custom drop shadow for the glowing effect
            dropShadow: {
                'glow': '0 0 12px rgba(58, 255, 166, 0.7)',
            }
        },
    },
    plugins: [],
}