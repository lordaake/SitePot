// src/components/ToolCard.jsx
import React from 'react';
import {
    ArrowRight,
    ExternalLink,
    Star,
    StarHalf,
    Rocket,
    Wand2,
    CreditCard,
    Globe,
    Brain,
    FileText,
    Cog,
    Eye,
    ShieldCheck,
    Puzzle,
    Lightbulb,
    Bot,
    MessagesSquare,
    UserCheck,
    Zap,
    TrendingUp,
    ShoppingCart,
    List,
    Briefcase,
    BarChart,
} from 'lucide-react';

const iconMap = {
    ArrowRight,
    ExternalLink,
    Star,
    StarHalf,
    Rocket,
    Wand2,
    CreditCard,
    Globe,
    Brain,
    FileText,
    Cog,
    Eye,
    ShieldCheck,
    Puzzle,
    Lightbulb,
    Bot,
    MessagesSquare,
    UserCheck,
    Zap,
    TrendingUp,
    ShoppingCart,
    List,
    Briefcase,
    BarChart,
};

const renderStars = (rating) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`star-full-${i}`} className="text-yellow-400 dark:text-yellow-300" />);
    }
    if (hasHalfStar) {
        stars.push(<StarHalf key="star-half" className="text-yellow-400 dark:text-yellow-300" />);
    }
    return stars;
};

const ToolCard = ({
    href,
    logo,
    category,
    categoryColor,
    title,
    subtitle,
    description,
    features,
    pricing,
    testimonial,
    cta,
}) => {
    const LogoComponent = logo.type === 'icon' ? iconMap[logo.icon] : null;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl bg-white dark:bg-indigo-900 shadow hover:shadow-lg dark:shadow-indigo-950/50 transition p-6"
        >
            <div className="flex justify-between items-center mb-4">
                {logo.type === 'image' ? (
                    <img src={logo.src} alt={logo.alt} className="h-16 w-16 object-contain" />
                ) : LogoComponent ? (
                    <div className={`rounded-lg p-3 ${logo.color} dark:opacity-90`}>
                        <LogoComponent className="w-8 h-8 text-white" />
                    </div>
                ) : (
                    <div className="h-16 w-16 bg-gray-300 dark:bg-indigo-800 rounded-lg" />
                )}
                <span className={`text-xs uppercase font-bold px-3 py-1 rounded-full ${categoryColor} text-white dark:opacity-90`}>
                    {category}
                </span>
            </div>
            <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-indigo-100">{title}</h3>
            <p className="text-blue-600 dark:text-blue-300 mb-2">{subtitle}</p>
            <p className="text-gray-600 dark:text-indigo-300 text-sm mb-4">{description}</p>
            {features && (
                <ul className="mb-4 space-y-2">
                    {features.map(({ icon, text }, idx) => {
                        const FeatureIcon = iconMap[icon];
                        return (
                            <li key={idx} className="flex items-center space-x-2 text-gray-700 dark:text-indigo-200">
                                {FeatureIcon && <FeatureIcon className="w-4 h-4 text-green-500 dark:text-green-300" />}
                                <span className="text-sm">{text}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
            {pricing && (
                <div className="mb-4 grid grid-cols-2 gap-2 text-center">
                    {pricing.map(({ plan, price, note }, idx) => (
                        <div key={idx} className="bg-gray-100 dark:bg-indigo-800 rounded p-2">
                            <div className="text-sm font-semibold text-gray-900 dark:text-indigo-100">{plan}</div>
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-300">{price}</div>
                            <div className="text-xs text-gray-500 dark:text-indigo-400">{note}</div>
                        </div>
                    ))}
                </div>
            )}
            {testimonial && (
                <div className="rounded bg-blue-50 dark:bg-indigo-800/50 p-4">
                    {testimonial.rating && <div className="flex space-x-1">{renderStars(testimonial.rating)}</div>}
                    {testimonial.text && <p className="italic text-gray-700 dark:text-indigo-200 mt-2">{testimonial.text}</p>}
                    {testimonial.source && <p className="text-xs text-gray-500 dark:text-indigo-400 mt-1">{testimonial.source}</p>}
                    {testimonial.icon && (() => {
                        const Icon = iconMap[testimonial.icon];
                        return Icon ? <Icon className="mt-2 w-5 h-5 text-blue-600 dark:text-blue-300" /> : null;
                    })()}
                </div>
            )}
            <div className="mt-6 flex justify-between items-center border-t border-gray-200 dark:border-indigo-700 pt-4">
                <span className="flex items-center space-x-1 text-sm text-gray-500 dark:text-indigo-400">
                    <ExternalLink className="w-4 h-4" />
                    <span>Affiliate Link</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-blue-600 dark:bg-blue-500 px-4 py-2 text-white font-semibold hover:bg-blue-700 dark:hover:bg-blue-400 cursor-pointer transition">
                    {cta}
                    <ArrowRight className="w-4 h-4" />
                </span>
            </div>
        </a>
    );
};

export default ToolCard;
