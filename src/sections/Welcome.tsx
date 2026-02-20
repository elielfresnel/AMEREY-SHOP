import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { welcomeConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Welcome() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Decorative line animation
      gsap.fromTo(
        lineRef.current,
        { width: 0 },
        {
          width: 60,
          duration: 0.8,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description animation
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Features animation
      const featureItems = featuresRef.current?.querySelectorAll('.feature-item');
      if (featureItems) {
        gsap.fromTo(
          featureItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="welcome"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#F5F5F3' }}
    >
      <div className="container-luxury">
        {/* Section Label */}
        <div className="text-center mb-4">
          <span 
            className="font-body text-xs tracking-[0.3em] uppercase"
            style={{ color: '#2E7D5A' }}
          >
            {welcomeConfig.sectionLabel}
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-4 opacity-0"
          style={{ color: '#1F4D3A' }}
        >
          {welcomeConfig.title}
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-base md:text-lg text-center tracking-wide mb-6 opacity-0"
          style={{ color: '#444444' }}
        >
          {welcomeConfig.subtitle}
        </p>

        {/* Decorative Line */}
        <div className="flex justify-center mb-10">
          <div 
            ref={lineRef}
            className="h-[2px] rounded-full"
            style={{ 
              background: 'linear-gradient(90deg, #1F4D3A, #2E7D5A)',
              width: 0
            }}
          />
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="font-body text-sm md:text-base leading-relaxed text-center max-w-3xl mx-auto mb-16 opacity-0"
          style={{ color: '#444444', lineHeight: '2' }}
        >
          {welcomeConfig.description}
        </p>

        {/* Features Grid */}
        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {welcomeConfig.features.map((feature, index) => (
              <div
                key={index}
                className="feature-item flex flex-col items-center text-center p-6 opacity-0"
              >
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 hover:scale-110 icon-container"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(31, 77, 58, 0.1), rgba(46, 125, 90, 0.05))',
                    border: '1px solid rgba(31, 77, 58, 0.2)'
                  }}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    width="28" 
                    height="28" 
                    stroke="#1F4D3A" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    {feature.title === 'Qualité Premium' && (
                      <>
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        <path d="M5 3v4" />
                        <path d="M19 17v4" />
                      </>
                    )}
                    {feature.title === 'Style Intemporel' && (
                      <>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </>
                    )}
                    {feature.title === 'Service Personnalisé' && (
                      <>
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </>
                    )}
                  </svg>
                </div>

                {/* Title */}
                <h3 
                  className="font-display text-xl md:text-2xl mb-3"
                  style={{ color: '#1F4D3A' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p 
                  className="font-body text-sm"
                  style={{ color: '#444444' }}
                >
                  {feature.description}
                </p>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
