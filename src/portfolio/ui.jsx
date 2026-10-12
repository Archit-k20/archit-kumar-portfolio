import { useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "./content";
import { useMotionSetting } from "./motion";

export function Arrow({ diagonal = false }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}
export function SocialLinks({ className = "" }) {
  return (
    <div className={`social-links ${className}`}>
      {[
        { name: "GitHub", href: profile.github, Icon: FaGithub },
        { name: "LinkedIn", href: profile.linkedin, Icon: FaLinkedin },
      ].map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Archit Kumar on ${name} (opens in a new tab)`}
        >
          <Icon aria-hidden="true" />
          <span>{name}</span>
          <Arrow diagonal />
        </a>
      ))}
    </div>
  );
}
export function ProjectImage({ project, priority = false, className = "" }) {
  const stem = project.image.replace(".webp", "");
  const width = project.imageWidth || 1800;
  return (
    <img
      className={className}
      src={project.image}
      srcSet={`${stem}-640.webp 640w, ${stem}-1080.webp 1080w, ${project.image} ${width}w`}
      sizes="(max-width: 600px) 88vw, (max-width: 900px) 90vw, 65vw"
      alt={project.imageAlt || `${project.name} — project interface`}
      width={width}
      height={project.imageHeight || 1000}
      loading={priority ? "eager" : "lazy"}
      fetchpriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
export function ArchitectureView({ project, compact = false }) {
  return (
    <div className={`architecture-view ${compact ? "compact" : ""}`}>
      <span className="eyebrow">
        {compact ? "BENEATH THE INTERFACE" : "SYSTEM ARCHITECTURE"}
      </span>
      <ol className="architecture-flow">
        {project.architecture.map((stage, index) => (
          <li key={stage.title}>
            <span className="stage-number">0{index + 1}</span>
            <h3>{stage.title}</h3>
            <p>{stage.detail}</p>
            {index < project.architecture.length - 1 && (
              <svg
                className="flow-connector"
                viewBox="0 0 36 16"
                aria-hidden="true"
              >
                <path d="M0 8h32m-6-5 6 5-6 5" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <p className="architecture-caption">
        {project.decisions[0].title}
        <span> / {project.name}</span>
      </p>
    </div>
  );
}
export function ScenarioSelector({ project }) {
  const [selected, setSelected] = useState(0);
  const refs = useRef([]);
  const uid = useId();
  const { enabled } = useMotionSetting();
  const scenario = project.scenarios[selected];
  function key(event, index) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? project.scenarios.length - 1
          : (index +
              (event.key === "ArrowRight" ? 1 : project.scenarios.length - 1)) %
            project.scenarios.length;
    setSelected(next);
    refs.current[next]?.focus();
  }
  return (
    <div className="scenario-selector">
      <div
        className="scenario-tabs"
        role="tablist"
        aria-label={`${project.name} engineering scenarios`}
      >
        {project.scenarios.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => (refs.current[index] = el)}
            role="tab"
            id={`${uid}-${item.id}`}
            aria-controls={`${uid}-panel`}
            aria-selected={index === selected}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => key(event, index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-${scenario.id}`}
        tabIndex={0}
        className="scenario-panel"
      >
        <span className="eyebrow">
          ILLUSTRATIVE WORKFLOW / {scenario.label}
        </span>
        <motion.ol
          key={scenario.id}
          className="scenario-steps"
          initial={enabled ? { opacity: 0.5, y: 6 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: enabled ? 0.22 : 0 }}
        >
          {scenario.stages.map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
              {index < scenario.stages.length - 1 && <Arrow />}
            </li>
          ))}
        </motion.ol>
        <p aria-live="polite">{scenario.note}</p>
      </div>
      <p className="figure-caption">
        An explanation of documented project behavior. This illustration does
        not make a live AI request.
      </p>
    </div>
  );
}
