import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { profile, projects, supportingProjects } from "./content";
import { MotionProvider, useMotionSetting } from "./motion";
import {
  ScrollProvider,
  RoutePosition,
  AnchorLink,
  useChapterMotion,
} from "./Scroll";
import { Arrow, ProjectImage, SocialLinks } from "./ui";
import {
  About,
  Capabilities,
  Experience,
  Projects,
  SupportingWork,
} from "./Sections";
import ContactSection from "./ContactSection";
import { ResumeProvider, ResumeTrigger } from "./Resumes";
const CaseStudy = lazy(() => import("./CaseStudy"));

function MotionToggle() {
  const { enabled, systemReduced, toggle } = useMotionSetting();
  return (
    <button
      className="motion-toggle"
      aria-pressed={enabled}
      onClick={toggle}
      disabled={systemReduced}
      title={
        systemReduced
          ? "Motion follows your device’s reduced-motion setting"
          : "Toggle smooth scrolling and decorative motion"
      }
    >
      <span aria-hidden="true" className="motion-symbol">
        {enabled ? "≈" : "−"}
      </span>
      Motion {enabled ? "on" : "off"}
    </button>
  );
}
function Header() {
  const location = useLocation();
  const [active, setActive] = useState("");
  const menu = useRef(null);
  useEffect(() => {
    menu.current?.removeAttribute("open");
    let frame = 0;
    const update = () => {
      frame = 0;
      let selected = location.pathname === "/" ? "" : "projects";
      if (location.pathname === "/")
        for (const id of ["projects", "experience", "about", "contact"]) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= innerHeight * 0.4)
            selected = id;
        }
      setActive(selected);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [location.pathname, location.hash]);
  const links = [
    ["projects", "Work"],
    ["experience", "Practice"],
    ["about", "About"],
    ["contact", "Contact"],
  ];
  return (
    <header className="site-header">
      <AnchorLink
        to="/#home"
        className="wordmark"
        aria-label="Archit Kumar home"
      >
        ARCHIT
        <br />
        KUMAR<span aria-hidden="true">/</span>
      </AnchorLink>
      <span className="header-role">
        SOFTWARE ENGINEER
        <br />
        AI SYSTEMS & APPLIED ML
      </span>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([id, label]) => (
          <AnchorLink
            key={id}
            to={`/#${id}`}
            aria-current={active === id ? "location" : undefined}
          >
            {label}
          </AnchorLink>
        ))}
      </nav>
      <div className="desktop-controls">
        <ResumeTrigger className="header-resumes">
          Resumes <Arrow diagonal />
        </ResumeTrigger>
        <MotionToggle />
      </div>
      <details
        ref={menu}
        className="mobile-menu"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            menu.current.open = false;
            menu.current.querySelector("summary").focus();
          }
        }}
      >
        <summary>
          Menu <span aria-hidden="true">+</span>
        </summary>
        <nav aria-label="Mobile navigation">
          {links.map(([id, label]) => (
            <AnchorLink
              key={id}
              to={`/#${id}`}
              onClick={() => {
                menu.current.open = false;
              }}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
              <Arrow diagonal />
            </AnchorLink>
          ))}
          <ResumeTrigger className="menu-resumes">
            Resumes <Arrow diagonal />
          </ResumeTrigger>
          <MotionToggle />
        </nav>
      </details>
    </header>
  );
}

