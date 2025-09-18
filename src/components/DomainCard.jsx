// src/components/DomainCard.jsx

import { Sparkles, ExternalLink, Star } from 'lucide-react';

function DomainCard({ domain }) {
    return (
        <div className="bg-lepre-white rounded-lg shadow-lepre-soft-shadow ring-1 ring-lepre-gold-dark hover:ring-lepre-green-dark p-8 flex flex-col justify-between transition-all duration-350 hover:-translate-y-1 hover:shadow-lepre-gold-glow">
            <div>
                <h3 className="text-2xl font-extrabold text-lepre-text-primary flex items-center gap-3 mb-3 pb-3 border-b border-lepre-gold-dark">
                    {domain.name}
                    <Star className="w-5 h-5 text-lepre-gold" fill="currentColor" />
                </h3>
                <div className="flex flex-wrap gap-2 mb-5">
                    {(Array.isArray(domain.category) ? domain.category : [domain.category]).map((cat) => (
                        <span
                            key={cat}
                            className="bg-lepre-gold/20 black text-xs font-semibold px-3 py-1 rounded-full border border-lepre-gold/60"
                        >
                            {cat}
                        </span>
                    ))}
                </div>
                <p className="text-lepre-text-secondary text-base leading-relaxed min-h-[80px] mb-6">
                    {domain.description}
                </p>
            </div>
            <div className="flex items-center justify-between mt-3">
                <span className="text-lepre-gold font-bold flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-lepre-green" /> For Sale
                </span>
                <a
                    href={`https://${domain.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-2 bg-lepre-green text-lepre-white font-extrabold rounded-lg shadow-lepre-soft-shadow hover:scale-105 transform transition duration-300"
                >
                    Make Offer <ExternalLink className="w-5 h-5 ml-2" />
                </a>
            </div>
        </div>
    );
}

export default DomainCard;

