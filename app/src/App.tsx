import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Play, Pause, Volume2, VolumeX, Menu, X, 
  Instagram, Linkedin, Mail, Phone, MapPin,
  ArrowRight, Download
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Video assets mapping
const videos = {
  hero: '/assets/videos/21820.mp4',
  interior1: '/assets/videos/21822.mp4',
  exterior: '/assets/videos/21824.mp4',
  living: '/assets/videos/21828.mp4',
  kitchen: '/assets/videos/21829.mp4',
  bedroom: '/assets/videos/21831.mp4',
  dining: '/assets/videos/21834.mp4',
  lounge: '/assets/videos/21836.mp4',
  final: '/assets/videos/21838.mp4',
};

// Image assets
const images = {
  interior1: '/assets/images/21814.jpg',
  interior2: '/assets/images/21815.jpg',
  profile: '/assets/images/21843.jpg',
  property1: '/assets/images/21845.jpg',
  property2: '/assets/images/21847.jpg',
  property3: '/assets/images/21848.jpg',
  property4: '/assets/images/21849.jpg',
  property5: '/assets/images/21851.jpg',
  property6: '/assets/images/21853.jpg',
};

// Music tracks - user can add their own tracks to the music folder
// Format: { id: number, title: string, artist: string, src: string }

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  
  const mainRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const section6Ref = useRef<HTMLDivElement>(null);
  const section7Ref = useRef<HTMLDivElement>(null);
  const section8Ref = useRef<HTMLDivElement>(null);
  const section9Ref = useRef<HTMLDivElement>(null);
  const section10Ref = useRef<HTMLDivElement>(null);

  // Loading animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    
    const handleMouseLeave = () => setCursorVisible(false);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Cursor animation
  useEffect(() => {
    if (cursorRef.current && cursorDotRef.current) {
      gsap.to(cursorRef.current, {
        x: cursorPos.x - 10,
        y: cursorPos.y - 10,
        duration: 0.15,
        ease: 'power2.out',
      });
      gsap.to(cursorDotRef.current, {
        x: cursorPos.x - 2,
        y: cursorPos.y - 2,
        duration: 0.08,
        ease: 'power2.out',
      });
    }
  }, [cursorPos]);

  // Main scroll animations
  useEffect(() => {
    if (loading) return;
    
    const ctx = gsap.context(() => {
      // Section 1: Hero - Auto-play entrance animation
      const heroTl = gsap.timeline();
      heroTl
        .fromTo('.hero-video', 
          { opacity: 0, scale: 1.06 }, 
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
        )
        .fromTo('.hero-logo', 
          { opacity: 0, scale: 0.85, rotation: -6 }, 
          { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'power2.out' }, 
          0.3
        )
        .fromTo('.hero-brand', 
          { opacity: 0, y: 18 }, 
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
          0.6
        )
        .fromTo('.hero-labels', 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, 
          0.8
        )
        .fromTo('.hero-rule', 
          { scaleX: 0 }, 
          { scaleX: 1, duration: 1, ease: 'power2.out' }, 
          0.7
        );

      // Section 1: Hero Scroll Animation (EXIT only)
      ScrollTrigger.create({
        trigger: section1Ref.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.hero-logo', {
              y: -18 * exitProgress + 'vh',
              scale: 1 - 0.15 * exitProgress,
              opacity: exitProgress < 0.85 ? 1 : (1 - exitProgress) * 2,
            });
            gsap.set('.hero-brand', {
              y: -10 * exitProgress + 'vh',
              opacity: exitProgress < 0.85 ? 1 : (1 - exitProgress) * 2,
            });
            gsap.set('.hero-video', {
              scale: 1 + 0.08 * exitProgress,
              x: -4 * exitProgress + 'vw',
            });
            gsap.set('.hero-labels', {
              opacity: exitProgress < 0.85 ? 1 : (1 - exitProgress) * 2,
            });
          }
        },
        onLeaveBack: () => {
          gsap.set('.hero-logo', { y: 0, scale: 1, opacity: 1 });
          gsap.set('.hero-brand', { y: 0, opacity: 1 });
          gsap.set('.hero-video', { scale: 1, x: 0 });
          gsap.set('.hero-labels', { opacity: 1 });
        },
      });

      // Section 2: Interior Split
      const section2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });
      
      section2Tl
        .fromTo('.s2-left', 
          { x: '-55vw' }, 
          { x: 0, ease: 'none' }, 
          0
        )
        .fromTo('.s2-right', 
          { x: '55vw' }, 
          { x: 0, ease: 'none' }, 
          0
        )
        .fromTo('.s2-rule', 
          { scaleY: 0 }, 
          { scaleY: 1, ease: 'none' }, 
          0.08
        )
        .fromTo('.s2-label', 
          { y: '-6vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.12
        )
        .fromTo('.s2-cta', 
          { y: '6vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.18
        )
        .to('.s2-left', { x: '-30vw', opacity: 0.25, ease: 'power2.in' }, 0.7)
        .to('.s2-right', { x: '30vw', opacity: 0.25, ease: 'power2.in' }, 0.7)
        .to('.s2-rule', { scaleY: 0, opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s2-label', { y: '-4vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s2-cta', { y: '4vh', opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 3: Luxury Real Estate
      const section3Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section3Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });
      
      section3Tl
        .fromTo('.s3-video', 
          { scale: 1.1, x: '6vw' }, 
          { scale: 1, x: 0, ease: 'none' }, 
          0
        )
        .fromTo('.s3-content', 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s3-micro-top', 
          { y: '-4vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.1
        )
        .fromTo('.s3-micro-bottom', 
          { y: '4vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.14
        )
        .to('.s3-video', { scale: 1.06, opacity: 0.35, ease: 'power2.in' }, 0.7)
        .to('.s3-content', { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s3-micro-top', { opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s3-micro-bottom', { opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 4: Atmosphere
      const section4Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section4Ref.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });
      
      section4Tl
        .fromTo('.s4-video', 
          { opacity: 0, scale: 1.08 }, 
          { opacity: 1, scale: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s4-headline', 
          { y: '18vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s4-subline', 
          { y: '6vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.12
        )
        .to('.s4-video', { scale: 1.05, opacity: 0.35, ease: 'power2.in' }, 0.7)
        .to('.s4-headline', { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s4-subline', { opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 5: Signature Line
      const section5Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section5Ref.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });
      
      section5Tl
        .fromTo('.s5-video', 
          { scale: 1.12, opacity: 0 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s5-left', 
          { x: '-50vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s5-right', 
          { x: '50vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s5-micros', 
          { y: '4vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.18
        )
        .to('.s5-video', { scale: 1.06, opacity: 0.35, ease: 'power2.in' }, 0.7)
        .to('.s5-left', { x: '-20vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s5-right', { x: '20vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s5-micros', { opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 6: Live the Design
      const section6Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section6Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });
      
      section6Tl
        .fromTo('.s6-video', 
          { y: '10vh', scale: 1.08, opacity: 0 }, 
          { y: 0, scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s6-left', 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s6-right', 
          { x: '40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s6-micro', 
          { y: '4vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.14
        )
        .to('.s6-video', { scale: 1.05, opacity: 0.35, ease: 'power2.in' }, 0.7)
        .to('.s6-left', { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s6-right', { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s6-micro', { opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 7: Inspiration
      const section7Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section7Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });
      
      section7Tl
        .fromTo('.s7-video', 
          { scale: 1.1, opacity: 0 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s7-left', 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s7-right', 
          { x: '40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s7-micro', 
          { y: '4vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.14
        )
        .to('.s7-video', { scale: 1.05, opacity: 0.35, ease: 'power2.in' }, 0.7)
        .to('.s7-left', { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s7-right', { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s7-micro', { opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 8: Elevation
      const section8Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section8Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });
      
      section8Tl
        .fromTo('.s8-video', 
          { opacity: 0 }, 
          { opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s8-left', 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s8-right', 
          { x: '40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s8-micro', 
          { y: '4vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.14
        )
        .to('.s8-video', { opacity: 0.35, ease: 'power2.in' }, 0.7)
        .to('.s8-left', { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s8-right', { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s8-micro', { opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 9: Definition
      const section9Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section9Ref.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });
      
      section9Tl
        .fromTo('.s9-video', 
          { scale: 1.1, opacity: 0 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s9-left', 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s9-right', 
          { x: '40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo('.s9-cta', 
          { y: '4vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.18
        )
        .to('.s9-video', { opacity: 0.35, ease: 'power2.in' }, 0.7)
        .to('.s9-left', { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s9-right', { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.s9-cta', { opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 10: Contact (flowing section with reveal animations)
      gsap.fromTo('.s10-headline', 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: '.s10-headline',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
      
      gsap.fromTo('.s10-body', 
        { y: 30, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: '.s10-body',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
      
      gsap.fromTo('.s10-form-field', 
        { y: 24, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.s10-form',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
      
      gsap.fromTo('.s10-contact', 
        { x: 40, opacity: 0 }, 
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6,
          scrollTrigger: {
            trigger: '.s10-contact',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Global snap for pinned sections
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;
      
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, [loading]);

  // Music player toggle
  const toggleMusic = useCallback(() => {
    setMusicPlaying(prev => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setMusicMuted(prev => !prev);
  }, []);

  // Menu toggle
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  // Scroll to section
  const scrollToSection = useCallback((sectionRef: React.RefObject<HTMLDivElement | null>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  // WhatsApp link
  const whatsappLink = `https://wa.me/923034170690`;

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">
          <span className="font-display text-4xl md:text-6xl text-gold">H</span>
        </div>
        <div className="loading-bar">
          <div 
            className="loading-bar-fill" 
            style={{ width: `${Math.min(loadingProgress, 100)}%` }}
          />
        </div>
        <span className="label-micro mt-4">Loading Experience</span>
      </div>
    );
  }

  return (
    <div ref={mainRef} className="relative bg-dark">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="custom-cursor hidden lg:block"
        style={{ opacity: cursorVisible ? 1 : 0 }}
      />
      <div 
        ref={cursorDotRef}
        className="custom-cursor-dot hidden lg:block"
        style={{ opacity: cursorVisible ? 1 : 0 }}
      />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Persistent Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-[4vw] py-[4vh] flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <span className="font-display text-2xl text-ivory cursor-pointer hover:text-gold transition-colors">
            H
          </span>
        </div>
        <button 
          onClick={toggleMenu}
          className="pointer-events-auto label-micro text-ivory hover:text-gold transition-colors flex items-center gap-2"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {/* Menu Overlay */}
      <div className={`menu-overlay ${menuOpen ? 'active' : ''}`}>
        <nav className="flex flex-col items-center gap-8">
          {[
            { label: 'Home', ref: section1Ref },
            { label: 'Interior Design', ref: section2Ref },
            { label: 'Real Estate', ref: section3Ref },
            { label: 'Atmosphere', ref: section4Ref },
            { label: 'Signature', ref: section5Ref },
            { label: 'Lifestyle', ref: section6Ref },
            { label: 'Inspiration', ref: section7Ref },
            { label: 'Elevation', ref: section8Ref },
            { label: 'Contact', ref: section10Ref },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.ref)}
              className="font-display text-4xl md:text-6xl text-ivory hover:text-gold transition-colors uppercase tracking-widest-lg"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Section 1: Hero */}
      <section ref={section1Ref} className="section-pinned z-10">
        <video 
          className="hero-video video-background"
          src={videos.hero}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="vignette-overlay" />
        <div className="dark-overlay" />
        
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <div className="hero-logo w-[clamp(160px,22vw,340px)] h-[clamp(160px,22vw,340px)] border border-gold/50 rounded-full flex items-center justify-center">
            <span className="font-display text-[clamp(80px,12vw,180px)] text-ivory">H</span>
          </div>
          <h1 className="hero-brand font-display text-[clamp(14px,2vw,24px)] text-ivory uppercase tracking-widest-xl mt-8">
            H Design & Production Studio
          </h1>
        </div>
        
        <div className="hero-rule absolute bottom-[9vh] left-[4vw] w-[92vw] hairline origin-left" />
        
        <div className="absolute bottom-[5vh] left-[4vw] right-[4vw] flex justify-between">
          <span className="hero-labels label-micro text-ivory/70">
            Luxury Interiors • Real Estate
          </span>
          <span className="hero-labels label-micro text-ivory/70 text-right">
            Based in Lahore • Working Globally
          </span>
        </div>
      </section>

      {/* Section 2: Interior Split */}
      <section ref={section2Ref} className="section-pinned z-20">
        <div className="s2-left absolute left-0 top-0 w-1/2 h-full">
          <img 
            src={images.interior1}
            alt="Interior Detail"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="s2-right absolute right-0 top-0 w-1/2 h-full">
          <img 
            src={images.interior2}
            alt="Interior Room"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="s2-rule absolute left-1/2 top-[10vh] h-[80vh] w-px bg-ivory/30 origin-top" />
        <div className="s2-label absolute left-1/2 top-[7vh] -translate-x-1/2 label-micro text-ivory">
          Interior Design
        </div>
        <button className="s2-cta absolute left-1/2 bottom-[6vh] -translate-x-1/2 btn-outline">
          Explore Projects
        </button>
      </section>

      {/* Section 3: Luxury Real Estate */}
      <section ref={section3Ref} className="section-pinned z-30">
        <video 
          className="s3-video video-background"
          src={videos.exterior}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="vignette-overlay" />
        <div className="dark-overlay" />
        
        <div className="s3-content absolute left-[6vw] top-[34vh] w-[44vw] max-w-[600px]">
          <h2 className="headline-section mb-6">Luxury Real Estate</h2>
          <p className="body-text mb-8">
            Architectural homes and investment properties in Lahore's most sought-after enclaves.
          </p>
          <div className="flex items-center gap-6">
            <button className="btn-primary flex items-center gap-2">
              View Listings <ArrowRight size={16} />
            </button>
            <button className="text-link flex items-center gap-2">
              <Download size={14} /> Download Portfolio
            </button>
          </div>
        </div>
        
        <div className="s3-micro-top absolute right-[4vw] top-[6vh] label-micro text-ivory/70 text-right">
          DHA Phase 6 • Lahore
        </div>
        <div className="s3-micro-bottom absolute right-[4vw] bottom-[6vh] label-micro text-ivory/70 text-right">
          Price on Request
        </div>
      </section>

      {/* Section 4: Atmosphere */}
      <section ref={section4Ref} className="section-pinned z-40">
        <video 
          className="s4-video video-background"
          src={videos.living}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="vignette-overlay" />
        <div className="dark-overlay" />
        
        <div className="s4-headline absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="headline-hero">Atmosphere is Everything</h2>
        </div>
        <div className="s4-subline absolute left-1/2 bottom-[8vh] -translate-x-1/2 label-micro text-ivory/70">
          Lighting • Materials • Composition
        </div>
      </section>

      {/* Section 5: Signature Line */}
      <section ref={section5Ref} className="section-pinned z-50">
        <video 
          className="s5-video video-background"
          src={videos.kitchen}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="vignette-overlay" />
        <div className="dark-overlay" />
        
        <div className="s5-left absolute left-[6vw] top-[44vh]">
          <h2 className="headline-section">Design That</h2>
        </div>
        <div className="s5-right absolute right-[6vw] top-[44vh] text-right">
          <h2 className="headline-section">Lives Like a Scene.</h2>
        </div>
        
        <div className="s5-micros absolute bottom-[6vh] left-[4vw] right-[4vw] flex justify-between">
          <span className="label-micro text-ivory/70">Kitchen + Joinery</span>
          <span className="label-micro text-ivory/70">Materials: Marble • Brass • Oak</span>
        </div>
      </section>

      {/* Section 6: Live the Design */}
      <section ref={section6Ref} className="section-pinned z-[60]">
        <video 
          className="s6-video video-background"
          src={videos.bedroom}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="vignette-overlay" />
        <div className="dark-overlay" />
        
        <div className="s6-left absolute left-[6vw] top-[46vh]">
          <h2 className="headline-section">Live</h2>
        </div>
        <div className="s6-right absolute right-[6vw] top-[46vh] text-right">
          <h2 className="headline-section">The Design.</h2>
        </div>
        
        <div className="s6-micro absolute left-1/2 bottom-[7vh] -translate-x-1/2 label-micro text-ivory/70">
          Bedroom Suites • Walk-in Closets
        </div>
      </section>

      {/* Section 7: Inspiration */}
      <section ref={section7Ref} className="section-pinned z-[70]">
        <video 
          className="s7-video video-background"
          src={videos.dining}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="vignette-overlay" />
        <div className="dark-overlay" />
        
        <div className="s7-left absolute left-[6vw] top-[46vh]">
          <h2 className="headline-section">Design</h2>
        </div>
        <div className="s7-right absolute right-[6vw] top-[46vh] text-right">
          <h2 className="headline-section">That Inspires.</h2>
        </div>
        
        <div className="s7-micro absolute left-1/2 bottom-[7vh] -translate-x-1/2 label-micro text-ivory/70">
          Dining Rooms • Entertaining Spaces
        </div>
      </section>

      {/* Section 8: Elevation */}
      <section ref={section8Ref} className="section-pinned z-[80]">
        <video 
          className="s8-video video-background"
          src={videos.lounge}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="vignette-overlay" />
        <div className="dark-overlay" />
        
        <div className="s8-left absolute left-[6vw] top-[46vh]">
          <h2 className="headline-section">Design</h2>
        </div>
        <div className="s8-right absolute right-[6vw] top-[46vh] text-right">
          <h2 className="headline-section">That Elevates.</h2>
        </div>
        
        <div className="s8-micro absolute left-1/2 bottom-[7vh] -translate-x-1/2 label-micro text-ivory/70">
          Lounges • Media Rooms • Private Studies
        </div>
      </section>

      {/* Section 9: Definition */}
      <section ref={section9Ref} className="section-pinned z-[90]">
        <video 
          className="s9-video video-background"
          src={videos.final}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="vignette-overlay" />
        <div className="dark-overlay" />
        
        <div className="s9-left absolute left-[6vw] top-[46vh]">
          <h2 className="headline-section">Design</h2>
        </div>
        <div className="s9-right absolute right-[6vw] top-[46vh] text-right">
          <h2 className="headline-section">That Defines You.</h2>
        </div>
        
        <button 
          onClick={() => scrollToSection(section10Ref)}
          className="s9-cta absolute left-1/2 bottom-[7vh] -translate-x-1/2 btn-primary"
        >
          Start Your Project
        </button>
      </section>

      {/* Section 10: Contact */}
      <section ref={section10Ref} className="relative z-[100] bg-dark-secondary min-h-screen py-[10vh] px-[6vw]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Form */}
            <div className="s10-form">
              <h2 className="s10-headline headline-section mb-4">Start Your Project</h2>
              <p className="s10-body body-text mb-10 max-w-[52ch]">
                Tell us what you're building. We'll respond within two business days.
              </p>
              
              <form className="space-y-6">
                <div className="s10-form-field">
                  <input 
                    type="text" 
                    placeholder="Name"
                    className="form-input"
                  />
                </div>
                <div className="s10-form-field">
                  <input 
                    type="email" 
                    placeholder="Email"
                    className="form-input"
                  />
                </div>
                <div className="s10-form-field">
                  <input 
                    type="tel" 
                    placeholder="Phone"
                    className="form-input"
                  />
                </div>
                <div className="s10-form-field">
                  <select className="form-input bg-transparent">
                    <option value="" className="bg-dark-secondary">Project Type</option>
                    <option value="interior" className="bg-dark-secondary">Interior Design</option>
                    <option value="real-estate" className="bg-dark-secondary">Real Estate</option>
                    <option value="branding" className="bg-dark-secondary">Branding & Marketing</option>
                    <option value="other" className="bg-dark-secondary">Other</option>
                  </select>
                </div>
                <div className="s10-form-field">
                  <textarea 
                    placeholder="Message"
                    rows={4}
                    className="form-input resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Inquiry
                </button>
              </form>
            </div>
            
            {/* Right: Contact Info */}
            <div className="s10-contact lg:pl-12">
              <div className="space-y-8">
                <div>
                  <h3 className="label-micro mb-4">Contact</h3>
                  <a 
                    href="mailto:hello@hdesignstudio.co" 
                    className="flex items-center gap-3 text-ivory hover:text-gold transition-colors mb-3"
                  >
                    <Mail size={18} /> hello@hdesignstudio.co
                  </a>
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-ivory hover:text-gold transition-colors"
                  >
                    <Phone size={18} /> +92 303 4170690
                  </a>
                </div>
                
                <div>
                  <h3 className="label-micro mb-4">Location</h3>
                  <p className="flex items-start gap-3 text-ivory/70">
                    <MapPin size={18} className="mt-1 flex-shrink-0" />
                    33 CCA, DHA Phase 5, Lahore, Pakistan
                  </p>
                </div>
                
                <div>
                  <h3 className="label-micro mb-4">Follow</h3>
                  <div className="flex items-center gap-4">
                    <a 
                      href="https://instagram.com/hdesignandproduction" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ivory hover:text-gold transition-colors"
                    >
                      <Instagram size={24} />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ivory hover:text-gold transition-colors"
                    >
                      <Linkedin size={24} />
                    </a>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-ivory/10">
                  <p className="label-micro text-ivory/50">
                    Lahore • Dubai • Riyadh
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-ivory/50">
              © H Design & Production Studio
            </p>
            <p className="label-micro text-ivory/50">
              Luxury Interiors • Real Estate • Branding
            </p>
          </footer>
        </div>
      </section>

      {/* Music Player */}
      <div className="music-player">
        <button 
          onClick={toggleMusic}
          className="text-ivory hover:text-gold transition-colors"
        >
          {musicPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <div className="flex flex-col">
          <span className="text-xs text-ivory font-medium">Ambient</span>
          <span className="text-[10px] text-ivory/50">H Design</span>
        </div>
        <button 
          onClick={toggleMute}
          className="text-ivory hover:text-gold transition-colors ml-2"
        >
          {musicMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} loop>
        <source src="" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;