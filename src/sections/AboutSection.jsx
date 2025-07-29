// src/sections/AboutSection.jsx
import { whyUsData } from '../data/whyUs';
import WhyUsCard from '../components/WhyUsCard';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Agent Vanguard's Core Principles
                    </h2>
                    {/* Removed the second heading (p tag) */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {whyUsData.map((item, index) => (
                        <WhyUsCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
