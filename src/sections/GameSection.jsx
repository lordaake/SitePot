// src/sections/GameSection.jsx
import React, { forwardRef, useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import AgentVanguardGame from '@/components/AgentVanguardGame';


const GameSection = forwardRef((props, ref) => {
    // State to hold the current theme
    const [currentTheme, setCurrentTheme] = useState('dark'); // Default to 'dark' or your actual default

    useEffect(() => {
        // Function to detect theme from body/html class
        const detectTheme = () => {
            if (document.documentElement.classList.contains('dark')) {
                setCurrentTheme('dark');
            } else {
                setCurrentTheme('light');
            }
        };

        // Initial detection
        detectTheme();

        // Observe changes to the html class attribute if you have a theme toggle
        const observer = new MutationObserver(detectTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect(); // Clean up observer
    }, []);

    return (
        <section
            ref={ref}
            className="py-20 bg-gradient-to-r from-gray-100 to-white dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 text-gray-900 dark:text-white"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 dark:bg-red-500 rounded-full mb-6 mx-auto">
                        <Target className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                        Agent <span className="text-red-500 dark:text-red-400">Vanguard</span> Game
                    </h2>
                    <p className="text-l max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                        Navigate through the glitched simulation. Click, tap, or press space to fly!
                    </p>
                </div>

                <div className="w-full flex justify-center"> {/* Added flex and justify-center to help center the game container */}
                    {/* Pass the detected theme to AgentVanguardGame */}
                    <AgentVanguardGame theme={currentTheme} />
                </div>

                {/* Removed the "SIMULATION ACTIVE" div from here */}
            </div>
        </section>
    );
});

export default GameSection;
