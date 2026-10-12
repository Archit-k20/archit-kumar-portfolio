import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  education,
  experience,
  independent,
  projects,
  skills,
  supportingProjects,
} from "./content";
import { ArchitectureView, Arrow, ProjectImage } from "./ui";
import { AnchorLink, useChapterMotion, useScroll } from "./Scroll";
import { Reveal, useMotionSetting } from "./motion";

function ProjectStage({ project, view, setView }) {
  const ref = useRef(null);
  useChapterMotion(ref);
  const { enabled } = useMotionSetting();
  const panelId = `view-${project.slug}`;
  return (
    <article
      ref={ref}
      className={`project-chapter scroll-chapter project-${project.slug}`}
      id={`project-${project.slug}`}
      aria-labelledby={`title-${project.slug}`}
    >
      <div
        className="chapter-stage project-stage section-shell"
        data-reading-anchor
      >
        <div className="project-topline">
          <span>0{projects.indexOf(project) + 1} / SELECTED BUILD</span>
          <span>{project.category}</span>
        </div>
        <div className="project-composition">
          <div className="project-copy">
            <span className="project-name">{project.name}</span>
            <h3 id={`title-${project.slug}`}>
              {project.editorialTitle.split("\n").map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </h3>
            <p>{project.summary}</p>
            <div className="project-decision">
              <span className="eyebrow">ONE ENGINEERING DECISION</span>
              <p>{project.decisions[0].text}</p>
            </div>
            <div className="view-switch" aria-label={`${project.name} preview`}>
              <button
                aria-pressed={view === "interface"}
                aria-controls={panelId}
                onClick={() => setView("interface")}
              >
                Interface
              </button>
              <button
                aria-pressed={view === "system"}
                aria-controls={panelId}
                onClick={() => setView("system")}
              >
                Under the hood
              </button>
            </div>
          </div>
          <div className="project-scroll-visual">
            <div className="project-views" id={panelId}>
              <motion.figure
                className="interface-view"
                aria-hidden={view !== "interface"}
                style={{
                  visibility: view === "interface" ? "visible" : "hidden",
                }}
                animate={{ opacity: view === "interface" ? 1 : 0 }}
                transition={{ duration: enabled ? 0.22 : 0 }}
              >
                <ProjectImage project={project} />
                <figcaption>{project.imageCaption}</figcaption>
              </motion.figure>
              <motion.div
                className="system-view"
                aria-hidden={view !== "system"}
                style={{ visibility: view === "system" ? "visible" : "hidden" }}
                animate={{ opacity: view === "system" ? 1 : 0 }}
                transition={{ duration: enabled ? 0.22 : 0 }}
              >
                <ArchitectureView project={project} compact />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="project-bottomline">
          <span className="mono">{project.tags.join(" / ")}</span>
          <div>
            <a href={project.repo} target="_blank" rel="noreferrer">
              Source <Arrow diagonal />
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer">
                {project.demoLabel || "Public preview"} <Arrow diagonal />
              </a>
            )}
            <Link className="text-link" to={`/projects/${project.slug}`}>
              Read the build <Arrow diagonal />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
export function Projects({ views, setViews }) {
  return (
    <section
      id="projects"
      className="selected-work"
      aria-labelledby="projects-title"
    >
      <div className="work-intro section-shell" data-reading-anchor>
        <div className="section-label">
          <span>01 / SELECTED WORK</span>
          <span>FROM INTERFACE TO IMPLEMENTATION</span>
        </div>
        <div className="work-intro-grid">
          <h2 id="projects-title">
            A few things
            <br />
            I’ve <em>put together.</em>
          </h2>
          <p>
            Explore the product.
            <br />
            Then look under the surface.
          </p>
        </div>
        <nav className="project-index" aria-label="Jump to a featured project">
          {projects.map((project) => (
            <AnchorLink key={project.slug} to={`/#project-${project.slug}`}>
              <span>{project.number}</span>
              {project.name}
              <span aria-hidden="true">↓</span>
            </AnchorLink>
          ))}
        </nav>
      </div>
      {projects.map((project) => (
        <ProjectStage
          key={project.slug}
          project={project}
          view={views[project.slug] || "interface"}
          setView={(view) =>
            setViews((previous) => ({ ...previous, [project.slug]: view }))
          }
        />
      ))}
    </section>
  );
}
export function SupportingWork() {
  return (
    <section
      className="supporting-work section-shell"
      aria-labelledby="supporting-title"
    >
      <div className="section-label">
        <h2 id="supporting-title">MORE SOFTWARE / SAME ATTENTION TO DETAIL</h2>
        <span>BACKEND & FULL STACK</span>
      </div>
      <nav className="supporting-index" aria-label="Jump to more software">
        {supportingProjects.map((project) => (
          <AnchorLink key={project.id} to={`/#${project.id}`}>
            {project.name} <span aria-hidden="true">↓</span>
          </AnchorLink>
        ))}
      </nav>
      {supportingProjects.map((project) => (
        <article
          className={`supporting-feature supporting-feature-${project.id}`}
          id={project.id}
          key={project.id}
          aria-labelledby={`title-${project.id}`}
          data-reading-anchor
        >
          <div>
            <span className="eyebrow">{project.eyebrow}</span>
            <h3 id={`title-${project.id}`}>
              {project.editorialTitle[0]}
              <br />
              {project.editorialTitle[1]} <em>{project.editorialAccent}</em>
            </h3>
            <p>{project.description}</p>
            <a
              className="text-link"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
            >
              {project.name} <Arrow diagonal />
            </a>
            <span className="supporting-note mono">
              {project.tags.join(" · ")}
            </span>
          </div>
          <figure>
            <ProjectImage project={project} />
            <figcaption className="figure-caption">
              {project.imageCaption}
            </figcaption>
          </figure>
        </article>
      ))}
    </section>
  );
}
export function Experience() {
  const { refresh } = useScroll();
  return (
    <section
      id="experience"
      className="practice-section section-shell"
      aria-labelledby="practice-title"
    >
      <div className="section-label">
        <span>02 / ENGINEERING PRACTICE</span>
        <span>BUILDING & EVALUATING</span>
      </div>
      <div className="practice-intro" data-reading-anchor>
        <h2 id="practice-title">
          Build it.
          <br />
          Question it.
          <br />
          <em>Make it hold.</em>
        </h2>
        <p>
          Building AI applications and evaluating coding agents gives me two
          ways to look at a system: what it can do, and where it breaks.
        </p>
      </div>
      <div className="practice-entries">
        <article className="practice-entry xelron-entry" data-reading-anchor>
          <div className="entry-index">01 / EMPLOYMENT</div>
          <div className="entry-title">
            <img
              className="xelron-logo"
              src="/images/xelron-logo.png"
              alt="Xelron logo"
              width="262"
              height="228"
              loading="lazy"
            />
            <div>
              <h3>{experience[0].company}</h3>
              <p>SDE Intern — {experience[0].specialty}</p>
              <span className="mono">{experience[0].date}</span>
            </div>
          </div>
          <div className="entry-evidence">
            <div className="evidence-pair">
              {experience[0].stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <details onToggle={refresh}>
              <summary>
                Inside the work <span aria-hidden="true">+</span>
              </summary>
              <ul>
                {experience[0].bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </details>
          </div>
        </article>
        <article
          className="practice-entry independent-entry"
          data-reading-anchor
        >
          <div className="entry-index">02 / INDEPENDENT</div>
          <div className="entry-title">
            <div>
              <h3>Benchmark engineering</h3>
              <p>Independent contract engagements</p>
              <span className="mono">SEPARATE FROM XELRON</span>
            </div>
          </div>
          <div className="entry-evidence">
            <div className="contract-stat">
              <strong>
                {independent.approval.approved}
                <span> / {independent.approval.submitted}</span>
              </strong>
              <span>approved terminal-benchmark submissions</span>
            </div>
            <p>{independent.intro}</p>
            <details onToggle={refresh}>
              <summary>
                Terminal-benchmark engagement <span aria-hidden="true">+</span>
              </summary>
              <p>{independent.terminal}</p>
            </details>
            <details onToggle={refresh}>
              <summary>
                Go static-analysis engagement <span aria-hidden="true">+</span>
              </summary>
              <p>{independent.analysis}</p>
            </details>
          </div>
        </article>
        <article className="practice-entry" data-reading-anchor>
          <div className="entry-index">03 / TRAINING</div>
          <div className="entry-title">
            <div>
              <h3>IBM</h3>
              <p>GenAI Intern — WatsonX Training Program</p>
              <span className="mono">{experience[1].date}</span>
            </div>
          </div>
          <div className="entry-evidence">
            <p>{experience[1].intro}</p>
            <details onToggle={refresh}>
              <summary>
                Training & applied work <span aria-hidden="true">+</span>
              </summary>
              <ul>
                {experience[1].bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </details>
          </div>
        </article>
      </div>
    </section>
  );
}
export function Capabilities() {
  const references = [
    ["TRACE", "/projects/genai-assistant"],
    ["ClimateRisk Observatory", "/projects/climate-risk"],
    ["Inventory Reservation", "/#inventory"],
  ];
  return (
    <section
      className="capabilities-section section-shell"
      aria-labelledby="capabilities-title"
    >
      <div className="section-label">
        <span>03 / HOW I WORK</span>
        <span>CAPABILITIES WITH CONTEXT</span>
      </div>
      <h2 id="capabilities-title">
        Across the stack.
        <br />
        <em>Close to the problem.</em>
      </h2>
      <div className="capability-columns">
        {skills.map((skill, index) => (
          <Reveal key={skill.id}>
            <article data-reading-anchor>
              <span className="mono">{skill.id}</span>
              <h3>{skill.title}</h3>
              <p>{skill.intro}</p>
              <p className="skill-list">{skill.items.join(" · ")}</p>
              <AnchorLink className="text-link" to={references[index][1]}>
                In practice: {references[index][0]} <Arrow diagonal />
              </AnchorLink>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export function About() {
  return (
    <section
      className="about-section section-shell"
      id="about"
      aria-labelledby="about-title"
      data-reading-anchor
    >
      <div className="section-label">
        <span>04 / BACKGROUND</span>
        <span>ALWAYS LEARNING</span>
      </div>
      <div className="about-grid">
        <h2 id="about-title">
          A foundation in
          <br />
          computer science.
          <br />
          <em>A habit of building.</em>
        </h2>
        <div>
          <span className="eyebrow">EDUCATION</span>
          <h3>{education.institution}</h3>
          <p>
            {education.degree}
            <br />
            Graduated {education.graduation} · GPA {education.gpa}
          </p>
          <div className="leadership-note">
            <span className="eyebrow">BEYOND THE CLASSROOM</span>
            <p>{education.leadership}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
