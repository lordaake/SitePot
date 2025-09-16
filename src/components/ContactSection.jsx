
import React from 'react';

function ContactSection() {
    return (
        <section id="contact" className="bg-base-light rounded-3xl max-w-4xl mx-auto p-12 md:p-16 text-center border border-neon-blue/30 shadow-xl shadow-neon-blue/20 mt-24 mb-24 transform hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-neon-pink/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-neon-green/10 rounded-full translate-x-1/2 translate-y-1/2 blur-xl group-hover:scale-150 transition-transform duration-500"></div>

            <h2 className="text-5xl font-extrabold text-text-primary mb-6 drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] group-hover:text-neon-yellow transition-colors duration-300">
                Ready to Own Your Magic Name?
            </h2>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
                Each domain is a gateway to opportunity. Click on any domain to visit its page and make an offer directly. For general inquiries, feel free to reach out.
            </p>
            <a
                href="mailto:ramlarssondigital@proton.me"
                className="inline-block bg-neon-orange text-base-dark font-bold rounded-full px-12 py-4 shadow-lg shadow-neon-orange/40 hover:shadow-neon-yellow/60 hover:scale-110 transform transition duration-300 text-lg tracking-wide uppercase"
            >
                Contact Us
            </a>
        </section>
    );
}

export default ContactSection;