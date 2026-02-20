import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll('.footer-animate');
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Merci de votre inscription !');
      setEmail('');
    }
  };

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#1F4D3A' }}
    >
      <div ref={contentRef} className="container-luxury">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="footer-animate opacity-0 lg:col-span-1">
            <h3 
              className="font-display text-3xl tracking-[0.2em] mb-6"
              style={{ color: '#F5F5F3' }}
            >
              {footerConfig.brandName}
            </h3>
            <p 
              className="font-body text-sm leading-relaxed mb-6"
              style={{ color: 'rgba(245, 245, 243, 0.7)' }}
            >
              {footerConfig.brandDescription}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {footerConfig.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ 
                    backgroundColor: 'rgba(245, 245, 243, 0.1)',
                    border: '1px solid rgba(245, 245, 243, 0.2)'
                  }}
                  aria-label={link.label}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    width="18" 
                    height="18" 
                    stroke="#F5F5F3" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    {link.icon === 'instagram' && (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </>
                    )}
                    {link.icon === 'facebook' && (
                      <>
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </>
                    )}
                    {link.icon === 'pinterest' && (
                      <>
                        <line x1="12" y1="8" x2="12" y2="21" />
                        <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                      </>
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-animate opacity-0">
            <h4 
              className="font-display text-xl mb-6"
              style={{ color: '#F5F5F3' }}
            >
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              {footerConfig.quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-sm transition-opacity hover:opacity-70"
                    style={{ color: 'rgba(245, 245, 243, 0.7)' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-animate opacity-0">
            <h4 
              className="font-display text-xl mb-6"
              style={{ color: '#F5F5F3' }}
            >
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="#F5F5F3" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span 
                  className="font-body text-sm"
                  style={{ color: 'rgba(245, 245, 243, 0.7)' }}
                >
                  {footerConfig.contact.email}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="#F5F5F3" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span 
                  className="font-body text-sm"
                  style={{ color: 'rgba(245, 245, 243, 0.7)' }}
                >
                  {footerConfig.contact.phone}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="#F5F5F3" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span 
                  className="font-body text-sm"
                  style={{ color: 'rgba(245, 245, 243, 0.7)' }}
                >
                  {footerConfig.contact.address}
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-animate opacity-0">
            <h4 
              className="font-display text-xl mb-6"
              style={{ color: '#F5F5F3' }}
            >
              {footerConfig.newsletter.title}
            </h4>
            <p 
              className="font-body text-sm mb-4"
              style={{ color: 'rgba(245, 245, 243, 0.7)' }}
            >
              {footerConfig.newsletter.description}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-full font-body text-sm outline-none transition-all"
                style={{ 
                  backgroundColor: 'rgba(245, 245, 243, 0.1)',
                  border: '1px solid rgba(245, 245, 243, 0.2)',
                  color: '#F5F5F3'
                }}
              />
              <button
                type="submit"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: '#F5F5F3' }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="#1F4D3A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="footer-animate opacity-0 h-[1px] mb-8"
          style={{ backgroundColor: 'rgba(245, 245, 243, 0.1)' }}
        />

        {/* Copyright */}
        <div className="footer-animate opacity-0 flex flex-col md:flex-row items-center justify-between gap-4">
          <p 
            className="font-body text-xs"
            style={{ color: 'rgba(245, 245, 243, 0.5)' }}
          >
            {footerConfig.copyright}
          </p>
          <div className="flex gap-6">
            <a 
              href="#" 
              className="font-body text-xs transition-opacity hover:opacity-70"
              style={{ color: 'rgba(245, 245, 243, 0.5)' }}
            >
              Politique de confidentialité
            </a>
            <a 
              href="#" 
              className="font-body text-xs transition-opacity hover:opacity-70"
              style={{ color: 'rgba(245, 245, 243, 0.5)' }}
            >
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
