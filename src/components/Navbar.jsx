// src/components/Navbar.jsx

import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

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
    };

    return (
        <header className="sticky top-0 z-50 backdrop-blur-sm bg-lepre-white/90 border-b border-lepre-mid-gray shadow-lepre-soft-shadow">
            <nav className="container mx-auto flex justify-end items-center px-8 py-4 space-x-10 text-lg font-bold">
                <a href="/#domains" className="text-lepre-text-primary hover:text-lepre-gold transition-colors duration-300">Domains</a>
                {/* <Link to="/blog" className="text-lepre-text-primary hover:text-lepre-gold transition-colors duration-300">Blog</Link> */}
                {/* <a href="/#contact" className="text-lepre-text-primary hover:text-lepre-gold transition-colors duration-300">Contact</a> */}
            </nav>
        </header>
    );
}

export default Navbar;

