// src/sections/DomainsSection.jsx
import { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, Sparkles } from 'lucide-react';
import { domains } from '../data/domains'; // Assuming this import is correct


const DomainsSection = () => {
    const [domainsVisible, setDomainsVisible] = useState(false);


    return (
        <section
            id="domains"
            className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 relative overflow-hidden"
        >
            {/* Subtle background pattern for creativity (SVG overlay) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="premium-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M20 0 L20 40 M0 20 L40 20" stroke="#a5b4fc" strokeWidth="1" opacity="0.3" />
                            <circle cx="20" cy="20" r="2" fill="#a5b4fc" opacity="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#premium-pattern)" />
                </svg>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    {/* Adjusted text size for mobile */}
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-indigo-100 mb-4 flex items-center justify-center gap-2">
                        <Sparkles className="h-8 w-8 text-yellow-500 dark:text-yellow-400 animate-pulse" />
                        My Domains Available for Sale on Saw.com
                    </h2>
                    <p className="text-md text-gray-600 dark:text-indigo-300 max-w-3xl mx-auto">
                        Unlock your brand's potential with these handpicked, premium domains. Perfect for AI, tech, and innovation projects.
                    </p>
                </div>


                {domainsVisible && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {domains.map((domain) => (
                            <div
                                key={domain}
                                className="group bg-white dark:bg-indigo-900/50 backdrop-blur-sm rounded-xl shadow-md dark:shadow-indigo-950/30 p-2 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <Globe className="h-4 w-4 mx-auto mb-1 text-blue-500 dark:text-blue-300 group-hover:rotate-12 transition-transform" />
                                <p className="font-mono text-gray-900 dark:text-indigo-100 text-sm">{domain}</p>
                                <p className="text-[10px] text-gray-500 dark:text-indigo-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Available via Saw.com
                                </p>
                            </div>
                        ))}
                    </div>
                )}


                <div className="text-center mt-8">
                    <button
                        onClick={() => setDomainsVisible(!domainsVisible)}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 hover:shadow-lg"
                    >
                        {domainsVisible ? 'Hide Domains' : 'Show Domains'}
                        {domainsVisible ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
                    </button>
                </div>
            </div>
        </section>
    );
};


export default DomainsSection;
