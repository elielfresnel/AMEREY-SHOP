import { useEffect, useState } from 'react';
import { MessageCircle, ChevronUp } from 'lucide-react';
import gsap from 'gsap';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showScrollTop) {
      gsap.fromTo(
        '.scroll-top-btn',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Bonjour, je souhaite avoir des informations sur vos collections.');
    window.open(`https://wa.me/+2290166393459?text=${message}`, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="whatsapp-btn fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
        style={{ 
          backgroundColor: '#25D366',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
        }}
        aria-label="Contact WhatsApp"
      >
        <MessageCircle size={28} color="white" fill="white" />
      </button>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-top-btn fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          style={{ 
            backgroundColor: '#1F4D3A',
            boxShadow: '0 4px 20px rgba(31, 77, 58, 0.3)'
          }}
          aria-label="Retour en haut"
        >
          <ChevronUp size={24} color="#F5F5F3" />
        </button>
      )}
    </>
  );
}
