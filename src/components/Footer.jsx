// src/components/Footer.jsx

function Footer() {
    return (
        <footer className="bg-lepre-light-gray text-lepre-text-secondary py-8 mt-16 border-t border-lepre-gold/20">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; {new Date().getFullYear()} Ram Larsson Digital. All rights reserved.</p>
                <p className="text-sm mt-2 opacity-80">Crafted with a touch of luck</p>
            </div>
        </footer>
    );
}

export default Footer;