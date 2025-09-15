// src/App.jsx

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DomainList from './components/DomainList';
import Footer from './components/Footer';

function App() {
  return (
    <div className="magic-bg bg-dark-purple">
      <Navbar />
      <main className="container mx-auto px-4">
        <Hero />
        <DomainList />
      </main>
      <Footer />
    </div>
  );
}

export default App;