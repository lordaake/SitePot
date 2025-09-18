import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Dark mode state initialized based on current document element class
    const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
        setDarkMode(!darkMode);
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const targetPath = `/#${targetId}`;

        if (location.pathname === '/') {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(targetPath);
        }
        setMobileMenuOpen(false); // Close menu on click
    };

    return (
        <header className="sticky top-0 z-50 backdrop-blur-sm bg-lepre-white/90 dark:bg-lepre-white/10 border-b border-lepre-mid-gray dark:border-lepre-green shadow-lepre-soft-shadow">
            <nav className="container mx-auto flex justify-between items-center px-6 md:px-8 py-4">
                {/* Logo Section */}
                <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
                    <img
                        src="/logo.png"
                        alt="SitePot Logo"
                        className="w-10 h-10 object-contain"
                    />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold bg-gradient-to-r from-lepre-green to-lepre-gold bg-clip-text text-transparent">
                            SitePot
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 text-lg font-bold">
                    <a
                        href="/#domains"
                        onClick={(e) => handleNavClick(e, 'domains')}
                        className="text-lepre-text-primary dark:text-lepre-text-secondary hover:text-lepre-gold transition-colors duration-300 relative group"
                    >
                        Domains
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-lepre-green to-lepre-gold transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <Link
                        to="/blog"
                        className="text-lepre-text-primary dark:text-lepre-text-secondary hover:text-lepre-gold transition-colors duration-300 relative group"
                    >
                        Blog
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-lepre-green to-lepre-gold transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    {/* Dark mode toggle button */}
                    <button
                        onClick={toggleDarkMode}
                        aria-label="Toggle dark mode"
                        className="ml-4 p-2 rounded-md hover:bg-lepre-green/20 transition"
                    >
                        {darkMode ? (
                            <Sun className="w-6 h-6 text-lepre-gold" />
                        ) : (
                            <Moon className="w-6 h-6 text-lepre-green" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lepre-green"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6 text-lepre-green" />
                    ) : (
                        <Menu className="w-6 h-6 text-lepre-green" />
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-lepre-white/95 dark:bg-lepre-white/10 border-t border-lepre-mid-gray dark:border-lepre-green shadow-lepre-soft-shadow">
                    <nav className="flex flex-col space-y-4 px-6 py-4 text-lg font-bold">
                        <a
                            href="/#domains"
                            onClick={(e) => handleNavClick(e, 'domains')}
                            className="text-lepre-text-primary dark:text-lepre-text-secondary hover:text-lepre-gold transition-colors duration-300"
                        >
                            Domains
                        </a>
                        <Link
                            to="/blog"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-lepre-text-primary dark:text-lepre-text-secondary hover:text-lepre-gold transition-colors duration-300"
                        >
                            Blog
                        </Link>
                        <button
                            onClick={() => {
                                toggleDarkMode();
                                setMobileMenuOpen(false);
                            }}
                            aria-label="Toggle dark mode"
                            className="mt-4 p-2 rounded-md bg-lepre-green/20 hover:bg-lepre-green/30 transition text-lepre-white font-semibold"
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Navbar;