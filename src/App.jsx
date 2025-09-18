// src/App.jsx

import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DomainList from './components/DomainList';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import ContactSection from './components/ContactSection';

// This component helps to scroll to the top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-lepre-white">
        <div className="text-2xl font-bold text-lepre-text-primary animate-pulse">
          Gathering the luck...
        </div>
      </div>
    );
  }

  const HomePage = () => (
    <div className="container mx-auto px-4">
      <Hero />
      <DomainList />
      {/* <ContactSection /> */}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-lepre-white text-lepre-text-primary">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

