import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Gaura Nitai Technologies',
    period: 'June 2025 – August 2025',
    role: 'React.js Developer Intern',
    achievements: [
      'Completed a 2-month internship as a React.js Developer, working on real-world web applications and UI modules.',
      'Built reusable and responsive components using React.js, JavaScript, and modern CSS, ensuring clean UI and smooth user experience.',
      'Integrated APIs and handled dynamic data rendering to improve application functionality and performance.',
      'Collaborated with senior developers to follow best practices, optimize code, and improve overall frontend architecture.',
    ],
    technologies: 'React.js, JavaScript, HTML, CSS, API Integration, Git',
  },
  {
    company: 'Chaotic Jack',
    period: '2023 – Present',
    role: 'Co-Founder | Marketing & Web Solutions Agency',
    achievements: [
      'Co-founded Chaotic Jack, a digital marketing and web solutions agency delivering end-to-end services for startups and businesses.',
      'Led website development projects including business websites, landing pages, and eCommerce platforms, focusing on performance and conversions.',
      'Planned and executed SEO, performance marketing, and brand-focused digital strategies to help clients scale online.',
      'Worked closely with clients to understand business goals and translate them into effective digital solutions.',
    ],
    technologies: 'Web Development, SEO, Performance Marketing, WordPress, React.js, UI/UX, Client Management',
  },
];

const projectImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400&h=300&fit=crop',
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

      // Experience items animation
      gsap.fromTo(
        '.experience-item',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Rotating carousel animation
      gsap.to(carouselRef.current, {
        rotateY: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-12 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="text-[12vw] md:text-[10vw] font-bold text-gray-300 leading-none tracking-tighter mb-20"
      >
        EXPERIENCE
      </h2>

      {/* 3D Carousel of project images */}
      <div className="relative h-[300px] mb-20 perspective-1000 overflow-hidden">
        <div
          ref={carouselRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {projectImages.map((image, index) => {
            const angle = (360 / projectImages.length) * index;
            const radius = 400;
            return (
              <div
                key={index}
                className="absolute preserve-3d"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={image}
                  alt={`Project ${index + 1}`}
                  className="w-48 h-32 object-cover rounded-lg shadow-xl"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Experience content */}
      <div ref={contentRef} className="max-w-6xl mx-auto">
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="experience-item grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 pb-16 border-b border-gray-200 last:border-0"
          >
            {/* Company info - Left side */}
            <div className="md:col-span-4">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                {exp.company}
              </h3>
              <p className="text-gray-500 mt-2">{exp.period}</p>
            </div>

            {/* Role details - Right side */}
            <div className="md:col-span-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                {exp.role}
              </h4>
              <ul className="space-y-3">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-gray-600 leading-relaxed flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Technologies:</span>{' '}
                  {exp.technologies}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
