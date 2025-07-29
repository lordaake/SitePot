// src/pages/HomePage.jsx
import React, { useRef } from 'react';
import HeroSection from '../sections/HeroSection';
import GameSection from '../sections/GameSection';
import ToolsSection from '../sections/ToolsSection';
import AboutSection from '../sections/AboutSection';
import DomainsSection from '../sections/DomainsSection';


const HomePage = () => {
    const toolsSectionRef = useRef(null);
    const gameSectionRef = useRef(null);


    const handleScrollToTools = (e) => {
        e.preventDefault();
        if (toolsSectionRef.current) {
            const navbarHeight = 64; // h-16
            const elementPosition = toolsSectionRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };


    const handleScrollToGame = (e) => {
        e.preventDefault();
        if (gameSectionRef.current) {
            const navbarHeight = 64;
            const elementPosition = gameSectionRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };


    return (
        <main className="text-gray-900 dark:text-white bg-white dark:bg-gray-900">
            <HeroSection onExploreClick={handleScrollToTools} onTryGameClick={handleScrollToGame} />
            <GameSection ref={gameSectionRef} />
            <ToolsSection ref={toolsSectionRef} />
            <AboutSection />
            <DomainsSection />
        </main>
    );
};


export default HomePage;
