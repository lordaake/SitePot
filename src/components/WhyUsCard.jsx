// src/components/WhyUsCard.jsx
import { Search, Shield, Zap } from 'lucide-react';


const iconMap = {
    Search,
    Shield,
    Zap,
};


const WhyUsCard = ({ icon, gradient, title, description }) => {
    const IconComponent = iconMap[icon];
    return (
        <div className="text-center">
            {/* Icon container with gradient background */}
            <div className={`w-20 h-20 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <IconComponent className="h-10 w-10 text-white" />
            </div>
            {/* Title: Darker in light mode, much lighter in dark mode, slightly larger */}
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {title}
            </h3>
            {/* Description: Darker in light mode, significantly lighter in dark mode */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {description}
            </p>
        </div>
    );
};


export default WhyUsCard;
