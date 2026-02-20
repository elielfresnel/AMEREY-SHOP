import { useEffect, useState } from 'react';
import './index.css';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';

// Components
import Loader from './components/Loader';
import FloatingButtons from './components/FloatingButtons';

// Sections
import Hero from './sections/Hero';
import Welcome from './sections/Welcome';
import Collections from './sections/Collections';
import Footer from './sections/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set page title from config
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }

    // Add viewport meta for better mobile experience
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loader */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      {/* Main Content */}
      <main 
        className={`relative w-full min-h-screen transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundColor: '#F5F5F3' }}
      >
        {/* Hero Section */}
        <Hero />

        {/* Welcome Section */}
        <Welcome />

        {/* Collections Section */}
        <Collections />

        {/* Footer Section */}
        <Footer />

        {/* Floating Buttons */}
        <FloatingButtons />
      </main>
    </>
  );
}

export default App;
