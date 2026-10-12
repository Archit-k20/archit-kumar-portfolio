import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigationType } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionSetting } from "./motion";
import {
  DESKTOP_QUERY,
  IMMERSIVE_QUERY,
  routeScrollIntent,
  stageFits,
} from "./scroll-policy";

gsap.registerPlugin(ScrollTrigger);
const ScrollContext = createContext(null);
const headerOffset = () =>
  (document.querySelector(".site-header")?.getBoundingClientRect().height ||
    72) + 20;

function readingAnchor() {
  const line = headerOffset() + 24;
  const nodes = [...document.querySelectorAll("[data-reading-anchor]")];
  const node = nodes.find((el) => {
    const r = el.getBoundingClientRect();
    return r.top <= line && r.bottom > line;
  });
  return node ? { node, top: node.getBoundingClientRect().top } : null;
}

export function ScrollProvider({ children }) {
  const { enabled } = useMotionSetting();
  const engine = useRef(null);
  const interactionLocked = useRef(false);
  const refreshFrame = useRef(0);
  const reading = useRef(null);
  const [viewport, setViewport] = useState(() => ({
    desktop: matchMedia(DESKTOP_QUERY).matches,
    immersive: matchMedia(IMMERSIVE_QUERY).matches,
  }));
  const immersive = enabled && viewport.immersive;
  useEffect(() => {
    const desktop = matchMedia(DESKTOP_QUERY),
      cinema = matchMedia(IMMERSIVE_QUERY);
    const update = () => {
      reading.current = readingAnchor();
      setViewport({ desktop: desktop.matches, immersive: cinema.matches });
    };
    const capture = () => {
      reading.current = readingAnchor();
    };
    document.addEventListener("portfolio:before-motion-change", capture);
    desktop.addEventListener("change", update);
    cinema.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      cinema.removeEventListener("change", update);
      document.removeEventListener("portfolio:before-motion-change", capture);
    };
  }, []);

  const refresh = useCallback(() => {
    cancelAnimationFrame(refreshFrame.current);
    refreshFrame.current = requestAnimationFrame(() => {
      engine.current?.resize();
      ScrollTrigger.refresh();
      if (import.meta.env.DEV)
        document.documentElement.dataset.activeScrollTriggers = String(
          ScrollTrigger.getAll().length,
        );
    });
  }, []);

  const setInteractionLock = useCallback((locked) => {
    interactionLocked.current = locked;
    if (locked) {
      engine.current?.scrollTo(window.scrollY, { immediate: true });
      engine.current?.stop();
    } else {
      engine.current?.start();
    }
  }, []);

  const scrollTo = useCallback(
    (target, { immediate = false, focus = false } = {}) => {
      const el =
        typeof target === "string" ? document.getElementById(target) : null;
      if (typeof target === "string" && !el) return false;
      const y =
        typeof target === "number"
          ? target
          : window.scrollY + el.getBoundingClientRect().top - headerOffset();
      const top = Math.max(
        0,
        Math.min(y, document.documentElement.scrollHeight - innerHeight),
      );
      const finish = () => {
        if (focus && el) {
          el.setAttribute("tabindex", "-1");
          el.focus({ preventScroll: true });
        }
      };
      if (engine.current) {
        engine.current.scrollTo(window.scrollY, { immediate: true });
        engine.current.scrollTo(top, {
          immediate,
          force: true,
          onComplete: finish,
        });
        if (immediate) finish();
      } else {
        window.scrollTo({ top, behavior: "instant" });
        finish();
      }
      return true;
    },
    [],
  );

  useLayoutEffect(() => {
    const anchor = reading.current;
    document.documentElement.dataset.immersive = immersive ? "on" : "off";
    if (anchor?.node.isConnected)
      scrollTo(
        window.scrollY + anchor.node.getBoundingClientRect().top - anchor.top,
        { immediate: true },
      );
    reading.current = null;
    refresh();
    return () => cancelAnimationFrame(refreshFrame.current);
  }, [immersive, refresh, scrollTo]);

  useEffect(() => {
    if (!enabled || !viewport.desktop) return;
    let lenis;
    let active = true;
    let registered = false;
    const tick = (time) => lenis?.raf(time * 1000);
    const stopForControl = (event) => {
      if (event.target.closest?.("a, button, summary, input, textarea"))
        lenis?.scrollTo(window.scrollY, { immediate: true });
    };
    const hide = () => {
      if (document.hidden) {
        lenis?.scrollTo(window.scrollY, { immediate: true });
        gsap.ticker.remove(tick);
        active = false;
      } else {
        lenis?.scrollTo(window.scrollY, { immediate: true });
        if (!active) gsap.ticker.add(tick);
        active = true;
        refresh();
      }
    };
    try {
      lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        lerp: 0.1,
        wheelMultiplier: 1,
        syncTouch: false,
        anchors: false,
        prevent: (node) => node.matches?.("textarea, [data-native-scroll]"),
      });
      engine.current = lenis;
      if (interactionLocked.current) lenis.stop();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      document.documentElement.dataset.scrollEngine = "lenis";
      registered = true;
      if (import.meta.env.DEV)
        document.documentElement.dataset.activeScrollControllers = String(
          Number(
            document.documentElement.dataset.activeScrollControllers || 0,
          ) + 1,
        );
      document.addEventListener("visibilitychange", hide);
      document.addEventListener("pointerdown", stopForControl, true);
    } catch {
      lenis?.destroy();
      engine.current = null;
      document.documentElement.dataset.scrollEngine = "native";
    }
    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener("visibilitychange", hide);
      document.removeEventListener("pointerdown", stopForControl, true);
      lenis?.off("scroll", ScrollTrigger.update);
      lenis?.destroy();
      engine.current = null;
      if (registered && import.meta.env.DEV)
        document.documentElement.dataset.activeScrollControllers = String(
          Math.max(
            0,
            Number(
              document.documentElement.dataset.activeScrollControllers || 0,
            ) - 1,
          ),
        );
      document.documentElement.dataset.scrollEngine = "native";
    };
  }, [enabled, viewport.desktop, refresh]);

  useEffect(() => {
    let live = true;
    const resize = () => refresh();
    window.addEventListener("resize", resize, { passive: true });
    document.fonts.ready.then(() => {
      if (live) refresh();
    });
    return () => {
      live = false;
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(refreshFrame.current);
    };
  }, [refresh]);

  return (
    <ScrollContext.Provider
      value={{ scrollTo, refresh, immersive, setInteractionLock }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
export const useScroll = () => useContext(ScrollContext);

export function AnchorLink({ to, onClick, children, ...props }) {
  const location = useLocation();
  const { scrollTo } = useScroll();
  return (
    <Link
      to={to}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        const [path, hash] = to.split("#");
        if (
          hash &&
          (path || location.pathname) === location.pathname &&
          location.hash === `#${hash}`
        ) {
          event.preventDefault();
          let id = hash;
          try {
            id = decodeURIComponent(hash);
          } catch {}
          scrollTo(id, { focus: true });
        }
      }}
    >
      {children}
    </Link>
  );
}

