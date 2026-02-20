import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collectionsConfig } from '../config';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Collections() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

      // Description animation
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.collection-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.2,
            delay: 0.4,
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

  // 3D Card hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });

    setHoveredCard(cardId);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    setHoveredCard(null);
  };

  return (
    <section
      id="collections"
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
            {collectionsConfig.sectionLabel}
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-6 opacity-0"
          style={{ color: '#1F4D3A' }}
        >
          {collectionsConfig.title}
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="font-body text-sm md:text-base text-center max-w-2xl mx-auto mb-16 opacity-0"
          style={{ color: '#444444' }}
        >
          {collectionsConfig.description}
        </p>

        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          style={{ perspective: '1000px' }}
        >
          {collectionsConfig.collections.map((collection) => (
            <div
              key={collection.id}
              className="collection-card relative opacity-0"
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
              onMouseMove={(e) => handleMouseMove(e, collection.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="relative overflow-hidden rounded-2xl card-shadow"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Image Container */}
                <div className="image-hover-zoom relative h-80 md:h-96 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Image Overlay */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ 
                      background: 'linear-gradient(180deg, transparent 50%, rgba(31, 77, 58, 0.7) 100%)',
                      opacity: hoveredCard === collection.id ? 1 : 0.5
                    }}
                  />
                </div>

                {/* Content */}
                <div 
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                  style={{ 
                    transform: 'translateZ(30px)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Title */}
                  <h3 
                    className="font-display text-2xl md:text-3xl mb-3"
                    style={{ color: '#F5F5F3' }}
                  >
                    {collection.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="font-body text-sm mb-6 line-clamp-2"
                    style={{ color: 'rgba(245, 245, 243, 0.8)' }}
                  >
                    {collection.description}
                  </p>

                  {/* Button */}
                  <button 
                    className="btn-luxury inline-flex items-center gap-2 text-xs"
                    style={{ 
                      backgroundColor: '#F5F5F3',
                      color: '#1F4D3A',
                      border: 'none'
                    }}
                  >
                    {collection.buttonText}
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Floating Badge */}
                <div 
                  className="absolute top-6 right-6 px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: '#1F4D3A',
                    transform: 'translateZ(50px)'
                  }}
                >
                  <span 
                    className="font-body text-xs tracking-wider"
                    style={{ color: '#F5F5F3' }}
                  >
                    Premium
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
