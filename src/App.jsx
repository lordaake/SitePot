// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import router components

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage'; // Import the new Blog page
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    // Wrap the entire app in BrowserRouter to enable routing
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        {/* Navbar and Footer are outside Routes to appear on all pages */}
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex-grow">
          <Routes>
            {/* Route for the Home Page */}
            <Route path="/" element={<HomePage />} />
            {/* Route for the new Blog Page */}
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </main>

        <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </BrowserRouter>
  );
}

export default App;
