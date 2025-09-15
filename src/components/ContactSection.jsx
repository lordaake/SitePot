function ContactSection() {
    return (
        <section className="bg-gradient-to-br from-black/60 via-purple-900/80 to-indigo-950/60 rounded-2xl shadow-2xl max-w-2xl mx-auto p-12 text-center border-2 border-yellow-400/25 mt-24">
            <h2 className="text-4xl font-extrabold text-yellow-200 mb-6 drop-shadow-lg">Ready to Own Your Magic Name?</h2>
            <p className="text-lg text-neon-green mb-6 max-w-xl mx-auto">
                Visit the URL of the domain to conjure an offer. For example: <span className="font-semibold text-neon-orange">agentvanguard.com</span>
            </p>
            <a
                href="mailto:info@sitepot.com"
                className="inline-block bg-gradient-to-r from-neon-green via-neon-pink to-neon-orange text-indigo-900 font-bold rounded-xl px-10 py-4 shadow-lg focus:outline-none focus:ring-4 focus:ring-neon-orange/40 transition"
            >
                Contact Us
            </a>
        </section>
    );
}
export default ContactSection;