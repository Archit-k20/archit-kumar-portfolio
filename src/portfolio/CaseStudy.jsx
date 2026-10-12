import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { projects } from "./content";
import { AnchorLink } from "./Scroll";
import { ArchitectureView, Arrow, ProjectImage, ScenarioSelector } from "./ui";
import ProjectGallery from "./ProjectGallery";

export default function CaseStudy() {
  const { slug } = useParams();
  const location = useLocation();
  const project = projects.find((item) => item.slug === slug);
  useEffect(() => {
    document.title = project
      ? `${project.name} — Archit Kumar`
      : "Project not found — Archit Kumar";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        project?.summary ||
          "Explore Archit Kumar’s AI and software engineering projects.",
      );
  }, [project]);
  if (!project)
    return (
      <section
        className="not-found section-shell"
        data-route-ready={location.pathname}
      >
        <span className="eyebrow">PROJECT NOT FOUND</span>
        <h1>
          This build
          <br />
          isn’t here.
        </h1>
        <AnchorLink className="text-link" to="/#projects">
          Explore the work <Arrow />
        </AnchorLink>
      </section>
    );
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <article className="case-study" data-route-ready={location.pathname}>
      <section className="case-hero section-shell" data-reading-anchor>
        <div className="case-folio">
          <AnchorLink to={`/#project-${project.slug}`}>
            ← All projects
          </AnchorLink>
          <span>ENGINEERING NOTES / {project.number}</span>
          <span>{project.category}</span>
        </div>
        <div className="case-heading">
          <div>
            <span className="eyebrow">{project.name}</span>
            <h1>
              {project.editorialTitle.split("\n").map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {i === 1 ? <em>{line}</em> : line}
                </span>
              ))}
            </h1>
            <p>{project.summary}</p>
          </div>
          <aside>
            <span className="eyebrow">MY CONTRIBUTION</span>
            <p>{project.role}</p>
            <span className="eyebrow">WORKING WITH</span>
            <p className="case-stack">{project.tags.join(" / ")}</p>
            <div className="case-actions">
              <a
                className="text-link"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
              >
                View source <Arrow diagonal />
              </a>
              {project.demo && (
                <a
                  className="text-link"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.demoLabel || "Public preview"} <Arrow diagonal />
                </a>
              )}
            </div>
          </aside>
        </div>
        {project.highlights && (
          <dl className="project-highlights">
            {project.highlights.map((item) => (
              <div key={item.value}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {project.gallery ? (
          <ProjectGallery key={project.slug} project={project} />
        ) : (
          <figure className="case-main-figure">
            <ProjectImage project={project} priority />
            <figcaption>
              <span>FIG. 01 / THE INTERFACE</span>
              <span>{project.imageCaption}</span>
            </figcaption>
          </figure>
        )}
      </section>
      <div className="case-reading-layout section-shell">
        <nav className="case-toc" aria-label="Case study contents">
          <span className="eyebrow">IN THIS BUILD</span>
          {[
            ["problem", "The problem"],
            ["architecture", "Architecture"],
            ["decisions", "Decisions"],
            ["failure-paths", "Failure paths"],
            ["results", "Results & limits"],
          ].map(([id, title]) => (
            <AnchorLink key={id} to={`${location.pathname}#${id}`}>
              {title}
            </AnchorLink>
          ))}
        </nav>
        <div className="case-reading">
          <section id="problem" className="case-section" data-reading-anchor>
            <span className="eyebrow">01 / CONTEXT</span>
            <h2>Why build this?</h2>
            <p className="case-lead">{project.problem}</p>
            <div className="contribution-note">
              <span className="eyebrow">WHAT I BUILT</span>
              <p>{project.contribution}</p>
            </div>
            {project.workspaces && (
              <div className="workspace-notes">
                {project.workspaces.map((space, index) => (
                  <article key={space.name}>
                    <span className="eyebrow">
                      0{index + 1} / {space.name}
                    </span>
                    <h3>{space.description}</h3>
                    <p>{space.tools}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
          <section
            id="architecture"
            className="case-section"
            data-reading-anchor
          >
            <span className="eyebrow">02 / SYSTEM DESIGN</span>
            <h2>
              From input
              <br />
              to <em>outcome.</em>
            </h2>
            <ArchitectureView project={project} />
            {project.architectureNotes && (
              <div className="architecture-notes">
                {project.architectureNotes.map((note) => (
                  <div key={note.title}>
                    <h3>{note.title}</h3>
                    <p>{note.text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
          <section id="decisions" className="case-section" data-reading-anchor>
            <span className="eyebrow">03 / ENGINEERING DECISIONS</span>
            <h2>
              The choices
              <br />
              <em>behind the interface.</em>
            </h2>
            {project.decisions.map((decision, index) => (
              <div className="decision-row" key={decision.title}>
                <span className="mono">0{index + 1}</span>
                <h3>{decision.title}</h3>
                <p>{decision.text}</p>
              </div>
            ))}
          </section>
          <section
            id="failure-paths"
            className="case-section"
            data-reading-anchor
          >
            <span className="eyebrow">04 / RELIABILITY</span>
            <h2>
              A useful system
              <br />
              has a way <em>back.</em>
            </h2>
            <p className="section-description">
              Select a scenario to follow a documented path through the system.
            </p>
            <ScenarioSelector project={project} />
            <ul className="reliability-list">
              {project.reliability.map((text) => (
                <li key={text}>
                  <span aria-hidden="true">↳</span>
                  {text}
                </li>
              ))}
            </ul>
          </section>
          <section id="results" className="case-section" data-reading-anchor>
            <span className="eyebrow">05 / RESULTS & LIMITATIONS</span>
            <h2>
              What it does.
              <br />
              <em>Where it stops.</em>
            </h2>
            <p className="case-lead">{project.result}</p>
            <aside className="limitation-note">
              <span className="eyebrow">CURRENT LIMITATIONS</span>
              <p>{project.limitations}</p>
            </aside>
            {project.evidenceLinks && (
              <nav
                className="evidence-links"
                aria-label="Project engineering evidence"
              >
                {project.evidenceLinks.map((link) => (
                  <a
                    className="text-link"
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                    <Arrow diagonal />
                  </a>
                ))}
              </nav>
            )}
          </section>
        </div>
      </div>
      <div className="case-next section-shell" data-reading-anchor>
        <span className="eyebrow">NEXT ENGINEERING NOTE / {next.number}</span>
        <Link to={`/projects/${next.slug}`}>
          <span>{next.name}</span>
          <Arrow diagonal />
        </Link>
        <AnchorLink className="text-link" to="/#contact">
          Discuss a role or project <Arrow diagonal />
        </AnchorLink>
      </div>
    </article>
  );
}
