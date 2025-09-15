// src/components/Footer.jsx

function Footer() {
    return (
        <footer className="bg-black/30 text-yellow-300/70 py-8 mt-16 border-t border-neon-pink/20">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; {new Date().getFullYear()} SitePot. All spells reserved.</p>
                <p className="text-sm mt-2 opacity-60">A Ram Larsson Digital Enchantment</p>
            </div>
        </footer>
    );
}

export default Footer;