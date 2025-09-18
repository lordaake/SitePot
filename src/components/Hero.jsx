// src/components/Hero.jsx

import { Sparkles, Globe } from 'lucide-react';

function Hero() {
    return (
        <section
            id="hero"
            className="mt-8 py-14 text-center relative flex flex-col items-center bg-lepre-light-gray rounded-lg shadow-lepre-soft-shadow border border-lepre-gold-dark"
        >
            <div className="relative mb-8 flex justify-center items-center">
                {/* Logo will be handled manually by the user */}
                <div className="h-64 w-64 flex items-center justify-center bg-lepre-gold rounded-full shadow-lepre-gold-glow animate-lepre-float">
                    <span className="text-6xl font-extrabold text-lepre-white opacity-90 select-none">
                        .COM
                    </span>
                </div>
            </div>

            <h2 className="text-3xl md:text-6xl font-extrabold text-lepre-text-primary mb-6 pl-6 pr-6 drop-shadow-md">
                Search the Golden Pot
            </h2>

            <p className="text-xl max-w-2xl mx-auto text-lepre-text-secondary font-semibold mb-10 leading-relaxed mr-4 ml-4">
                Find your <span className="font-extrabold text-lepre-gold">.com</span> domain from our collection.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 text-md font-semibold">
                <p className="flex items-center text-lepre-text-primary">
                    <Sparkles className="w-7 h-7 mr-3 text-lepre-gold" /> Each domain has been handpicked
                </p>
                <p className="flex items-center text-lepre-gold">
                    <Globe className="w-7 h-7 mr-3 text-lepre-green" /> Visit domain URL to make an offer
                </p>
            </div>
        </section>
    );
}

export default Hero;

