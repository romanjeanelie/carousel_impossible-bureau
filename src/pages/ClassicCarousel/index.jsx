import { useRef, useState, useEffect, forwardRef } from "react";
import { useCarousel } from "./useCarousel";
import clamp from "../../utils/clamp";

// Components
import Close from "../../components/Close";

// Styles
import styled from "styled-components";
import { device } from "../../styles/GlobalStyles";
import { motion } from "framer-motion";

/**
 *
 * Animation Page
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
 * Images
 */
const images = [
  {
    title: "title image-1",
    src: "https://picsum.photos/id/227/920/500",
  },
  {
    title: "title image-2",
    src: "https://picsum.photos/id/127/800/700",
  },
  {
    title: "title image-3",
    src: "https://picsum.photos/id/204/700/300",
  },
  {
    title: "title image-4",
    src: "https://picsum.photos/id/437/600/400",
  },
  {
    title: "title image-5",
    src: "https://picsum.photos/id/230/1200/500",
  },
  {
    title: "title image-6",
    src: "https://picsum.photos/id/231/1900/700",
  },
  {
    title: "title image-7",
    src: "https://picsum.photos/id/257/880/400",
  },
  {
    title: "title image-8",
    src: "https://picsum.photos/id/217/870/500",
  },
];

/**
 *
 * Styles
 */
const ClassicPage = styled.div`
  height: 100vh;
  padding-bottom: 2rem;
  display: flex;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};

  h1 {
    position: absolute;
    top: 7%;
    left: 5%;
    font-family: ${({ theme }) => theme.fonts.detail};
    text-transform: uppercase;
    font-style: italic;
    font-size: 2rem;
  }

  @media ${device.mobile} {
    font-size: 1rem;
    h1 {
      top: 5%;
      font-size: 2rem;
    }
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

      .slide__image-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img {
          max-height: 50vh;
          width: auto;
          /* height: 100%; */
          opacity: 0;
          filter: grayscale(100%);
          transform: scale(1.2);
          transition: transform 600ms, filter 600ms, opacity 600ms 300ms;

          &:hover {
            filter: grayscale(0);
          }
        }
      }
    }
  }
`;

const SliderControls = styled.div`
  position: absolute;
  top: 30%;
  left: 5%;
  button {
    margin-right: 2rem;
    font-size: 1.4rem;
    text-transform: uppercase;
    transition: opacity 100ms;
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      opacity: 0.5;
    }
  }

  @media ${device.mobile} {
    top: 5%;
    left: 45%;
    button {
      font-size: 1rem;
    }
  }
`;

const Title = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  text-transform: uppercase;
  text-align: right;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.white};

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
  @media ${device.mobile} {
    font-size: 1rem;
    top: 5%;
  }
`;

/**
 * Slider
 */
const Slide = forwardRef(({ index, slide, titles }, ref) => {
  const imgRef = useRef();

  // Hover effect parallax
  const handleMouseMove = (event) => {
    const image = imgRef.current;
    const offsetX = clamp(event.movementX * 0.7, -10, 10);
    const offsetY = clamp(event.movementY * 0.7, -10, 10);
    image.style.transform = `scale(1.2) translate3d(${offsetX}px, ${offsetY}px, 0)`;
  };

  // Display title + color image
  const handleMouseEnter = () => {
    const titleContainer = titles.current[index];
    const title = titleContainer.querySelector("h3");
    const description = titleContainer.querySelector("p");
    title.style.transition = "transform 600ms ease-out";
    description.style.transition = "transform 600ms ease-out";
    title.style.transform = "translate3d(0, 0, 0)";
    description.style.transform = "translate3d(0, 0, 0)";
  };

  // Hide title + b&w image
  const handleMouseLeave = () => {
    const image = imgRef.current;

    const titleContainer = titles.current[index];
    const title = titleContainer.querySelector("h3");
    const description = titleContainer.querySelector("p");

    title.style.transition = "transform 300ms";
    description.style.transition = "transform 300ms";

    title.style.transform = "translate3d(0, -100%, 0)";
    description.style.transform = "translate3d(0, 100%, 0)";

    image.style.transform = ` scale(1.2) translate3d(0, 0, 0)`;
  };

  // Fade in image when is loaded
  const imageLoaded = (event) => {
    event.target.style.opacity = 1;
  };

  return (
    <li
      ref={ref}
      className="slide"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slide__image-wrapper">
        <img ref={imgRef} className="slide__image" src={slide.src} alt={slide.title} onLoad={imageLoaded} />
      </div>
    </li>
  );
});

/**
 * Page
 */
const ClassicCarousel = () => {
  const slides = images;
  const pageRef = useRef();
  const sliderRef = useRef();
  const itemsRef = useRef([]);
  const titlesRef = useRef([]);

  const [offset, next, prev] = useCarousel(slides, itemsRef);

  // Controls slider with arrows
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

  // Focus page div to listen onKeyDown
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

      <h1>Classic Version</h1>

      <Slider className="slider">
        <div ref={sliderRef} className="slider__wrapper" style={{ transform: `translateX(-${offset}%)` }}>
          {slides.map((slide, i) => {
            return (
              <Slide key={i} index={i} slide={slide} ref={(el) => (itemsRef.current[i] = el)} titles={titlesRef} />
            );
          })}
        </div>
      </Slider>

      {slides.map((slide, i) => {
        return (
          <Title key={i} slide={slide} ref={(el) => (titlesRef.current[i] = el)}>
            <div className="title-container">
              <h3>{slide.title}</h3>
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
      </SliderControls>
    </ClassicPage>
  );
};

export default ClassicCarousel;
