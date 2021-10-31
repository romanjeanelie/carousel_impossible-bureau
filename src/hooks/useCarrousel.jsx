import { useState } from "react";

export const useCarrousel = (slides, refs) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  const next = () => {
    const newIndex = activeIndex + 1;
    console.log("use next", newIndex, activeIndex);
    if (newIndex >= slides.length) return;
    setActiveIndex(newIndex);
    setOffset((offset) => offset + (refs.current[activeIndex].getBoundingClientRect().width / window.innerWidth) * 100);
  };

  const prev = () => {
    const newIndex = activeIndex - 1;
    console.log("use prev", newIndex);
    if (newIndex < 0) return;
    setActiveIndex(newIndex);
    setOffset(
      (offset) => offset - (refs.current[activeIndex - 1].getBoundingClientRect().width / window.innerWidth) * 100
    );
  };

  return [activeIndex, offset, next, prev];
};
