import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Hero from './sections/Hero';
import About from './sections/About';
import FeaturedWork from './sections/FeaturedWork';
import Experience from './sections/Experience';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Add smooth scroll momentum (if ScrollSmoother is available)
      // Note: ScrollSmoother requires GSAP Club membership
      // Using standard smooth scrolling instead

      // Add fade-in transitions for sections
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          gsap.fromTo(
            section,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Refresh ScrollTrigger on load
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative bg-white min-h-screen">
      <div ref={(el) => { sectionsRef.current[0] = el; }}>
        <Hero />
      </div>
      <div ref={(el) => { sectionsRef.current[1] = el; }}>
        <About />
      </div>
      <div ref={(el) => { sectionsRef.current[2] = el; }}>
        <FeaturedWork />
      </div>
      <div ref={(el) => { sectionsRef.current[3] = el; }}>
        <Experience />
      </div>
      <div ref={(el) => { sectionsRef.current[4] = el; }}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
