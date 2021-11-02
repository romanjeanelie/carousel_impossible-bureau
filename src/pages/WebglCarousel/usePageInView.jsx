import { useState } from "react";
import { useFrame } from "@react-three/fiber";

import { useScroll } from "@react-three/drei";

const usePageInView = (cursor, lines) => {
  const data = useScroll();
  const [indexPageVisible, setIndexPageVisible] = useState(0);
  const [isScroll, setIsScroll] = useState(false);

  useFrame((state, delta) => {
    // Check if scrolling
    if (data.delta > 0.0001) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }

    // Get new Index
    const scrollOffset = Math.max(data.offset, 0);
    let newIndex = Math.floor(scrollOffset * data.pages);
    newIndex = Math.min(newIndex, data.pages - 1);

    // Anim Cursor
    cursor.current.style.transform = `translate3d(${scrollOffset * 100}%, 170%, 0)`;

    // Anim Lines
    lines.current.forEach((line, i) => {
      const diff = 1 - Math.abs(i - scrollOffset * (lines.current.length - 1));

      const scale = Math.max(1 + diff, 1);
      lines.current[i].style.transform = `scaleY(${scale})`;
    });

    if (indexPageVisible !== newIndex) {
      setIndexPageVisible(newIndex);
    } else {
      return;
    }
  });

  return [indexPageVisible, isScroll];
};

export default usePageInView;
