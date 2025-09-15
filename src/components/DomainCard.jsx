// src/components/DomainCard.jsx

import { Sparkles, ExternalLink, Star } from 'lucide-react';

function DomainCard({ domain }) {
    return (
        <div className="bg-gradient-to-br from-black/60 via-purple-900/50 to-black/60 rounded-3xl shadow-[0_8px_30px_rgba(128,90,213,0.7)] ring-1 ring-neon-green/40 hover:ring-neon-orange/80 p-8 flex flex-col justify-between transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(252,147,38,0.8)]">
            <div>
                <h3 className="text-2xl font-extrabold text-yellow-300 flex items-center gap-3 mb-3 pb-3 border-b border-neon-pink/40 drop-shadow-[0_0_6px_rgba(255,55,135,0.7)]">
                    {domain.name}
                    <Star className="w-5 h-5 text-neon-pink animate-pulse" fill="currentColor" />
                </h3>
                <div className="flex flex-wrap gap-2 mb-5">
                    {(Array.isArray(domain.category) ? domain.category : [domain.category]).map((cat) => (
                        <span
                            key={cat}
                            className="bg-neon-pink/25 text-neon-pink text-xs font-semibold px-3 py-1 rounded-full border border-neon-pink/60 shadow-[0_0_6px_rgba(255,105,180,0.7)]"
                        >
                            {cat}
                        </span>
                    ))}
                </div>
                <p className="text-neon-green/85 text-base leading-relaxed min-h-[80px] mb-6 drop-shadow-[0_0_6px_rgba(57,240,145,0.85)]">
                    {domain.description}
                </p>
            </div>
            <div className="flex items-center justify-between mt-3">
                <span className="text-neon-green font-bold flex items-center drop-shadow-[0_0_8px_rgba(57,240,145,0.9)]">
                    <Sparkles className="w-5 h-5 mr-2 animate-glow-pulse text-neon-pink" /> For Sale
                </span>
                <a
                    href={`https://${domain.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-yellow-400 via-neon-orange to-yellow-500 text-purple-900 font-extrabold rounded-xl shadow-lg hover:shadow-yellow-500/70 hover:scale-105 transform transition duration-300"
                >
                    Make Offer <ExternalLink className="w-5 h-5 ml-2" />
                </a>
            </div>
        </div>
    );
}

export default DomainCard;