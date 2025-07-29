// HeroSection.jsx
import { ArrowDown } from 'lucide-react';


const HeroSection = ({ onExploreClick, onTryGameClick }) => {
    return (
        <section
            className="pt-10 md:pt-12 bg-gradient-normal dark:bg-gradient-dark"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Adjusted text sizes for mobile */}
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-white font-mono">
                        <span className="text-green-500">Stay</span> <span className="text-purple-500">comfortable</span><br />
                        <span className="text-xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 font-mono">The
                            <span className="text-purple-500"> agents</span> are <span className="text-green-500">ready</span> to do your job
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 text-gray-700 dark:text-gray-300">
                        <strong>This page is just getting started.</strong><br />
                        We’re building a hub for the best AI agent tools, with fresh features coming soon.
                    </p>


                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5 max-w-md mx-auto">
                        <button
                            onClick={onExploreClick}
                            type="button"
                            aria-label="Explore AI tools"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 bg-opacity-75 hover:bg-opacity-90 rounded-lg font-semibold transition-transform duration-300 hover:scale-105 text-white dark:bg-purple-800 dark:bg-opacity-50 dark:hover:bg-opacity-75"
                        >
                            <ArrowDown className="w-6 h-6 text-red-500" />
                            Explore Tools
                        </button>
                        <button
                            onClick={onTryGameClick}
                            type="button"
                            aria-label="Try the Agent Training Game"
                            className="inline-flex items-center gap-3 px-6 py-4 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-semibold transition-colors duration-300"
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
