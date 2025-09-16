// src/components/Hero.jsx

import logo from '../assets/logo.png';
import { Sparkles, Globe } from 'lucide-react';

function Hero() {
    return (
        <section
            id="hero"
            className="mt-8 py-14 text-center relative flex flex-col items-center bg-gradient-to-b from-white/90 via-black/70 to-black/50 rounded-3xl shadow-[0_8px_30px_rgba(128,90,213,0.7)]"
        >
            <div className="relative mb-8 flex justify-center items-center">
                <div className="rounded-full p-4 bg-yellow-400/90 shadow-[0_0_20px_5px_rgba(252,211,77,0.7)] animate-glow">
                    <img
                        src={logo}
                        alt="Magical Pot of Domains"
                        className="h-64 w-64 rounded-full object-cover drop-shadow-[0_0_15px_rgba(252,211,77,0.9)] animate-float"
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                    <span className="text-6xl font-extrabold text-yellow-400 opacity-30 animate-glow-slow select-none">
                        .COM
                    </span>
                </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold text-yellow-300 mb-6 drop-shadow-[0_0_8px_rgba(252,211,77,0.9)]">
                Search the Golden Pot
            </h2>

            <p className="text-xl max-w-2xl mx-auto text-neon-green/90 font-semibold mb-10 leading-relaxed mr-4 ml-4">
                Find your <span className="font-extrabold">.com</span> domain from our glowing cauldron.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 text-md font-semibold">
                <p className="flex items-center text-neon-green">
                    <Sparkles className="w-7 h-7 mr-3 animate-glow-pulse text-neon-pink" /> Each domain has been handpicked
                </p>
                <p className="flex items-center text-neon-orange">
                    <Globe className="w-7 h-7 mr-3 animate-spin-slow" /> Visit domain URL to make an offer
                </p>
            </div>
        </section>
    );
}

export default Hero;