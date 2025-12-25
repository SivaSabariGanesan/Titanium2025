"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import styles from "./plenaryV2.module.css";

gsap.registerPlugin(ScrollTrigger);

interface PlenarySession {
  id: string;
  sessionTitle: string;
  day: number;
  date: string;
  time: string;
  crypticHint: string;
  topic: {
    title: string;
    description: string;
    tags: string[];
  };
  venue: string;
  featured?: boolean;
  achievements: string[];
}

const plenarySessionsData: PlenarySession[] = [
  {
    id: "ps1",
    sessionTitle: "The Future of Computing",
    day: 1,
    date: "2025-01-20",
    time: "10:00 AM - 11:30 AM",
    crypticHint: "A visionary who revolutionized personal computing and global philanthropy",
    topic: {
      title: "Innovation in the Age of AI",
      description: "Exploring how artificial intelligence will reshape industries and transform society",
      tags: ["AI", "Innovation", "Future Tech"],
    },
    venue: "Main Seminar Hall",
    featured: true,
    achievements: ["Tech Pioneer", "Philanthropist", "Industry Legend"],
  },
  {
    id: "ps2",
    sessionTitle: "The Open Source Revolution",
    day: 2,
    date: "2025-01-21",
    time: "11:00 AM - 12:30 PM",
    crypticHint: "The architect behind the kernel that powers billions of devices worldwide",
    topic: {
      title: "Building Systems That Last Decades",
      description: "Lessons from creating and maintaining the world's most important operating system",
      tags: ["Open Source", "Linux", "System Design"],
    },
    venue: "A304",
    featured: true,
    achievements: ["OS Creator", "Open Source Legend", "Software Architect"],
  },
  {
    id: "ps3",
    sessionTitle: "Entrepreneurship & Innovation",
    day: 3,
    date: "2025-01-22",
    time: "09:30 AM - 11:00 AM",
    crypticHint: "A serial entrepreneur pushing humanity toward a multi-planetary future",
    topic: {
      title: "Building Tomorrow's Technology",
      description: "From electric vehicles to space exploration - reimagining what's possible",
      tags: ["Space Tech", "Innovation", "Sustainability"],
    },
    venue: "Purple Hall",
    featured: true,
    achievements: ["Space Pioneer", "Tech Innovator", "Visionary CEO"],
  },
  {
    id: "ps4",
    sessionTitle: "AI Ethics & Society",
    day: 4,
    date: "2025-01-23",
    time: "02:00 PM - 03:30 PM",
    crypticHint: "Leading one of the world's most influential tech companies into the AI era",
    topic: {
      title: "Responsible AI Development",
      description: "Balancing technological innovation with ethical considerations and societal impact",
      tags: ["AI Ethics", "Technology", "Society"],
    },
    venue: "Auditorium",
    featured: false,
    achievements: ["Tech CEO", "AI Pioneer", "Industry Leader"],
  },
  {
    id: "ps5",
    sessionTitle: "The Quantum Leap",
    day: 5,
    date: "2025-01-24",
    time: "10:30 AM - 12:00 PM",
    crypticHint: "Transforming enterprise technology through cloud innovation and AI integration",
    topic: {
      title: "Cloud Computing & Quantum Integration",
      description: "How quantum computing will revolutionize cloud infrastructure and business solutions",
      tags: ["Quantum", "Cloud", "Future Computing"],
    },
    venue: "Tech Lounge",
    featured: false,
    achievements: ["Cloud Architect", "Tech Transformer", "Business Leader"],
  },
  {
    id: "ps6",
    sessionTitle: "Security & Privacy",
    day: 6,
    date: "2025-01-25",
    time: "03:00 PM - 04:30 PM",
    crypticHint: "A champion of user privacy and security in the modern digital landscape",
    topic: {
      title: "Privacy as a Fundamental Right",
      description: "Building secure systems that protect user privacy in an interconnected world",
      tags: ["Security", "Privacy", "User Trust"],
    },
    venue: "D103",
    featured: false,
    achievements: ["Privacy Advocate", "Security Expert", "Tech Leader"],
  },
];

interface PlenarySessionsProps {
  sessions?: PlenarySession[];
}

