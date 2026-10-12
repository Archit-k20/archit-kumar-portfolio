import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { resumes } from "./content";
import { useScroll } from "./Scroll";
import { Arrow } from "./ui";

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const opener = useRef(null);
  const location = useLocation();
  const { setInteractionLock } = useScroll();

  useEffect(() => setOpen(false), [location.key]);
  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    const gap = window.innerWidth - root.clientWidth;
    setInteractionLock(true);
    root.style.overflow = "hidden";
    if (gap) root.style.paddingRight = `${gap}px`;
    modal.showModal();
    return () => {
      modal.close();
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
      setInteractionLock(false);
      if (opener.current?.isConnected)
        opener.current.focus({ preventScroll: true });
    };
  }, [open, setInteractionLock]);

  function show(trigger) {
    opener.current = trigger;
    setOpen(true);
  }

  return (
    <ResumeContext.Provider value={show}>
      {children}
      <dialog
        ref={dialog}
        id="resume-dialog"
        className="resume-dialog"
        aria-labelledby="resume-title"
        aria-describedby="resume-description"
        data-lenis-prevent
        onClose={() => setOpen(false)}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            setOpen(false);
        }}
      >
        <div className="resume-dialog-top">
          <span className="eyebrow">ARCHIT KUMAR / RESUMES</span>
          <button
            type="button"
            className="resume-close"
            aria-label="Close resume chooser"
            onClick={() => setOpen(false)}
            autoFocus
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <h2 id="resume-title">
          Choose the <em>right focus.</em>
        </h2>
        <p id="resume-description">
          Two versions, tailored to the role you’re hiring for.
        </p>
        <div className="resume-options">
          {resumes.map((resume, index) => (
            <article className="resume-option" key={resume.id}>
              <span className="eyebrow">
                0{index + 1} / {resume.metadata}
              </span>
              <h3>{resume.title}</h3>
              <p>{resume.description}</p>
              <div className="resume-option-actions">
                <a
                  href={resume.file}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                  aria-label={`View ${resume.title} resume (opens in a new tab)`}
                >
                  View PDF <Arrow diagonal />
                </a>
                <a
                  href={resume.file}
                  download
                  className="solid-link"
                  aria-label={`Download ${resume.title} resume`}
                >
                  Download <span aria-hidden="true">↓</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </dialog>
    </ResumeContext.Provider>
  );
}

export function ResumeTrigger({ children = "Resumes", className = "" }) {
  const show = useContext(ResumeContext);
  return (
    <button
      type="button"
      className={`resume-trigger ${className}`}
      aria-haspopup="dialog"
      aria-controls="resume-dialog"
      onClick={(event) => show(event.currentTarget)}
    >
      {children}
    </button>
  );
}
