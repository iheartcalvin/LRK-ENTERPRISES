import { useEffect, useState } from "react";

/**
 * Hook returns a value 0..1 representing how "in view" the ref element is.
 * Place the hook on the sectionRef where you want the glow to react to scroll.
 */
export default function useScrollGlow(ref) {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // visible ratio: 0 when far, up to 1 when centered/fully visible
      // tuned so glow increases as element nears the viewport center
      const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - vh / 2);
      const maxDistance = vh * 0.9;
      const visible = Math.max(0, 1 - distanceFromCenter / maxDistance);

      // clamp
      const clamped = Math.min(1, Math.max(0, visible));
      setIntensity(clamped);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref]);

  return intensity;
}