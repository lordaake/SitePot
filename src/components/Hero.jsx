// src/components/Hero.jsx

import { Sparkles, Globe } from 'lucide-react';

function Hero() {
    return (
        <section
            id="hero"
            className="mt-12 py-16 px-6 md:px-12 relative flex flex-col items-center bg-gradient-to-br from-lepre-light-gray via-lepre-white to-lepre-light-gray rounded-3xl shadow-lg border border-lepre-gold-dark max-w-5xl mx-auto"
        >
            {/* Golden Pot with Rainbow Glow */}
            <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-full bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-500 shadow-[0_0_25px_rgba(255,215,0,0.6)] animate-lepre-float flex items-center justify-center overflow-visible">
                {/* Rainbow Glow Ring */}
                <span
                    className="absolute inset-0 rounded-full pointer-events-none animate-spin-slow"
                    style={{
                        boxShadow:
                            '0 0 40px 10px rgba(255,0,255,0.4), 0 0 80px 25px rgba(0,255,255,0.3), 0 0 120px 40px rgba(0,255,0,0.2)'
                    }}
                ></span>

                {/* Perfect-fit Golden ring around logo */}
                <div className="h-full w-full rounded-full p-2 bg-gradient-to-tr from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg shadow-yellow-400/60 flex items-center justify-center">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-full w-full select-none rounded-full object-contain"
                        draggable={false}
                    />
                </div>
            </div>

            {/* Main Title */}
            <h2
                className="text-3xl sm:text-4xl md:text-7xl font-extrabold text-lepre-text-primary/90 mb-8 tracking-wide text-center px-4"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
            >
                Search the <span className="text-lepre-gold underline decoration-lepre-green decoration-4 underline-offset-8">Golden Pot</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-lepre-text-secondary font-semibold mb-12 leading-relaxed text-center px-4">
                Find your <span className="font-extrabold text-lepre-gold">.com</span> domain from our curated collection and shine online.
            </p>

            {/* Features */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 text-md font-semibold max-w-3xl px-4">
                <p className="flex items-center text-lepre-text-primary whitespace-nowrap text-base sm:text-lg">
                    <Sparkles className="w-7 h-7 mr-3 text-lepre-gold" /> Each domain has been handpicked
                </p>
                <p className="flex items-center text-lepre-green whitespace-nowrap text-base sm:text-lg">
                    <Globe className="w-7 h-7 mr-3 text-lepre-green-dark" /> Visit domain URL to make an offer
                </p>
            </div>
        </section>
    );
}

export default Hero;