export default function PlenarySessionsV2({
  sessions = plenarySessionsData,
}: PlenarySessionsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSession, setSelectedSession] = useState<PlenarySession | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !container || !scrollContainer || isMobile) return;

    const ctx = gsap.context(() => {

      const totalScrollWidth = scrollContainer.scrollWidth - window.innerWidth;

      gsap.to(scrollContainer, {
        x: () => `-${totalScrollWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalScrollWidth + window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full bg-titanium-black overflow-x-hidden", styles.plenarySection)}
    >

      <div ref={containerRef} className="relative h-screen w-full">
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex h-full",
            styles.scrollContainer
          )}
        >
          {sessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "w-screen h-screen flex-shrink-0 relative overflow-hidden bg-titanium-black",
                styles.sessionCard
              )}
            >
              <div className={styles.gridPattern} />

              <div className="w-full h-full flex flex-col md:flex-row relative z-10">
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 pt-24 md:pt-0 relative z-20">
                  <div className="mb-8 border-b border-titanium-silver/20 pb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-titanium-light tracking-wide mb-2 flex items-center gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-titanium-silver to-titanium-metallic">
                        PLENARY SESSIONS
                      </span>
                    </h2>
                    <p className="text-sm md:text-base text-titanium-silver/80 max-w-md leading-relaxed">
                      Engage with industry leaders and visionaries as they share insights on the future.
                    </p>
                  </div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className={cn(styles.dayBadge, "scale-90 md:scale-100 origin-left")}>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Day</span>
                      <span className="text-xl font-bold">{session.day}</span>
                    </div>
                    <div className="h-px w-12 bg-titanium-silver/20"></div>
                    <span className="text-titanium-silver/60 uppercase tracking-widest text-xs font-mono">{session.date}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-titanium-light leading-[1.1] mb-6">
                    {session.sessionTitle}
                  </h1>
                  <div className="mb-8 max-w-xl">
                    <h3 className="text-xl md:text-2xl text-titanium-bright mb-3 font-light">
                      <span className="text-titanium-metallic mr-2 font-mono text-sm align-middle tracking-wider">TOPIC</span>
                      {session.topic.title}
                    </h3>
                    <p className="text-titanium-metallic text-sm md:text-lg leading-relaxed">
                      {session.topic.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 mb-10 text-titanium-silver/80 text-sm md:text-base font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                      {session.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500/80 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                      {session.venue}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSession(session)}
                    className="bg-titanium-light text-titanium-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-white hover:scale-105 transition-all duration-300 w-fit"
                  >
                    RESERVE SPOT
                  </button>
                  <div className="mt-12 pt-8 border-t border-titanium-silver/10 max-w-lg">
                    <p className="text-titanium-metallic italic text-sm md:text-base">
                      "{session.crypticHint}"
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 h-full relative group">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-titanium-silver/20 blur-[100px] rounded-full pointer-events-none opacity-100 mix-blend-screen group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute inset-x-0 bottom-0 top-20 md:top-auto md:h-[90%] flex items-end justify-center z-10">
                    <Image
                      src="/personMask.png"
                      alt="Mystery Speaker"
                      width={800}
                      height={800}
                      className={cn(
                        "object-contain object-bottom max-h-full drop-shadow-2xl opacity-90 grayscale-[20%] contrast-125 relative z-10",
                        styles.mysterySpeakerLarge
                      )}
                      priority
                    />
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full z-20">
                      <span className="text-titanium-silver tracking-[0.2em] text-xs font-bold uppercase">Mystery Speaker</span>
                    </div>
                  </div>

                  <div className="absolute top-1/4 right-10 flex flex-col items-end gap-3 hidden md:flex z-20">
                    {session.achievements.map((ach, idx) => (
                      <div key={idx} className="px-4 py-2 text-titanium-silver/80 text-sm font-medium hover:text-white transition-colors cursor-default text-right">
                        {ach}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={cn(
        "absolute bottom-8 left-8 flex items-center gap-2 text-titanium-silver/30 text-xs font-mono tracking-widest z-30",
        isMobile ? "hidden" : "flex"
      )}>
        <span>SCROLL TO NAVIGATE</span>
        <div className="w-12 h-px bg-titanium-silver/30"></div>
      </div>

      {selectedSession && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-titanium-charcoal border border-titanium-silver/20 rounded-2xl p-6 max-w-md w-full max-h-[80vh] relative">
            <div className="flex justify-between items-start mb-4">
              <div className={styles.dayBadge}>
                <span className="text-xs font-bold">DAY</span>
                <span className="text-2xl font-bold">{selectedSession.day}</span>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                className="text-titanium-silver hover:text-titanium-light"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <h3 className="text-xl font-bold text-titanium-light leading-tight mb-2">
              {selectedSession.sessionTitle}
            </h3>
            <p className="text-sm text-titanium-metallic mb-1">
              {new Date(selectedSession.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <span className="text-titanium-silver/60 text-sm block mb-4">{selectedSession.time} • {selectedSession.venue}</span>
            <div className="space-y-4 pb-16 overflow-y-auto max-h-[60vh]">
              <div>
                <h4 className="text-lg font-bold text-titanium-bright mb-1">Topic</h4>
                <p className="text-sm text-titanium-metallic leading-relaxed">{selectedSession.topic.title}</p>
                <p className="text-sm text-titanium-metallic leading-relaxed mt-2">{selectedSession.topic.description}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-titanium-bright mb-1">Cryptic Hint</h4>
                <p className="text-sm text-titanium-metallic italic">"{selectedSession.crypticHint}"</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-titanium-bright mb-1">Achievements</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedSession.achievements.map((achievement) => (
                    <span
                      key={achievement}
                      className="px-2 py-1 rounded bg-titanium-silver/10 border border-titanium-silver/20 text-titanium-silver text-sm"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-titanium-bright mb-1">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedSession.topic.tags.map((tag) => (
                    <span key={tag} className="text-sm text-titanium-silver/50">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute" style={{ bottom: '0.05rem', right: '0.4rem' }}>
              <Image
                src="/personMask.png"
                alt="Mystery Speaker Mask"
                className={cn(styles.mysteryMaskMobile, 'drop-shadow-lg')}
                width={80}
                height={80}
                draggable={false}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