export function RoutePosition() {
  const location = useLocation();
  const kind = useNavigationType();
  const { scrollTo, refresh } = useScroll();
  const saved = useRef(new Map());
  const previous = useRef(null);
  useLayoutEffect(() => {
    const old = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = old;
    };
  }, []);
  useLayoutEffect(() => {
    const samePath = previous.current?.pathname === location.pathname;
    previous.current = location;
    let cancelled = false,
      frame = 0,
      restoring = true,
      observer;
    const intent = routeScrollIntent({
      kind,
      saved: saved.current.get(location.key),
      hash: location.hash,
      samePath,
    });
    const restore = () => {
      if (cancelled) return;
      const ready = [...document.querySelectorAll("[data-route-ready]")].some(
        (el) => el.dataset.routeReady === location.pathname,
      );
      if (!ready) return;
      observer?.disconnect();
      document.fonts.ready.then(() => {
        if (cancelled) return;
        refresh();
        frame = requestAnimationFrame(() => {
          if (cancelled) return;
          const ok = scrollTo(intent.value, {
            immediate: intent.immediate,
            focus: intent.type === "anchor",
          });
          if (!ok) scrollTo(0, { immediate: true });
          if (!samePath && intent.type === "position")
            document.getElementById("main")?.focus({ preventScroll: true });
          restoring = false;
        });
      });
    };
    scrollTo(window.scrollY, { immediate: true });
    observer = new MutationObserver(restore);
    observer.observe(document.getElementById("main"), {
      childList: true,
      subtree: true,
    });
    restore();
    const track = () => {
      if (!restoring) saved.current.set(location.key, window.scrollY);
    };
    window.addEventListener("scroll", track, { passive: true });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", track);
    };
  }, [location.key, location.pathname, location.hash, kind, scrollTo, refresh]);
  return null;
}

export function useChapterMotion(ref, kind = "project") {
  const { immersive, refresh } = useScroll();
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stage = root.querySelector(".chapter-stage");
    let context,
      frame = 0,
      fitted,
      disposed = false;
    const update = () => {
      frame = 0;
      if (disposed) return;
      const fits =
        immersive && stageFits(stage.scrollHeight, innerHeight, headerOffset());
      if (fits === fitted) return;
      const anchor = fitted === undefined ? null : readingAnchor();
      context?.revert();
      fitted = fits;
      root.dataset.sticky = fits ? "on" : "off";
      if (anchor?.node.isConnected)
        window.scrollTo({
          top:
            window.scrollY +
            anchor.node.getBoundingClientRect().top -
            anchor.top,
          behavior: "instant",
        });
      if (fits) {
        try {
          context = gsap.context(() => {
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: root,
                start: () => `top top+=${headerOffset()}`,
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
            if (kind === "hero") {
              timeline
                .to(".hero-line:first-child", { y: -30, ease: "none" }, 0)
                .to(".hero-line:last-child", { y: 18, ease: "none" }, 0)
                .to(".hero-sheet-wrap", { y: -64, ease: "none" }, 0);
            } else if (kind === "statement") {
              timeline.fromTo(
                ".statement-emphasis",
                { color: "#b1b1a8" },
                { color: "#ecebe5", ease: "none" },
                0,
              );
            } else {
              timeline.fromTo(
                ".project-scroll-visual",
                { y: 28, scale: 1.03 },
                { y: -28, scale: 1, ease: "none" },
                0,
              );
            }
          }, root);
        } catch {
          context?.revert();
          root.dataset.sticky = "off";
        }
      }
      refresh();
    };
    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    window.addEventListener("resize", schedule, { passive: true });
    update();
    document.fonts.ready.then(schedule);
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      context?.revert();
      delete root.dataset.sticky;
    };
  }, [immersive, ref, kind, refresh]);
}
