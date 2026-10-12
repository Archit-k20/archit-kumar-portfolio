import { createContext, useContext, useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
const MotionContext = createContext(null);
export function MotionProvider({ children }) {
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(() => {
    try {
      return localStorage.getItem("portfolio-motion") === "off";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      document.dispatchEvent(new Event("portfolio:before-motion-change"));
      setSystemReduced(media.matches);
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const enabled = !systemReduced && !paused;
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
  }, [enabled]);
  function toggle() {
    document.dispatchEvent(new Event("portfolio:before-motion-change"));
    setPaused((value) => {
      try {
        localStorage.setItem("portfolio-motion", value ? "on" : "off");
      } catch {}
      return !value;
    });
  }
  return (
    <MotionContext.Provider value={{ enabled, systemReduced, toggle }}>
      <MotionConfig reducedMotion={enabled ? "never" : "always"}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}
export const useMotionSetting = () => useContext(MotionContext);
export function Reveal({ children, className = "" }) {
  const { enabled } = useMotionSetting();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        enabled ? { opacity: [0.85, 1], y: [12, 0] } : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: enabled ? 0.4 : 0 }}
    >
      {children}
    </motion.div>
  );
}
