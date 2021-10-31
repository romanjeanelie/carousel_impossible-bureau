import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, forwardRef } from "react";

const slideData = [
  {
    index: 0,
    src: "https://picsum.photos/id/227/920/500",
  },
  {
    index: 1,
    src: "https://picsum.photos/id/127/800/700",
  },
  {
    index: 2,
    src: "https://picsum.photos/id/204/970/800",
  },
  {
    index: 3,
    src: "https://picsum.photos/id/437/750/800",
  },
  {
    index: 4,
    src: "https://picsum.photos/id/230/1200/500",
  },
  {
    index: 5,
    src: "https://picsum.photos/id/231/900/900",
  },
  {
    index: 6,
    src: "https://picsum.photos/id/257/880/500",
  },
  {
    index: 7,
    src: "https://picsum.photos/id/217/870/500",
  },
];

/**
 *
 * Animations
 */
const revealY = {
  hidden: {
    y: "105vw",
  },
  visible: {
    y: 0,
    transition: { duration: 1.5 },
  },
  exit: {
    y: "100vw",
    transition: { ease: "easeIn", duration: 1 },
  },
};

/**
 *
 * Styles
 */
const ClassicPage = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  height: 100vh;
  padding-bottom: 2rem;
  display: flex;
  align-items: flex-end;
`;

const Slider = styled.div`
  .slider__wrapper {
    width: 100vw;
    display: flex;
    align-items: flex-start;
    transition: transform 600ms cubic-bezier(0.41, 0.33, 0.35, 1.02);
    .slide {
      flex-shrink: 0;
      margin-top: auto;
      padding: 0 1rem;
      display: flex;
      justify-content: center;
      align-content: center;
      img {
        filter: grayscale(100%);
      }
    }
  }
`;

const SliderControls = styled.div`
  position: fixed;
  top: 30%;
  left: 5%;
  color: white;
  button {
    margin-right: 2rem;
    color: ${({ theme }) => theme.colors.white};

    text-transform: uppercase;

    transition: opacity 100ms;

    &:hover {
      opacity: 0.5;
    }
  }
`;

/**
 * Slider
 */
const Slide = forwardRef(({ slide }, ref) => {
  const imageLoaded = (event) => {
    event.target.style.opacity = 1;
  };
  const { src, headline } = slide;
  return (
    <li ref={ref} className="slide">
      <div className="slide__image-wrapper">
        <img className="slide__image" src={src} onLoad={imageLoaded} />
      </div>
    </li>
  );
});

function ClassicCarrousel() {
  const slides = slideData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  const itemsRef = useRef([]);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= slides.length) {
      newIndex = slides.length - 1;
    }

    if (newIndex > activeIndex) {
      setOffset(
        (offset) => offset + (itemsRef.current[newIndex - 1].getBoundingClientRect().width / window.innerWidth) * 100
      );
    } else if (newIndex < activeIndex) {
      setOffset(
        (offset) => offset - (itemsRef.current[newIndex].getBoundingClientRect().width / window.innerWidth) * 100
      );
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {}, [offset]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, slides.length);
  }, [slides]);

  return (
    <ClassicPage className="page" as={motion.div} variants={revealY} initial="hidden" animate="visible" exit="exit">
      <Slider className="slider">
        <div className="slider__wrapper" style={{ transform: `translateX(-${offset}%)` }}>
          {slides.map((slide, i) => {
            return <Slide key={slide.index} slide={slide} ref={(el) => (itemsRef.current[i] = el)} />;
          })}
        </div>
        <SliderControls>
          <button
            onClick={() => {
              updateIndex(activeIndex - 1);
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              updateIndex(activeIndex + 1);
            }}
          >
            Next
          </button>
        </SliderControls>
      </Slider>
    </ClassicPage>
  );
}

export default ClassicCarrousel;
