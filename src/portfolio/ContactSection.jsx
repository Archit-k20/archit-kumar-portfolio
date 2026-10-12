import { useRef, useState } from "react";
import { profile } from "./content";
import { Arrow, SocialLinks } from "./ui";
import { ResumeTrigger } from "./Resumes";
import { validateContact, createContactSender } from "./contact-service";
const config = {
  serviceId: import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
};
const configured = Object.values(config).every(Boolean);
export default function ContactSection() {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [copied, setCopied] = useState("");
  const sending = useRef(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied("Email address copied.");
    } catch {
      setCopied(`Copy this address: ${profile.email}`);
    }
  }
  async function submit(event) {
    event.preventDefault();
    if (sending.current || !configured) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const error = validateContact(values);
    if (error) {
      setStatus({ state: "error", message: error });
      return;
    }
    sending.current = true;
    setStatus({ state: "sending", message: "Sending your message…" });
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await createContactSender(emailjs, config)(values);
      setStatus({
        state: "success",
        message: "Message sent. Thank you for reaching out.",
      });
      form.reset();
    } catch {
      setStatus({
        state: "error",
        message:
          "Your message could not be sent. Please try again or email me directly.",
      });
    } finally {
      sending.current = false;
    }
  }
  return (
    <section
      id="contact"
      className="contact-section section-shell"
      aria-labelledby="contact-title"
      data-reading-anchor
    >
      <div className="section-label">
        <span>05 / THE NEXT CONVERSATION</span>
        <span>AI ENGINEERING / SOFTWARE / CONTRACT WORK</span>
      </div>
      <div className="contact-heading">
        <span className="eyebrow">
          A ROLE. A PRODUCT.
          <br />A DIFFICULT PROBLEM.
        </span>
        <h2 id="contact-title">
          Let’s build
          <br />
          <em>something useful.</em>
        </h2>
      </div>
      <div className="contact-grid">
        <div>
          <p>
            Have an AI engineering role, a software project, or a workflow worth
            improving? Tell me what you’re building.
          </p>
          <a className="email-link" href={`mailto:${profile.email}`}>
            {profile.email}
            <Arrow diagonal />
          </a>
          <div className="contact-actions">
            <button className="text-link" onClick={copy}>
              Copy email <span aria-hidden="true">⧉</span>
            </button>
            <ResumeTrigger className="text-link">
              View resumes <Arrow diagonal />
            </ResumeTrigger>
          </div>
          <p className="copy-status" role="status">
            {copied}
          </p>
          <SocialLinks />
        </div>
        {configured ? (
          <form
            onSubmit={submit}
            className="contact-form"
            aria-label="Contact Archit"
          >
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Alex Morgan"
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="alex@company.com"
              />
            </label>
            <label>
              What are you thinking?
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={4000}
                rows={4}
                placeholder="Tell me about the role or project…"
                data-native-scroll
              />
            </label>
            <button
              className="solid-link"
              type="submit"
              disabled={status.state === "sending"}
            >
              {status.state === "sending" ? "Sending…" : "Send message"}
              <Arrow diagonal />
            </button>
            <p
              role={status.state === "error" ? "alert" : "status"}
              className="form-status"
            >
              {status.message}
            </p>
          </form>
        ) : (
          <div className="contact-note">
            <span className="eyebrow">START WITH THE PROBLEM</span>
            <p>
              A little context goes a long way:
              <br />
              what you need, what exists today,
              <br />
              and what a useful result looks like.
            </p>
            <a
              className="solid-link"
              href={`mailto:${profile.email}?subject=Let%E2%80%99s%20build%20something%20useful`}
            >
              Write me an email <Arrow diagonal />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
