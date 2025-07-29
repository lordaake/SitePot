// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import { Menu, X, Moon, Sun } from 'lucide-react';
import logo from '../assets/Logo_wb.png';

export default function Navbar({ darkMode, toggleDarkMode }) {
    const [menuOpen, setMenuOpen] = useState(false);

    // Helper to close the menu, useful for mobile links
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-purple-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-lg transition-colors duration-300">
            <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* 1. Left Section: Logo */}
                <div className="flex items-center">
                    {/* Use Link for the logo to navigate home */}
                    <Link to="/" onClick={closeMenu} className="rounded-full p-1 bg-gradient-to-tr from-purple-500 via-blue-400 to-pink-400 shadow-lg flex-shrink-0">
                        <img
                            src={logo}
                            alt="Agent Vanguard Logo"
                            className="h-11 w-11 rounded-full border-2 border-white dark:border-purple-900 transition-transform hover:scale-110"
                            draggable={false}
                        />
                    </Link>
                </div>

                {/* 2. Center Section: Brand Text */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    {/* Use Link for the brand name to navigate home */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="text-md lg:text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 bg-clip-text text-transparent font-montserrat drop-shadow-sm whitespace-nowrap"
                        style={{ fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif" }}
                    >
                        Agent Vanguard
                    </Link>
                </div>

                {/* 3. Right Section: Links and Toggles */}
                <div className="flex items-center">
                    {/* Desktop links and dark mode toggle */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <a
                            href="/#tools"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 px-3 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                            Tools
                        </a>
                        {/* --- NEW BLOG LINK (Desktop) --- */}
                        <Link
                            to="/blog"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 px-3 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                            Blog
                        </Link>
                        <a
                            href="/#about"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 px-3 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                            About
                        </a>
                        <button
                            onClick={toggleDarkMode}
                            aria-label="Toggle dark mode"
                            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            type="button"
                        >
                            {darkMode ? (
                                <Sun className="h-5 w-5 text-yellow-500" />
                            ) : (
                                <Moon className="h-5 w-5 text-gray-700" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
                        type="button"
                    >
                        {menuOpen ? (
                            <X className="h-6 w-6 text-gray-700 dark:text-white" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-700 dark:text-white" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu with Animation */}
            {menuOpen && (
                <div className="md:hidden bg-white/95 dark:bg-purple-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-md z-50 animate-fadeIn transition-colors duration-300">
                    <div className="flex flex-col space-y-4 py-6 text-center">
                        <a
                            href="/#tools"
                            className="text-lg text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 py-2"
                            onClick={closeMenu}
                        >
                            Tools
                        </a>
                        {/* --- NEW BLOG LINK (Mobile) --- */}
                        <Link
                            to="/blog"
                            className="text-lg text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 py-2"
                            onClick={closeMenu}
                        >
                            Blog
                        </Link>
                        <a
                            href="/#about"
                            className="text-lg text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 py-2"
                            onClick={closeMenu}
                        >
                            About
                        </a>
                        {/* --- COMPLETE DARK MODE TOGGLE FOR MOBILE MENU --- */}
                        <button
                            onClick={() => {
                                toggleDarkMode();
                                closeMenu();
                            }}
                            className="text-lg text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 py-2 flex justify-center items-center gap-2"
                            type="button"
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                            {darkMode ? (
                                <Sun className="h-5 w-5 text-yellow-500" />
                            ) : (
                                <Moon className="h-5 w-5 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
