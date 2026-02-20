import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, ChevronDown } from 'lucide-react';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  // Text decode animation
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const originalText = heroConfig.mainTitle;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let iteration = 0;

    const interval = setInterval(() => {
      title.innerText = originalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          if (letter === ' ') return ' ';
          return chars[Math.floor(Math.random() * 26)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in subtitle and description
      gsap.fromTo(
        [subtitleRef.current, descRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 1.5, ease: 'power2.out' }
      );

      // Parallax effect on scroll
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Fade out on scroll
      gsap.to('.hero-content', {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });
    }, heroRef);

    // Navigation visibility on scroll
    const handleScroll = () => {
      setNavVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="hero-bg absolute inset-0 w-full h-[120%]">
        <img
          src={heroConfig.backgroundImage}
          alt="AMEREY SHOP"
          className="w-full h-full object-cover"
        />
        {/* Dark Green Overlay */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        navVisible ? 'nav-solid py-4' : 'nav-transparent py-6'
      }`}>
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <div 
            className="font-display text-xl md:text-2xl tracking-[0.2em] cursor-pointer"
            style={{ color: '#F5F5F3' }}
            onClick={() => scrollToSection('hero')}
          >
            {heroConfig.brandName}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {heroConfig.navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="font-body text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
                style={{ color: '#F5F5F3' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden z-50 p-2"
            style={{ color: '#F5F5F3' }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="flex flex-col items-center gap-8">
          {heroConfig.navItems.map((item, index) => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className="font-display text-3xl tracking-wider"
              style={{ 
                color: '#F5F5F3',
                animationDelay: `${index * 0.1}s`
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="hero-content absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        {/* Main Title with Decode Effect */}
        <h1
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] text-shadow-hero mb-6"
          style={{ color: '#F5F5F3' }}
        >
          {heroConfig.mainTitle}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4 opacity-0"
          style={{ color: 'rgba(245, 245, 243, 0.9)' }}
        >
          {heroConfig.subtitle}
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="font-body text-base md:text-lg tracking-wider opacity-0"
          style={{ color: 'rgba(245, 245, 243, 0.7)' }}
        >
          {heroConfig.description}
        </p>

        {/* Decorative Line */}
        <div 
          className="decorative-line mt-8"
          style={{ background: 'rgba(245, 245, 243, 0.3)' }}
        />
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 scroll-indicator cursor-pointer"
        onClick={() => scrollToSection('welcome')}
      >
        <span 
          className="font-body text-xs tracking-widest uppercase mb-2"
          style={{ color: 'rgba(245, 245, 243, 0.6)' }}
        >
          {heroConfig.scrollHint}
        </span>
        <ChevronDown 
          size={24} 
          style={{ color: 'rgba(245, 245, 243, 0.6)' }}
        />
      </div>
    </section>
  );
}
