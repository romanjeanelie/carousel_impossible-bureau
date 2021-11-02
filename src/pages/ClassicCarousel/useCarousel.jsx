import { useState } from "react";

export const usecarousel = (slides, refs) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  const next = () => {
    console.log("next");
    const newIndex = activeIndex + 1;
    if (newIndex >= slides.length) return;
    setActiveIndex(newIndex);
    setOffset((offset) => offset + (refs.current[activeIndex].getBoundingClientRect().width / window.innerWidth) * 100);
  };

  const prev = () => {
    const newIndex = activeIndex - 1;
    if (newIndex <= 0) return;
    setActiveIndex(newIndex);
    setOffset(
      (offset) => offset - (refs.current[activeIndex - 1].getBoundingClientRect().width / window.innerWidth) * 100
    );
  };

  return [offset, next, prev];
};