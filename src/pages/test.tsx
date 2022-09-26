import { useEffect, useMemo, useRef } from "react";

const Test = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container.current || !el.current) {
      return;
    }

    const options = {
      root: null,
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.5,
    };

    const io = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        console.log("TRUE");
      }
    }, options);

    const element = el.current;

    io.observe(element);

    return () => io.unobserve(element);
  }, []);

  // useEffect(() => {
  //   if (!container.current) {
  //     return;
  //   }

  //   console.log(
  //     Array.from(container.current.children).filter(
  //       (item) => item.localName === "h2" || item.localName === "h3"
  //     )
  //   );
  // }, []);

  return (
    <div ref={container} className="grid gap-y-[150vh]">
      <h2>test1</h2>
      <div ref={el}>qwerqwer</div>
      <h2>test2</h2>
      <h3>test3</h3>
      <h3>test4</h3>
      <h2>test5</h2>
    </div>
  );
};

export default Test;
