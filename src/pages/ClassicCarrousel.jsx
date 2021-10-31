import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCarrousel } from "../hooks/useCarrousel";
import debounce from "../utils/debounce";
/**
 * Images
 */
const images = [
  {
    src: "https://picsum.photos/id/227/920/500",
  },
  {
    src: "https://picsum.photos/id/127/800/700",
  },
  {
    src: "https://picsum.photos/id/204/970/800",
  },
  {
    src: "https://picsum.photos/id/437/750/800",
  },
  {
    src: "https://picsum.photos/id/230/1200/500",
  },
  {
    src: "https://picsum.photos/id/231/900/900",
  },
  {
    src: "https://picsum.photos/id/257/880/500",
  },
  {
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

  .controls {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }
`;

/**
 * Slider
 */
const Slide = forwardRef(({ slide }, ref) => {
  const imageLoaded = (event) => {
    console.log("img loaded");
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

const useSmoothScroll = (ref) => {
  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  window.addEventListener(
    "wheel",
    debounce((e) => {
      data.current += e.deltaY;
    }),
    80
  );

  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  }, []);

  const smoothScrollingHandler = () => {
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;
    ref.current.style.transform = `translateX(-${data.previous}px)`;

    // Recursive call
    requestAnimationFrame(() => smoothScrollingHandler());
  };
};

const ClassicCarrousel = () => {
  const slides = images;
  const itemsRef = useRef([]);
  const sliderRef = useRef();

  const [activeIndex, offset, next, prev] = useCarrousel(slides, itemsRef);

  const handleScroll = debounce(
    (e) => {
      if (Math.sign(e.deltaY) === 1) {
        next();
      } else {
        prev();
      }
    },
    80,
    { leading: true, trailing: false }
  );
  //   useEffect(() => {
  //     document.addEventListener("keydown", (e) => {
  //       console.log(e.key);
  //       switch (e.key) {
  //         case "ArrowLeft":
  //           console.log("prev");
  //           prev();
  //           break;
  //         case "ArrowRight":
  //           next();
  //           break;
  //       }
  //     });
  //   }, []);

  return (
    <ClassicPage className="page" as={motion.div} variants={revealY} initial="hidden" animate="visible" exit="exit">
      <Slider className="slider">
        <div ref={sliderRef} className="slider__wrapper" style={{ transform: `translateX(-${offset}%)` }}>
          {slides.map((slide, i) => {
            return <Slide key={i} slide={slide} ref={(el) => (itemsRef.current[i] = el)} />;
          })}
        </div>

        <SliderControls>
          <button onClick={prev}>Prev</button>
          <button onClick={next}>Next</button>

          <div className="controls" onWheel={handleScroll}></div>
        </SliderControls>
      </Slider>
    </ClassicPage>
  );
};

export default ClassicCarrousel;
