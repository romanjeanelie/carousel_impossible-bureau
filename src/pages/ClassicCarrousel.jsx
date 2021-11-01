import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCarrousel } from "../hooks/useCarrousel";
import clamp from "../utils/clamp";
import Close from "../components/Close";
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
    src: "https://picsum.photos/id/204/700/300",
  },
  {
    src: "https://picsum.photos/id/437/600/400",
  },
  {
    src: "https://picsum.photos/id/230/1200/500",
  },
  {
    src: "https://picsum.photos/id/231/900/700",
  },
  {
    src: "https://picsum.photos/id/257/880/400",
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

  .close {
    position: fixed;
    top: 10%;
    left: 10%;
  }
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
      .slide__image-wrapper {
        /* width: 50vw; */
        overflow: hidden;
        img {
          width: 110%;
          height: 110%;
          height: auto;
          filter: grayscale(100%);
          transition: transform 600ms, filter 600ms;

          &:hover {
            filter: grayscale(0);
          }
        }
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

    font-size: 1.4rem;
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

const Title = styled.div`
  position: fixed;
  top: 30%;
  left: 30%;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  text-align: right;
  font-size: 1.4rem;

  .title-container {
    overflow: hidden;
    h3 {
      transform: translateY(-100%);
      transition: transform 600ms ease-out;
    }
  }

  .description-container {
    margin-top: 1rem;
    overflow: hidden;
    p {
      transform: translateY(100%);
      transition: transform 600ms ease-out;
    }
  }
`;

/**
 * Slider
 */
const Slide = forwardRef(({ index, slide, titles }, ref) => {
  const imgRef = useRef();

  const handleMouseMove = (event) => {
    const el = imgRef.current;
    const offsetX = clamp(event.movementX * 0.7, -10, 10);
    const offsetY = clamp(event.movementY * 0.7, -10, 10);
    el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
  };

  const handleMouseEnter = () => {
    const titleContainer = titles.current[index];
    const title = titleContainer.querySelector("h3");
    const description = titleContainer.querySelector("p");
    title.style.transition = "transform 600ms ease-out";
    description.style.transition = "transform 600ms ease-out";
    title.style.transform = "translate3d(0, 0, 0)";
    description.style.transform = "translate3d(0, 0, 0)";
  };

  const handleMouseLeave = () => {
    const titleContainer = titles.current[index];
    const title = titleContainer.querySelector("h3");
    const description = titleContainer.querySelector("p");

    title.style.transition = "transform 300ms";
    description.style.transition = "transform 300ms";

    title.style.transform = "translate3d(0, -100%, 0)";
    description.style.transform = "translate3d(0, 100%, 0)";
  };

  const { src, headline } = slide;
  return (
    <li
      ref={ref}
      className="slide"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slide__image-wrapper">
        <img ref={imgRef} className="slide__image" src={src} />
      </div>
    </li>
  );
});

const ClassicCarrousel = () => {
  const slides = images;
  const pageRef = useRef();
  const itemsRef = useRef([]);
  const titlesRef = useRef([]);
  const sliderRef = useRef();

  const [offset, next, prev] = useCarrousel(slides, itemsRef);

  const handleKey = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        prev();
        break;
      case "ArrowUp":
        prev();
        break;
      case "ArrowRight":
        next();
        break;
      case "ArrowDown":
        next();
        break;
    }
  };

  useEffect(() => {
    pageRef.current.focus();
  }, []);

  return (
    <ClassicPage
      className="page"
      ref={pageRef}
      onKeyDown={(e) => handleKey(e)}
      tabIndex="1"
      as={motion.div}
      variants={revealY}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Close />
      <Slider className="slider">
        <div ref={sliderRef} className="slider__wrapper" style={{ transform: `translateX(-${offset}%)` }}>
          {/* <div ref={sliderRef} className="slider__wrapper" style={{ transform: `translateX(${offset}px)` }}> */}
          {slides.map((slide, i) => {
            return (
              <Slide key={i} index={i} slide={slide} ref={(el) => (itemsRef.current[i] = el)} titles={titlesRef} />
            );
          })}
        </div>
        {slides.map((slide, i) => {
          return (
            <Title key={i} slide={slide} ref={(el) => (titlesRef.current[i] = el)}>
              <div className="title-container">
                <h3>Image {i} - title</h3>
              </div>
              <div className="description-container">
                <p>Image description</p>
              </div>
            </Title>
          );
        })}
        <SliderControls>
          <button onClick={prev}>Prev</button>
          <button onClick={next}>Next</button>

          <div className="controls"></div>
        </SliderControls>
      </Slider>
    </ClassicPage>
  );
};

export default ClassicCarrousel;
