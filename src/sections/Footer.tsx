import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-white py-16 px-6 md:px-16 lg:px-24 border-t border-gray-100"
    >
      <div className="footer-content max-w-6xl mx-auto text-center">
        {/* Location and Email */}
        <div className="mb-8">
          <p className="text-xs tracking-widest text-gray-500 uppercase">
            Delhi, India
          </p>
          <p className="text-xs tracking-widest text-gray-400 uppercase mt-2">
            riteshchauhan43792@gmail.com
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/ritesh-chauhan-739775324/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0077B5] text-white hover:opacity-80 transition-opacity"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/RITESH-CHAUHAN2005"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition-opacity"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} RITESH CHAUHAN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
