"use client";

import React, { useEffect, useRef, useState, useCallback, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Globe,
  ListChecks,
  LayoutDashboard,
  TrendingUp,
  Cpu,
  Bot,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Theme + layout styles                                               */
/* ------------------------------------------------------------------ */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Share+Tech+Mono&family=Barlow:wght@400;500&display=swap');

  :root {
    --acid: #CCFF00;
    --acid-dim: #9DBF00;
    --black: #0A0A0A;
    --panel: #161616;
    --panel-hi: #1D1D1D;
    --border: #2A2A2A;
    --muted: #8A8A8A;      /* raised from #666 for AA contrast on #0A0A0A */
    --muted-dim: #666666;
    --white: #F0F0F0;
  }

  .pr-root {
    background: var(--black);
    padding: 5rem 2rem;
    font-family: 'Barlow', sans-serif;
    color: var(--white);
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }

  .pr-bg-wm {
    position: absolute;
    bottom: -2rem;
    right: -1rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(4rem, 12vw, 10rem);
    color: rgba(204, 255, 0, 0.04);
    text-transform: uppercase;
    letter-spacing: -0.04em;
    line-height: 1;
    user-select: none;
    white-space: nowrap;
    pointer-events: none;
    z-index: 0;
  }

  .pr-corner-tl {
    position: absolute;
    top: 2rem;
    left: 2rem;
    width: 50px;
    height: 50px;
    border-top: 1.5px solid rgba(204, 255, 0, 0.18);
    border-left: 1.5px solid rgba(204, 255, 0, 0.18);
    pointer-events: none;
    z-index: 0;
  }

  .pr-container {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  .pr-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 3.5rem;
  }

  .pr-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--acid);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    opacity: 0.9;
  }

  .pr-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: var(--white);
  }

  .pr-title span {
    color: var(--acid);
  }

  .pr-divider {
    width: 60px;
    height: 2px;
    background: var(--acid);
    margin-top: 1.2rem;
    opacity: 0.7;
  }

  /* Hint text, visible on all devices — sets expectations up front */
  .pr-hint {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* Screen-reader only */
  .pr-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Visible, high-contrast focus ring on every interactive element */
  .pr-root :focus-visible {
    outline: 2px solid var(--acid);
    outline-offset: 3px;
    border-radius: 2px;
  }

  /* ---------------- Orbit area ---------------- */
  .pr-orbit-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pr-orbit-stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: pan-y;
  }

  /* Ambient glow behind the whole stage */
  .pr-glow {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(204,255,0,0.10) 0%, rgba(204,255,0,0.03) 40%, transparent 70%);
    pointer-events: none;
    filter: blur(2px);
  }

  /* Dashed orbit track, slowly rotating for atmosphere */
  .pr-track {
    position: absolute;
    border-radius: 50%;
    border: 1px dashed rgba(204, 255, 0, 0.14);
    pointer-events: none;
  }

  /* Active project card, centered */
  .pr-card {
    position: relative;
    z-index: 10;
    background: linear-gradient(180deg, var(--panel-hi) 0%, var(--panel) 100%);
    border: 1px solid var(--border);
    padding: 1.85rem;
    width: 270px;
    text-align: left;
    box-shadow: 0 20px 60px -20px rgba(0,0,0,0.7);
  }

  .pr-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--acid), transparent 85%);
  }

  .pr-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .pr-icon-badge {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--black);
    border: 2px solid var(--acid);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--acid);
    flex-shrink: 0;
    box-shadow: 0 0 22px rgba(204,255,0,0.25);
  }

  .pr-idx {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: rgba(204, 255, 0, 0.4);
    letter-spacing: 0.15em;
  }

  .pr-cat {
    display: inline-block;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid var(--border);
    padding: 0.2rem 0.5rem;
    margin-bottom: 0.75rem;
  }

  .pr-ctitle {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.55rem;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: var(--white);
    margin-bottom: 0.6rem;
    line-height: 1.05;
  }

  .pr-desc {
    font-family: 'Barlow', sans-serif;
    font-size: 0.82rem;
    color: var(--muted);
    line-height: 1.65;
    margin-bottom: 1.25rem;
  }

  .pr-techs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.4rem;
  }

  .pr-tech {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.57rem;
    color: var(--acid);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 1px solid rgba(204, 255, 0, 0.22);
    padding: 0.18rem 0.48rem;
    background: rgba(204, 255, 0, 0.04);
  }

  .pr-card-actions {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .pr-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.64rem;
    font-weight: 700;
    color: var(--black);
    background: var(--acid);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.5rem 0.8rem;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .pr-link:hover,
  .pr-link:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(204,255,0,0.25);
  }

  .pr-arrow {
    font-size: 0.85rem;
    transition: transform 0.2s ease;
  }

  .pr-link:hover .pr-arrow {
    transform: translateX(3px);
  }

  /* Orbiting nodes — real buttons, min 44px touch target */
  .pr-orbit-node {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pr-node-circle {
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--black);
    border: 1.5px solid var(--border);
    color: var(--muted);
    cursor: pointer;
    transition: border-color 0.25s, color 0.25s, transform 0.2s, box-shadow 0.25s;
    padding: 0;
  }

  .pr-node-circle.active {
    border: 2px solid var(--acid);
    color: var(--acid);
    box-shadow: 0 0 22px rgba(204, 255, 0, 0.35);
  }

  .pr-node-circle:hover,
  .pr-node-circle:focus-visible {
    border-color: rgba(204, 255, 0, 0.7);
    color: var(--acid);
    transform: scale(1.12);
  }

  /* Primary prev/next bar — the main, unmissable way to browse */
  .pr-main-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 2.75rem;
  }

  .pr-main-nav-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--white);
    background: var(--panel);
    border: 1px solid var(--border);
    padding: 0.7rem 1.3rem;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s;
  }

  .pr-main-nav-btn:hover,
  .pr-main-nav-btn:focus-visible {
    border-color: var(--acid);
    color: var(--acid);
    background: rgba(204, 255, 0, 0.06);
    transform: translateY(-1px);
  }

  .pr-main-nav-btn:active {
    transform: translateY(0);
  }

  /* Autoplay progress ring on the play/pause control */
  .pr-play-toggle {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--black);
    color: var(--acid);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pr-play-toggle:hover,
  .pr-play-toggle:focus-visible {
    border-color: var(--acid);
  }

  /* Progress dots */
  .pr-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.35rem;
    margin-top: 1.5rem;
  }

  .pr-dot-btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .pr-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--border);
    transition: background 0.2s, transform 0.2s, width 0.2s;
  }

  .pr-dot-btn.active .pr-dot {
    background: var(--acid);
    width: 18px;
    border-radius: 3px;
  }

  .pr-dot-btn:hover .pr-dot {
    background: var(--acid-dim);
  }

  /* Live region text under the stage, echoes the active project for
     screen-reader users and anyone glancing quickly */
  .pr-live {
    margin-top: 1.1rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    color: var(--muted);
    letter-spacing: 0.06em;
    text-align: center;
  }

  @media (max-width: 768px) {
    .pr-root {
      padding: 3.5rem 1.25rem;
    }
    .pr-title {
      font-size: clamp(2.2rem, 9vw, 3.5rem);
    }
    .pr-card {
      width: 230px;
      padding: 1.5rem;
    }
    .pr-head {
      align-items: flex-start;
    }
    .pr-main-nav {
      gap: 0.6rem;
    }
    .pr-main-nav-btn {
      padding: 0.6rem 0.9rem;
      font-size: 0.65rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pr-track {
      animation: none !important;
    }
  }
`;

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */
const projects = [
  {
    idx: "01",
    title: "E-Commerce Platform",
    desc: "Full-stack e-commerce solution with user authentication, product management, and secure payment integration.",
    tech: ["React", "Django", "MongoDB"],
    category: "Web App",
    link: "https://github.com/jaiganesh2108/Robinkart",
  },
  {
    idx: "02",
    title: "Task Management",
    desc: "Real-time collaboration app with task assignment, progress tracking, and team communication features.",
    tech: ["Firebase", "Flutter", "Material UI"],
    category: "Productivity",
    link: "https://github.com/jaiganesh2108/To_Do_List-flutter-app",
  },
  {
    idx: "03",
    title: "Portfolio Website",
    desc: "Modern, responsive portfolio showcasing projects and skills with interactive elements and animations.",
    tech: ["React", "Vite", "CSS3", "Framer Motion"],
    category: "Frontend",
    link: "https://github.com/jaiganesh2108/myportfolio",
  },
  {
    idx: "04",
    title: "AI Market Place",
    desc: "Real-time cryptocurrency market data with historical price charts, AI models, and personalized watchlists.",
    tech: ["React", "Chart.js", "Web3.py", "Python"],
    category: "Finance",
    link: "https://github.com/jaiganesh2108/edu-dapp",
  },
  {
    idx: "05",
    title: "AI Blog Generator",
    desc: "Smart web app that generates high-quality blog posts from YouTube video links using OpenAI GPT and a Django backend.",
    tech: ["HTML", "CSS", "Django", "Python"],
    category: "AI/ML",
    link: "https://github.com/jaiganesh2108/AI-Blog-Generator",
  },
  {
    idx: "06",
    title: "Starfire AI",
    desc: "Personal assistant for daily activities and student self-growth monitoring, with a unique developer-friendly architecture.",
    tech: ["OpenAI API", "Desktop", "Python"],
    category: "AI",
    link: "https://github.com/jaiganesh2108/starfire",
  },
];

const categoryIcon = {
  "Web App": Globe,
  Productivity: ListChecks,
  Frontend: LayoutDashboard,
  Finance: TrendingUp,
  "AI/ML": Cpu,
  AI: Bot,
};

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
};

const AUTOPLAY_MS = 5000;

export default function ProjectsOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const touchStartX = useRef(null);
  const uid = useId();

  const radius = isMobile ? 150 : 220;
  const nodeSize = isMobile ? 48 : 64;
  const stageSize = radius * 2 + nodeSize + 40;

  const getRotation = useCallback(
    (index) => (index - activeIndex) * (360 / projects.length),
    [activeIndex]
  );

  const next = useCallback(() => setActiveIndex((i) => (i + 1) % projects.length), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + projects.length) % projects.length),
    []
  );
  const goFirst = useCallback(() => setActiveIndex(0), []);
  const goLast = useCallback(() => setActiveIndex(projects.length - 1), []);

  // Keyboard nav — scoped to the carousel itself, not the whole window,
  // so it never steals arrow keys from the rest of the page.
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        prev();
        break;
      case "ArrowRight":
        e.preventDefault();
        next();
        break;
      case "Home":
        e.preventDefault();
        goFirst();
        break;
      case "End":
        e.preventDefault();
        goLast();
        break;
      default:
        break;
    }
  };

  // Autoplay — respects reduced-motion and an explicit pause control.
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, prefersReducedMotion, next]);

  // Reveal on scroll into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Touch swipe support for mobile
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta > 0 ? prev() : next();
    }
    touchStartX.current = null;
  };

  const active = projects[activeIndex];
  const ActiveIcon = categoryIcon[active.category] || Globe;
  const liveId = `pr-live-${uid}`;

  return (
    <>
      <style>{styles}</style>
      <section id="projects" className="pr-root" ref={sectionRef}>
        <div className="pr-bg-wm">PROJECTS</div>
        <div className="pr-corner-tl" />

        <div className="pr-container">
          <div className="pr-head">
            <div>
              <div className="pr-label">// 04 — Featured Work</div>
              <h2 className="pr-title">
                MY <span>PROJECTS</span>
              </h2>
              <div className="pr-divider" />
            </div>
            <p className="pr-hint">
              {isMobile ? "Swipe, or tap a node to jump" : "Use ← → or click a node to explore"}
            </p>
          </div>

          <motion.div
            className="pr-orbit-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Carousel region — labelled, focusable, keyboard-operable */}
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured projects"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false);
              }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="pr-orbit-stage"
              style={{ width: stageSize, height: stageSize }}
              ref={stageRef}
            >
              <div className="pr-glow" />

              {/* Slowly rotating orbit track for ambience (decorative only) */}
              <motion.div
                className="pr-track"
                style={{ width: radius * 2, height: radius * 2 }}
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />

              {/* Active project card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.idx}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${activeIndex + 1} of ${projects.length}: ${active.title}`}
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -16 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className="pr-card"
                >
                  <div className="pr-card-top">
                    <span className="pr-idx">// {active.idx}</span>
                    <motion.div
                      className="pr-icon-badge"
                      initial={{ rotate: -20, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      <ActiveIcon size={19} aria-hidden="true" />
                    </motion.div>
                  </div>

                  <span className="pr-cat">{active.category}</span>
                  <h3 className="pr-ctitle">{active.title}</h3>
                  <p className="pr-desc">{active.desc}</p>

                  <div className="pr-techs">
                    {active.tech.map((t) => (
                      <span key={t} className="pr-tech">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pr-card-actions">
                    <a
                      href={active.link}
                      className="pr-link"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${active.title} on GitHub (opens in a new tab)`}
                    >
                      View <span className="pr-arrow" aria-hidden="true">→</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Orbiting project nodes — real buttons, always focusable */}
              {projects.map((p, i) => {
                const rotation = getRotation(i);
                const isActive = i === activeIndex;
                const Icon = categoryIcon[p.category] || Globe;

                return (
                  <motion.div
                    key={p.idx}
                    className="pr-orbit-node"
                    animate={{ transform: `rotate(${rotation}deg) translateY(-${radius}px)` }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                      delay: isActive ? 0 : Math.abs(i - activeIndex) * 0.05,
                    }}
                    style={{
                      width: nodeSize,
                      height: nodeSize,
                      top: `calc(50% - ${nodeSize / 2}px)`,
                      left: `calc(50% - ${nodeSize / 2}px)`,
                      zIndex: isActive ? 20 : 10,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: -rotation }}
                      transition={{ type: "spring", stiffness: 150, damping: 20 }}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <button
                        type="button"
                        className={`pr-node-circle ${isActive ? "active" : ""}`}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`View project: ${p.title} (${p.category})`}
                        aria-current={isActive ? "true" : undefined}
                      >
                        <Icon size={isMobile ? 17 : 22} aria-hidden="true" />
                      </button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Primary prev/next bar — big, labelled, impossible to miss */}
            <div className="pr-main-nav" role="group" aria-label="Browse projects">
              <button type="button" className="pr-main-nav-btn" onClick={prev} aria-label="Previous project">
                <ChevronLeft size={18} aria-hidden="true" />
                <span>Prev</span>
              </button>

              <button
                type="button"
                className="pr-play-toggle"
                onClick={() => setIsPaused((p) => !p)}
                aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
              >
                {isPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
              </button>

              <button type="button" className="pr-main-nav-btn" onClick={next} aria-label="Next project">
                <span>Next</span>
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Controls row: dots, keyboard accessible */}
            <div className="pr-dots" role="group" aria-label="Jump to project">
              {projects.map((p, i) => (
                <button
                  key={p.idx}
                  type="button"
                  className={`pr-dot-btn ${i === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to project ${i + 1}: ${p.title}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                >
                  <span className="pr-dot" aria-hidden="true" />
                </button>
              ))}
            </div>

            {/* Visible + screen-reader live status */}
            <p className="pr-live" id={liveId} aria-live="polite">
              {active.idx} / {String(projects.length).padStart(2, "0")} — {active.title}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}