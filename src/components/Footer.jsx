// src/components/Footer.jsx
import { Rocket, Globe, Moon, Sun } from 'lucide-react';

export default function Footer({ darkMode, toggleDarkMode }) {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Rocket className="h-8 w-8 text-blue-400" />
                            <span className="text-2xl font-bold">AI Tools Hub</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            Curating the best AI tools to help entrepreneurs and businesses automate, scale, and succeed in the digital age.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal Information</h4>
                        <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed space-y-2">
                            <p>Ram Larsson Digital</p>
                            <p>Norwegian ENK - Org. number: 935384672</p>
                            <p>All affiliate partnerships are clearly disclosed.</p>
                            <p>Testimonials and reviews are sourced from verified platforms.</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
                        <Globe className="h-4 w-4 text-yellow-400" />
                        <span>
                            Premium domain available for acquisition through{' '}
                            <a href="https://saw.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline">
                                saw.com
                            </a>
                        </span>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        aria-label="Toggle dark mode"
                        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                        {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700 dark:text-gray-400" />}
                    </button>
                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                        © 2025 AI Tools Hub. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
