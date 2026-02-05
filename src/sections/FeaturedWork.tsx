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
    color: '#e8f5e9',
  },
  {
    name: 'creasion.org',
    description: 'Nepali Yuwa in Climate Action and Green Growth (NYCAGG)',
    url: 'https://creasion.org',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
    color: '#c8e6c9',
  },
  {
    name: 'ENFORCER',
    description: 'By Australian Defence Apparel',
    url: 'https://enforcer.ada.com.au',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    color: '#212121',
    textColor: 'white',
  },
  {
    name: 'SWIFT HRMS',
    description: 'Human Resource Management System',
    url: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    color: '#fff9c4',
  },
  {
    name: 'muncha.com',
    description: 'E-commerce Platform',
    url: 'https://muncha.com',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    color: '#f5f5f5',
  },
  {
    name: 'HULAS FIN SERVE',
    description: 'EMI loan management system',
    url: '#',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    color: '#e0f2f1',
  },
  {
    name: 'Dolphwin ATS',
    description: 'Job Application Tracking System',
    url: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    color: '#1a1a2e',
    textColor: 'white',
  },
];

const FeaturedWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation - stays visible longer
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=80%',
          pin: headingRef.current,
          pinSpacing: false,
          scrub: 1,
        },
      });

      // Fade out heading gradually
      headingTl.to(headingRef.current, {
        opacity: 0,
        y: -50,
        ease: 'power1.inOut',
      });

      // Projects carousel animation - starts immediately after heading
      const projectTl = gsap.timeline({
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 60%',
          end: '+=350%',
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: Projects appear from right to center (0-30% of timeline)
      projectTl.fromTo(
        projectRefs.current,
        {
          x: (i) => 600 + i * 80,
          opacity: 0,
          scale: 0.85,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          duration: 0.3,
        },
        0
      );

      // Phase 2: Hold in center (30-50% of timeline)
      projectTl.to(
        projectRefs.current,
        {
          x: 0,
          duration: 0.2,
        },
        0.3
      );

      // Phase 3: Horizontal scroll from center to left (50-100% of timeline)
      projectTl.to(
        projectRefs.current,
        {
          x: (i) => -(i * 420) + 200,
          ease: 'none',
          duration: 0.5,
        },
        0.5
      );

      // CTA text animation
      gsap.fromTo(
        '.cta-word',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 overflow-hidden"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="text-[15vw] md:text-[12vw] font-bold text-gray-300 leading-none tracking-tighter px-6 md:px-16"
      >
        FEATURED WORK
      </h2>

      {/* Projects Carousel */}
      <div
        ref={carouselRef}
        className="relative mt-16 h-[600px] overflow-hidden flex items-center"
      >
        <div className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-8 px-16">
          {projects.map((project, index) => (
            <div
              key={project.name}
              ref={(el) => { projectRefs.current[index] = el; }}
              className="flex-shrink-0 w-[400px] group cursor-pointer"
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <div
                  className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundColor: project.color }}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3
                      className={`text-2xl font-bold ${project.textColor === 'white' ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                      {project.name}
                    </h3>
                    <p
                      className={`text-sm mt-2 ${project.textColor === 'white' ? 'text-gray-300' : 'text-gray-600'
                        }`}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="text-center py-20 px-6">
        <p className="text-2xl md:text-4xl font-light text-gray-800 max-w-4xl mx-auto leading-relaxed">
          <span className="cta-word inline-block">Lets</span>{' '}
          <span className="cta-word inline-block">work</span>{' '}
          <span className="cta-word inline-block">together</span>{' '}
          <span className="cta-word inline-block">to</span>{' '}
          <span className="cta-word inline-block">create</span>{' '}
          <span className="cta-word inline-block">something</span>{' '}
          <span className="cta-word inline-block">awesome</span>{' '}
          <span className="cta-word inline-block">and</span>{' '}
          <span className="cta-word inline-block text-gray-400">beautiful.</span>{' '}
          <span className="cta-word inline-block text-gray-400">Whether</span>{' '}
          <span className="cta-word inline-block text-gray-400">you</span>{' '}
          <span className="cta-word inline-block text-gray-400">have</span>{' '}
          <span className="cta-word inline-block text-gray-400">a</span>{' '}
          <span className="cta-word inline-block text-gray-400">project</span>{' '}
          <span className="cta-word inline-block text-gray-400">in</span>{' '}
          <span className="cta-word inline-block text-gray-400">mind</span>{' '}
          <span className="cta-word inline-block text-gray-400">or</span>{' '}
          <span className="cta-word inline-block text-gray-400">just</span>{' '}
          <span className="cta-word inline-block text-gray-400">want</span>{' '}
          <span className="cta-word inline-block text-gray-400">to</span>{' '}
          <span className="cta-word inline-block text-gray-400">say</span>{' '}
          <span className="cta-word inline-block text-gray-400">hi,</span>{' '}
          <span className="cta-word inline-block text-gray-400">feel</span>{' '}
          <span className="cta-word inline-block text-gray-400">free</span>{' '}
          <span className="cta-word inline-block text-gray-400">to</span>{' '}
          <span className="cta-word inline-block text-gray-400">get</span>{' '}
          <span className="cta-word inline-block text-gray-400">in</span>{' '}
          <span className="cta-word inline-block text-gray-400">touch.</span>
        </p>
      </div>
    </section>
  );
};

export default FeaturedWork;
