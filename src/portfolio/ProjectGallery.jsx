import { useId, useRef, useState } from "react";
import { ProjectImage, Arrow } from "./ui";

export default function ProjectGallery({ project }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef([]);
  const id = useId();
  const screen = project.gallery[selected];
  function navigate(event, index) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? project.gallery.length - 1
          : (index +
              (event.key === "ArrowRight" ? 1 : project.gallery.length - 1)) %
            project.gallery.length;
    setSelected(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }
  return (
    <div
      className="project-gallery"
      style={{ "--gallery-background": project.galleryBackground }}
    >
      <div className="gallery-heading">
        <span className="eyebrow">
          {project.galleryHeading || "A CLOSER LOOK / THE SHIPPED INTERFACE"}
        </span>
        <span className="mono">
          {String(selected + 1).padStart(2, "0")} /{" "}
          {String(project.gallery.length).padStart(2, "0")}
        </span>
      </div>
      <div
        className="gallery-tabs"
        role="tablist"
        aria-label={`${project.name} interface screenshots`}
        style={{ "--gallery-columns": project.gallery.length > 4 ? 3 : project.gallery.length }}
      >
        {project.gallery.map((item, index) => (
          <button
            key={item.id}
            id={`${id}-${item.id}`}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            role="tab"
            aria-selected={selected === index}
            aria-controls={`${id}-panel`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
      <figure
        className="case-gallery-figure"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${screen.id}`}
        tabIndex={0}
      >
        <div className="gallery-image">
          <ProjectImage project={screen} priority />
        </div>
        <figcaption>
          <p aria-live="polite">{screen.caption}</p>
          <a
            href={screen.image}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full-size ${screen.label} screenshot in a new tab`}
          >
            Full-size image <Arrow diagonal />
          </a>
        </figcaption>
      </figure>
      <p className="gallery-provenance">
        {project.galleryProvenance ||
          "Screenshots from the project README · 11 October 2026 · Result screens use labelled synthetic examples."}
      </p>
    </div>
  );
}
