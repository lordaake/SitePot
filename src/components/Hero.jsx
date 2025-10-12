import { Sparkles, Globe, DollarSign, Handshake } from 'lucide-react';

function Hero() {
    return (
        <section
            id="hero"
            className="
        mt-12 py-16 px-6 md:px-12 
        relative flex flex-col items-center 
        bg-gradient-to-br from-lepre-light-gray via-lepre-white to-lepre-light-gray 
        rounded-3xl shadow-lg border border-lepre-gold-dark 
        max-w-8xl mx-auto
      "
        >
            {/* Golden Pot with Rainbow Glow */}
            <div
                className="
          relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 
          rounded-full 
          bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-500 
          shadow-[0_0_25px_rgba(255,215,0,0.6)] animate-lepre-float 
          flex items-center justify-center overflow-visible
        "
            >
                {/* Rainbow Glow Ring */}
                <span
                    className="absolute inset-0 rounded-full pointer-events-none animate-spin-slow"
                    style={{
                        boxShadow:
                            '0 0 40px 10px rgba(255,0,255,0.4), 0 0 80px 25px rgba(0,255,255,0.3), 0 0 120px 40px rgba(0,255,0,0.2)',
                    }}
                />
                {/* Perfect-fit Golden ring around logo */}
                <div className="h-full w-full rounded-full p-2 bg-gradient-to-tr from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg shadow-yellow-400/60 flex items-center justify-center">
                    <img
                        src="/Hero4.png"
                        alt="Hero"
                        className="h-full w-full select-none rounded-full object-contain"
                        draggable={false}
                    />
                </div>
            </div>

            {/* Main Title */}
            <h2
                className="
          text-3xl sm:text-4xl md:text-7xl 
          font-extrabold text-lepre-text-primary/90 
          mb-8 mt-8 tracking-wide text-center px-4
        "
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
            >
                Search the{' '}
                <span className="text-lepre-gold underline decoration-lepre-green decoration-4 underline-offset-8">
                    Golden Pot
                </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-lepre-text-secondary font-semibold mb-10 leading-relaxed text-center px-4">
                Find your{' '}
                <span className="font-extrabold">.com</span>{' '}
                domain from our curated collection and shine online.
            </p>

            {/* Unified Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 max-w-4xl mx-auto px-4 text-sm sm:text-base">
                <p className="flex items-center text-lepre-text-primary font-semibold whitespace-nowrap">
                    <Sparkles className="w-7 h-7 mr-3 text-lepre-gold" />
                    Each domain is handpicked
                </p>
                <p className="flex items-center text-lepre-text-secondary font-semibold whitespace-nowrap">
                    <DollarSign className="w-7 h-7 mr-3 text-lepre-gold" />
                    Minimum offer: 500 USD
                </p>
                <p className="flex items-center text-lepre-green font-semibold whitespace-nowrap">
                    <Globe className="w-7 h-7 mr-3 text-lepre-green-dark" />
                    Visit URL to make an offer
                </p>
                <p className="flex items-center text-lepre-text-secondary font-semibold whitespace-nowrap">
                    <Handshake className="w-7 h-7 mr-3 text-lepre-green-dark" />
                    All offers are considered
                </p>
            </div>
        </section>
    );
}

export default Hero;