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
            Lalitpur, Nepal
          </p>
          <p className="text-xs tracking-widest text-gray-400 uppercase mt-2">
            riteshchauhan@gmail.com
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5865F2] text-white hover:opacity-80 transition-opacity"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition-opacity"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://upwork.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#6FDA44] text-white hover:opacity-80 transition-opacity"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.215 2.703 2.71 0 1.489-1.207 2.695-2.704 2.695zm0-8.093c-2.97 0-4.976 2.119-5.646 4.826-.169.1-.362.155-.565.155-.211 0-.42-.058-.6-.169l-.906-.565c-.169-.104-.267-.288-.267-.488 0-.106.028-.206.08-.297 1.252-2.75 3.764-4.566 6.904-4.566 4.143 0 7.515 3.372 7.515 7.515 0 4.143-3.372 7.515-7.515 7.515-1.128 0-2.212-.253-3.224-.751l-.15-.075c-.252-.127-.412-.387-.412-.672 0-.386.314-.7.7-.7.124 0 .244.033.349.094l.15.075c.751.376 1.566.566 2.387.566 3.308 0 6-2.692 6-6s-2.692-6-6-6zM7.515 13.158c-1.489 0-2.7-1.206-2.7-2.695 0-1.495 1.211-2.71 2.7-2.71 1.487 0 2.698 1.215 2.698 2.71 0 1.489-1.211 2.695-2.698 2.695zm0-8.093c-4.143 0-7.515 3.372-7.515 7.515 0 4.143 3.372 7.515 7.515 7.515 4.143 0 7.515-3.372 7.515-7.515 0-4.143-3.372-7.515-7.515-7.515z" />
            </svg>
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
