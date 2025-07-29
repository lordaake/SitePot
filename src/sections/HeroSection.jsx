import { ArrowDown } from 'lucide-react';

const HeroSection = ({ onExploreClick, onTryGameClick }) => {
    return (
        <section className="relative pt-8 md:pt-10 overflow-hidden font-roboto-mono">

            {/* --- Backgrounds --- */}
            {/* Light Mode Background: A clean, subtle gradient. Hidden in dark mode. */}
            <div
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-purple-300 dark:hidden"
                aria-hidden="true"
            />

            {/* Dark Mode Background: Our abstract tech image with layered gradients. Hidden by default, visible in dark mode. */}
            <div
                className="absolute inset-0 w-full h-full hidden dark:block bg-cover bg-center"
                style={{
                    backgroundImage: `
                        /* Layered gradients for depth */
                        linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7)),
                        radial-gradient(ellipse at center, rgba(0,0,0,0.2), rgba(0,0,0,0.8)),
                        /* Background image */
                        url('/HeroBackground.png')

                    `
                }}
                aria-hidden="true"
            />

            {/* Optional: starfield divs on top - shown only in dark mode for effect */}
            <div className="dark:block">
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
            </div>

            {/* --- Content --- */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <h1
                        // Text color changes for light/dark mode. Text shadow only in dark mode.
                        className="text-3xl md:text-5xl font-extrabold mb-4 leading-snug text-gray-900 dark:text-white"
                        style={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)' }} // Shadow is more impactful in dark mode
                    >
                        <span className="block">
                            {/* Accent colors adjusted for better contrast in each mode */}
                            <span className="inline-block animate-slide-in-left text-green-600 dark:text-green-400">Stay</span>{' '}
                            <span className="inline-block animate-slide-in-right text-purple-600 dark:text-purple-400">comfortable</span>
                        </span>
                        <div className="block text-lg md:text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-2 h-8 leading-tight">
                            <span className="inline-block animate-fade-in-up animation-delay-[400ms]">The&nbsp;</span>
                            <span className="inline-block text-green-600 dark:text-green-400 animate-fade-in-up">agents&nbsp;</span>
                            <span className="inline-block animate-fade-in-up animation-delay-[550ms]">are&nbsp;</span>
                            <span className="inline-block text-purple-600 dark:text-purple-400 animate-fade-in-up">ready&nbsp;</span>
                            <span className="inline-block animate-fade-in-up animation-delay-[700ms]">to do your job</span>
                        </div>
                    </h1>

                    <div className="animate-fade-in-up animation-delay-[2200ms]">
                        <p
                            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-8 text-gray-600 dark:text-gray-300"
                            // Apply text shadow conditionally for dark mode
                            style={{ textShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)' }}
                        >
                            <strong>This page is just getting started.</strong><br />
                            We’re building a hub for the best AI agent tools, with fresh features coming soon.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto animate-fade-in-up animation-delay-[2400ms]">
                        {/* --- Buttons with Light/Dark Variants --- */}
                        <button
                            onClick={onExploreClick}
                            type="button"
                            aria-label="Explore AI tools"
                            // Light mode: solid black. Dark mode: semi-transparent with purple glow.
                            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 
                                       bg-gray-900 text-white hover:bg-gray-700
                                       dark:bg-purple-900 dark:bg-opacity-75 dark:hover:bg-opacity-90 dark:hover:shadow-[0_0_20px_rgba(192,132,252,0.5)]"
                        >
                            <ArrowDown className="w-5 h-5 text-red-500" />
                            Explore Tools
                        </button>
                        <button
                            onClick={onTryGameClick}
                            type="button"
                            aria-label="Try the Agent Training Game"
                            // Light mode: red outline. Dark mode: red outline with red glow.
                            className="inline-flex items-center gap-2.5 px-5 py-3.5 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 
                                       border-red-600 text-red-600 hover:bg-red-600 hover:text-white
                                       dark:border-red-500 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]"
                        >
                            Try Our Homemade Agent Game
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
