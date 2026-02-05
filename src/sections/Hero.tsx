import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techCards = [
  { name: 'REACT', color: '#1a1a2e', icon: 'react' },
  { name: 'NEXT JS', color: '#2d2d2d', icon: 'next' },
  { name: 'NODE.JS', color: '#68A063', icon: 'nodejs' },
  { name: 'FIREBASE', color: '#FFA611', icon: 'firebase' },
  { name: 'TYPESCRIPT', color: '#b91c1c', icon: 'typescript' },
  { name: 'GSAP', color: '#eab308', icon: 'gsap' },
];

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load animation
      const tl = gsap.timeline();

      // Animate name on load
      tl.fromTo(
        '.name-char',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: 'power3.out',
        }
      );

      // Animate subtitle
      tl.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      // Animate cards on load
      tl.fromTo(
        cardRefs.current,
        { y: 200, opacity: 0, rotateY: -30 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      // Scroll animation - cards fly to right one by one (faster)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 0.8,
        },
      });

      // Animate each card individually with flying effect - keeping them visible longer
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const delay = index * 0.12;

          scrollTl.fromTo(
            card,
            {
              x: 0,
              y: 0,
              opacity: 1,
              rotateY: 0,
              scale: 1,
            },
            {
              x: 450,
              y: -120,
              opacity: 0.3,
              rotateY: -30,
              scale: 0.85,
              ease: 'power1.out',
            },
            delay
          );
        }
      });

      // Fade out name
      scrollTl.fromTo(
        nameRef.current,
        {
          opacity: 1,
          y: 0,
        },
        {
          opacity: 0,
          y: -60,
          ease: 'power1.out',
        },
        0.2
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'react':
        return (
          <svg viewBox="0 0 841.9 595.3" className="w-16 h-16" fill="#61DAFB">
            <g>
              <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" />
              <circle cx="420.9" cy="296.5" r="45.7" />
            </g>
          </svg>
        );
      case 'next':
        return (
          <div className="text-white text-4xl font-bold tracking-tighter">
            NEXT<span className="text-gray-400 text-xl">.JS</span>
          </div>
        );
      case 'nodejs':
        return (
          <svg viewBox="0 0 256 289" className="w-16 h-16" fill="#539E43">
            <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.156.796-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915l-105.74-60.953c-1.06-.53-2.385-.53-3.18 0L20.405 80.166c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.636 7.95 25.44-1.325 25.44-10.6V93.68c0-1.59 1.326-3.18 3.181-3.18h13.516c1.59 0 3.18 1.325 3.18 3.18v120.58c0 20.936-11.396 33.126-31.272 33.126-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 220.885 0 213.465 0 205.515V83.346C0 75.396 4.24 67.976 11.13 64L116.87 2.783c6.625-3.71 15.635-3.71 22.26 0L244.87 64C251.76 67.975 256 75.395 256 83.346v122.17c0 7.95-4.24 15.37-11.13 19.345L139.13 286.08c-3.445 1.59-7.42 2.385-11.13 2.385zm32.596-84.009c-46.377 0-55.917-21.2-55.917-39.26 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.916 1.06 2.916 2.65 2.12 14.045 8.215 20.936 36.306 20.936 22.26 0 31.802-5.035 31.802-16.96 0-6.891-2.65-11.926-37.366-15.372-28.886-2.915-46.907-9.275-46.907-32.33 0-21.467 18.02-34.186 48.232-34.186 33.921 0 50.617 11.66 52.737 37.101 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.326 0-2.65-1.06-2.916-2.385-3.18-14.575-11.395-19.345-33.126-19.345-24.38 0-27.296 8.48-27.296 14.84 0 7.686 3.445 10.07 36.306 14.31 32.597 4.24 47.967 10.336 47.967 33.127-.265 23.321-19.345 36.571-53.002 36.571z" />
          </svg>
        );
      case 'firebase':
        return (
          <svg viewBox="0 0 256 351" className="w-16 h-16">
            <path d="M1.253 280.732l1.605-3.131 99.353-188.518-44.15-83.475C54.392-1.283 45.074.474 43.87 8.188L1.253 280.732z" fill="#FFC24A" />
            <path d="M134.417 148.974l32.039-32.812-32.039-61.007c-3.042-5.791-10.433-6.398-13.443-.59l-17.705 34.109-.53 1.744 31.678 58.556z" fill="#FFA712" />
            <path d="M134.417 148.974l-33.632-62.852-32.039 61.007 65.671-161.845z" fill="#F4BD62" />
            <path d="M134.417 148.974L0 282.732l100.785-133.758-32.039-61.007z" fill="#FFA50E" />
            <g><path d="M139.12 347.551l116.275-64.847-33.204-204.495c-1.039-6.398-8.888-8.927-13.468-4.34L1.253 280.732l115.608 64.548a24.126 24.126 0 0 0 22.259.271" fill="#F6820C" /></g>
          </svg>
        );
      case 'typescript':
        return (
          <div className="bg-[#3178C6] px-4 py-2 rounded">
            <span className="text-white text-3xl font-bold">TS</span>
          </div>
        );
      case 'gsap':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16">
            <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="#88CE02" />
            <path d="M50 25 L75 37 L75 62 L50 75 L25 62 L25 37 Z" fill="white" />
            <circle cx="50" cy="50" r="10" fill="#88CE02" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Top info */}
      <div className="absolute top-8 left-0 right-0 text-center">
        <p className="text-xs tracking-widest text-gray-500 uppercase">Delhi, India</p>
        <p className="text-xs tracking-widest text-gray-400 uppercase mt-1">riteshchauhan43792@gmail.com</p>
      </div>

      {/* Main name */}
      <div ref={nameRef} className="text-center z-10 mt-0">
        <h1 className="text-[12vw] md:text-[10vw] font-bold leading-[0.9] tracking-tight text-black">
          <div className="overflow-hidden">
            <span className="name-char inline-block">R</span>
            <span className="name-char inline-block">I</span>
            <span className="name-char inline-block">T</span>
            <span className="name-char inline-block">E</span>
            <span className="name-char inline-block">S</span>
            <span className="name-char inline-block">H</span>
          </div>
          <div className="overflow-hidden mt-2">
            <span className="name-char inline-block">C</span>
            <span className="name-char inline-block">H</span>
            <span className="name-char inline-block">A</span>
            <span className="name-char inline-block">U</span>
            <span className="name-char inline-block">H</span>
            <span className="name-char inline-block">A</span>
            <span className="name-char inline-block">N</span>
          </div>
        </h1>
        <p className="hero-subtitle text-sm md:text-base text-gray-500 mt-6 tracking-wide">
          2+ Years of Crafting Innovative Web Projects
        </p>

        {/* Tech cards */}
        <div
          ref={cardsRef}
          className="mt-12 perspective-1000"
        >
          <div className="flex items-end justify-center gap-[-20px]">
            {techCards.map((tech, index) => (
              <div
                key={tech.name}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="preserve-3d"
                style={{
                  marginLeft: index > 0 ? '-40px' : '0',
                  zIndex: techCards.length - index,
                }}
              >
                <div
                  className="w-32 h-40 md:w-40 md:h-48 rounded-2xl flex flex-col items-center justify-center gap-4 shadow-2xl transition-transform hover:scale-105 cursor-pointer"
                  style={{ backgroundColor: tech.color }}
                >
                  {renderIcon(tech.icon)}
                  <span className="text-white text-sm font-medium tracking-wider">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
