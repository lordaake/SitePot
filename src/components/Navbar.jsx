// src/components/Navbar.jsx

import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-black/20 shadow-lg shadow-purple-900/20">
            <nav className="container mx-auto flex justify-end items-center px-8 py-4 space-x-10 text-lg font-bold">
                <a href="#domains" className="text-neon-orange hover:text-yellow-200 transition-colors duration-300">Domains</a>
                {/* <Link to="/blog" className="text-neon-pink hover:text-yellow-200 transition-colors duration-300">Blog</Link>
                <a href="#contact" className="text-neon-green hover:text-yellow-200 transition-colors duration-300">Contact</a> */}
            </nav>
        </header>
    );
}

export default Navbar;