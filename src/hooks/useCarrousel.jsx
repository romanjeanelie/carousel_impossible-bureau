import { useEffect, useState } from "react";

export const useCarrousel = (slides, refs) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  // const init = () => {

  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     const imgBounds = refs.current[activeIndex].getBoundingClientRect();
  //     const centerImgPos = imgBounds.x + imgBounds.width / 2;
  //     const newOffset = ((centerScreen - centerImgPos) / window.innerWidth) * 100;
  //     console.log(imgBounds.width);
  //     setOffset(newOffset);
  //   }, 500);
  //   // setOffset(centerScreen - centerImgPos);
  // }, [slides]);

  const next = () => {
    console.log("next");
    const newIndex = activeIndex + 1;
    if (newIndex >= slides.length) return;
    setActiveIndex(newIndex);
    setOffset((offset) => offset + (refs.current[activeIndex].getBoundingClientRect().width / window.innerWidth) * 100);
  };

  const prev = () => {
    const newIndex = activeIndex - 1;
    if (newIndex < 0) return;
    setActiveIndex(newIndex);
    setOffset(
      (offset) => offset - (refs.current[activeIndex - 1].getBoundingClientRect().width / window.innerWidth) * 100
    );
  };

  return [offset, next, prev];
};
