
// tailwind.config.js

import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'base-dark': '#0A0A0A',     // Darkest background
                'base-light': '#1A1A1A',    // Slightly lighter for cards/sections
                'base-mid': '#2A2A2A',      // Intermediate shade

                'text-primary': '#E0E0E0',  // Light gray for main text
                'text-secondary': '#B0B0B0', // Muted gray for secondary text
                'text-tertiary': '#808080',  // Softer gray for less important text

                'accent-gold': '#FFD700',   // Gold
                'accent-gold-dark': '#CCAA00',

                'accent-teal': '#00CED1',   // Dark Turquoise
                'accent-teal-dark': '#00A0A3',

                'accent-pink': '#FF69B4',   // Hot Pink
                'accent-pink-dark': '#CC5590',

                'neon-pink': '#FF00FF',     // Bright Neon Pink
                'neon-green': '#00FF00',    // Bright Neon Green
                'neon-blue': '#00FFFF',     // Bright Neon Blue
                'neon-orange': '#FFA500',   // Bright Neon Orange
                'neon-yellow': '#FFFF00',   // Bright Neon Yellow
            },
            backgroundImage: {
                'magic-bg': 'radial-gradient(circle at 15% 85%, rgba(255, 0, 255, 0.1) 0%, transparent 30%), radial-gradient(circle at 85% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 35%)',
            },
            boxShadow: {
                'soft-glow': '0 0 25px -5px var(--glow-color, #FFD700)',
                'card-shadow': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'spin-slow': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
                'glow-pulse': {
                    '0%, 100%': { opacity: '1', filter: 'brightness(1.1)' },
                    '50%': { opacity: '0.8', filter: 'brightness(1)' },
                }
            },
            animation: {
                'float': 'float 5s ease-in-out infinite',
                'spin-slow': 'spin-slow 30s linear infinite',
                'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
            },
        },
    },
    plugins: [
        typography,
    ],
}


