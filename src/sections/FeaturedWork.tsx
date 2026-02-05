import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Play Ludo',
    description: 'Play Ludo Online with Friends & AI',
    url: 'https://play-ludo.com',
    image: 'https://images.unsplash.com/photo-1611996900188-b34f97c9480b?w=800&h=600&fit=crop',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    name: 'creasion.org',
    description: 'Nepali Yuwa in Climate Action and Green Growth (NYCAGG)',
    url: 'https://creasion.org',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    name: 'ENFORCER',
    description: 'By Australian Defence Apparel',
    url: 'https://enforcer.ada.com.au',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    name: 'SWIFT HRMS',
    description: 'Human Resource Management System',
    url: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    name: 'muncha.com',
    description: 'E-commerce Platform',
    url: 'https://muncha.com',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    name: 'HULAS FIN SERVE',
    description: 'EMI loan management system',
    url: '#',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  },
  {
    name: 'Dolphwin ATS',
    description: 'Job Application Tracking System',
    url: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
];

const FeaturedWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate each card on scroll
      projectRefs.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { scale: 0.9, opacity: 0, y: 60 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Letter fill animation
      letterRefs.current.forEach((letter) => {
        if (letter) {
          gsap.fromTo(
            letter,
            {
              color: '#d1d5db',
              opacity: 0.3,
            },
            {
              color: '#1f2937',
              opacity: 1,
              scrollTrigger: {
                trigger: letter,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1,
              },
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ctaText = 'Lets work together to create something awesome and beautiful. Whether you have a project in mind or just want to say hi, feel free to get in touch.'.replace('awesome and', 'awesome\u00A0and').replace('or just', 'or\u00A0just');
  const letters = ctaText.split('');

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 overflow-hidden"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="text-[12vw] md:text-[10vw] font-bold text-gray-300 leading-none tracking-tighter px-6 md:px-16 mb-20"
      >
        FEATURED WORK
      </h2>

      {/* Projects Grid */}
      <div className="px-6 md:px-16" ref={projectsContainerRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.name}
              ref={(el) => { projectRefs.current[index] = el; }}
              className="group"
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <div
                  className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl"
                  style={{ background: project.gradient }}
                >
                  <div className="aspect-[4/3] relative overflow-hidden p-4">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 bg-white/95 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {project.name}
                    </h3>
                    <p className="text-sm mt-2 text-gray-600">
                      {project.description}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section with Letter Animation */}
      <div ref={ctaRef} className="text-center py-32 px-6">
        <p className="text-2xl md:text-4xl font-light max-w-4xl mx-auto leading-relaxed">
          {letters.map((letter, index) => (
            <span
              key={index}
              ref={(el) => { letterRefs.current[index] = el; }}
              className="inline-block transition-colors duration-300"
              style={{ color: '#d1d5db' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default FeaturedWork;
