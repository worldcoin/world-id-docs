import { useEffect, useMemo, useState } from "react";

export const useSpySection = (props: {
  container: HTMLDivElement | null;
  initialSection: string;
  referenceElements?: Array<Element> | null;
}) => {
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const observerOptions = useMemo(
    () => ({
      root: null,
      rootMargin: "0px 0px -40% 0px",
      threshold: 1,
    }),
    []
  );

  // @NOTE creating IntersectionObserver to denote current section in TOC
  useEffect(() => {
    if (!props.referenceElements) {
      return;
    }

    setCurrentSection(props.initialSection);
    const tocElements = props.referenceElements;
    const root = props.container;

    if (!tocElements?.length || !root) {
      return;
    }

    const io = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        setCurrentSection(entry.target.id);
      }
    }, observerOptions);

    tocElements.forEach((element) => io.observe(element));
    return () => tocElements.forEach((element) => io.unobserve(element));
  }, [
    observerOptions,
    props.container,
    props.initialSection,
    props.referenceElements,
  ]);

  return {
    currentSection,
  };
};