function Hero() {
  const ref = useRef(null);
  useChapterMotion(ref, "hero");
  const { enabled } = useMotionSetting();
  const previews = [projects[0], projects[1], supportingProjects[0]];
  return (
    <section
      ref={ref}
      className="hero-chapter scroll-chapter"
      id="home"
      aria-labelledby="hero-title"
    >
      <div
        className="chapter-stage hero-stage section-shell"
        data-reading-anchor
      >
        <motion.div
          className="hero-content"
          initial={enabled ? { opacity: 0.8, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: enabled ? 0.65 : 0 }}
        >
          <div className="hero-kicker">
            <span>INDEPENDENT THINKING. HANDS-ON ENGINEERING.</span>
            <span>BENGALURU, IN ↗</span>
          </div>
          <h1 id="hero-title">
            <span className="hero-line">APPLIED</span>
            <span className="hero-line">
              INTELLIGENCE<span className="accent">.</span>
            </span>
          </h1>
          <div className="hero-intro">
            <p>
              I’m Archit. I build AI workflows
              <br className="desktop-break" /> and the software that makes them
              useful.
            </p>
            <div className="hero-actions">
              <AnchorLink className="text-link" to="/#projects">
                Explore my work <span aria-hidden="true">↓</span>
              </AnchorLink>
              <ResumeTrigger className="text-link">
                View resumes <Arrow diagonal />
              </ResumeTrigger>
            </div>
            <SocialLinks className="hero-socials" />
          </div>
          <div className="hero-sheet-wrap">
            <div className="hero-sheet">
              {previews.map((project, index) => (
                <AnchorLink
                  className={`sheet-item sheet-${index}`}
                  key={project.name}
                  to={
                    project.slug ? `/projects/${project.slug}` : "/#inventory"
                  }
                >
                  <span className="sheet-meta">
                    0{index + 1} /{" "}
                    {index === 0
                      ? "AGENTIC AI"
                      : index === 1
                        ? "ML PIPELINE"
                        : "BACKEND SYSTEMS"}
                    <Arrow diagonal />
                  </span>
                  <ProjectImage
                    project={
                      project.heroImage
                        ? {
                            ...project,
                            image: project.heroImage,
                            imageAlt: project.heroImageAlt,
                          }
                        : project
                    }
                    priority={index === 0}
                  />
                  <span className="sheet-caption">{project.name}</span>
                </AnchorLink>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
function Statement() {
  const ref = useRef(null);
  useChapterMotion(ref, "statement");
  return (
    <section
      ref={ref}
      className="statement-chapter scroll-chapter"
      aria-labelledby="statement-title"
    >
      <div
        className="chapter-stage statement-stage section-shell"
        data-reading-anchor
      >
        <div className="section-label">
          <span>THE WORK AROUND THE MODEL</span>
          <span>RETRIEVE / BUILD / VERIFY</span>
        </div>
        <div className="statement-composition">
          <div className="statement-copy">
            <h2 id="statement-title">
              The model is
              <br />
              one part.
              <br />
              <span className="statement-emphasis">
                The system
                <br />
                is the <em>work.</em>
              </span>
            </h2>
            <p>
              Retrieval gives it context. APIs and infrastructure make it
              useful. Evaluation asks whether it holds up.
            </p>
          </div>
        </div>
        <div className="statement-footer">
          <span className="mono">SELECTED BUILDS / 01—03</span>
          <AnchorLink to="/#projects" className="text-link">
            See the systems <span aria-hidden="true">↓</span>
          </AnchorLink>
        </div>
      </div>
    </section>
  );
}
function Home({ views, setViews }) {
  useEffect(() => {
    document.title = profile.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", profile.description);
  }, []);
  return (
    <div className="home" data-route-ready="/">
      <Hero />
      <Statement />
      <Projects views={views} setViews={setViews} />
      <SupportingWork />
      <Experience />
      <Capabilities />
      <About />
      <ContactSection />
    </div>
  );
}
function NotFound() {
  const location = useLocation();
  useEffect(() => {
    document.title = "Page not found — Archit Kumar";
  }, []);
  return (
    <section
      className="not-found section-shell"
      data-route-ready={location.pathname}
      data-reading-anchor
    >
      <span className="eyebrow">404 / A WRONG TURN</span>
      <h1>
        There’s good work
        <br />
        <em>back this way.</em>
      </h1>
      <p>This page doesn’t exist. Explore the projects or get in touch.</p>
      <AnchorLink to="/#projects" className="text-link">
        Back to the work <Arrow />
      </AnchorLink>
    </section>
  );
}
function Footer() {
  return (
    <footer className="site-footer section-shell">
      <span>ARCHIT KUMAR / BENGALURU</span>
      <SocialLinks />
      <span>© {new Date().getFullYear()} · BUILT WITH INTENT</span>
      <AnchorLink to="/#home">Back to top ↑</AnchorLink>
    </footer>
  );
}
export default function Portfolio() {
  const [views, setViews] = useState({});
  return (
    <MotionProvider>
      <ScrollProvider>
        <ResumeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          <RoutePosition />
          <main id="main" tabIndex={-1}>
            <Suspense
              fallback={
                <div className="route-loading section-shell" role="status">
                  Opening the engineering notes…
                </div>
              }
            >
              <Routes>
                <Route
                  path="/"
                  element={<Home views={views} setViews={setViews} />}
                />
                <Route path="/projects/:slug" element={<CaseStudy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </ResumeProvider>
      </ScrollProvider>
    </MotionProvider>
  );
}
