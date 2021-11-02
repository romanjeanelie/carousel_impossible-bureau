import { Suspense, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, ScrollControls, Scroll, useIntersect, useScroll } from "@react-three/drei";
import { useViewport } from "../../hooks/Viewport";
import usePageInView from "./usePageInView";
import useAnimation from "./useAnimation";
import lerp from "../../utils/lerp";

// Shader
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

// Components
import Close from "../../components/Close";

// Styles
import styled from "styled-components";
import { device } from "../../styles/GlobalStyles";
import { motion } from "framer-motion";

/**
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
    src: "https://picsum.photos/id/214/800/500",
  },
  {
    title: "title image-2",
    src: "https://picsum.photos/id/238/800/500",
  },
  {
    title: "title image-3",
    src: "https://picsum.photos/id/234/800/500",
  },
  {
    title: "title image-4",
    src: "https://picsum.photos/id/220/800/500",
  },
  {
    title: "title image-5",
    src: "https://picsum.photos/id/276/800/500",
  },
  {
    title: "title image-6",
    src: "https://picsum.photos/id/231/800/500",
  },
  {
    title: "title image-7",
    src: "https://picsum.photos/id/230/800/500",
  },
  {
    title: "title image-8",
    src: "https://picsum.photos/id/229/800/500",
  },
  {
    title: "title image-9",
    src: "https://picsum.photos/id/228/800/500",
  },
  {
    title: "title image-10",
    src: "https://picsum.photos/id/227/800/500",
  },
];

/**
 *
 * Styles
 */
const WebglPage = styled.div`
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
    h1 {
      font-size: 1rem;
    }
  }
`;

//
const Timeline = styled.div`
  position: absolute;
  bottom: 7%;
  left: 50%;
  height: 3rem;
  display: flex;
  align-items: flex-end;
  transform: translateX(-50%);

  .lines {
    height: 1rem;
    width: 0.2rem;
    margin-right: 0.6rem;
    background-color: ${({ theme }) => theme.colors.white};
    &:last-of-type {
      margin-right: 0;
    }
  }

  .cursor__wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1rem;
    width: 100%;
    transform: translate3d(0, 170%, 0);
    .cursor {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1rem;
      width: 1.2rem;
      transform: translate3d(-50%, 0, 0);
      overflow: hidden;
      &:after {
        content: "";
        position: absolute;
        top: 75%;
        left: 0%;
        width: 100%;
        height: 100%;
        transform: rotate(45deg);
        background: ${({ theme }) => theme.colors.white};
      }
    }
  }

  @media ${device.mobile} {
    .lines {
      width: 1px;
      height: 4px;
      margin-right: 0.5rem;
    }
  }
`;

const Title = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 7%;
  right: 10%;

  color: ${({ theme }) => theme.colors.white};
  opacity: 0;
  transition: opacity 500ms;

  /* font-weight: 200; */
  text-transform: uppercase;
  font-size: 1.4rem;
  /* letter-spacing: 0.2rem; */
  h3 {
    text-align: right;
  }
  p {
    margin-top: 1rem;
    text-transform: lowercase;
  }

  @media ${device.mobile} {
    font-size: 0.7rem;
    p {
      margin-top: 0.5rem;
    }
  }
`;

/**
 * Image
 */
function Image({ index, img, pageWidth, isTablet, isMobile }) {
  // Compute img size depending on screen size
  const width = isTablet ? img.image.width * 0.7 : isMobile ? img.image.width * 0.4 : img.image.width;
  const height = isTablet ? img.image.height * 0.7 : isMobile ? img.image.height * 0.4 : img.image.height;
  const offset = pageWidth * index;

  const visible = useRef();
  const scrollOffset = useRef();
  const data = useScroll();

  const targetRef = useIntersect((isVisible) => (visible.current = isVisible));

  // Update image scale + offset shader
  useFrame((state, delta) => {
    const scale = lerp(targetRef.current.scale.x, visible.current ? 1 : 0.5, delta * 2);
    targetRef.current.scale.set(scale, scale, scale);
    targetRef.current.material.uniforms.uOffset.value = data.delta * 100;
  });

  // Uniforms
  const uniforms = useMemo(
    () => ({
      uTexture: { value: img },
      uOffset: { value: scrollOffset.current },
    }),
    []
  );

  return (
    <group position={[offset, 0, 0]}>
      <mesh ref={targetRef} position={[0, 0, 0]}>
        <planeBufferGeometry args={[width, height, 25, 25]} />
        <shaderMaterial attach="material" uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} />
      </mesh>
    </group>
  );
}

/**
 * Content
 */
function Content({ images, displayTitle, hideTitle, cursor, lines, pageWidth, isTablet, isMobile }) {
  const imageTextures = useTexture(images.map((img) => img.src));

  // get index image visible + anim timeline
  const [indexImgVisible, isScroll] = usePageInView(cursor, lines);

  // Hide title when user is scrolling the page
  useEffect(() => {
    if (isScroll) {
      hideTitle();
    } else {
      displayTitle(indexImgVisible);
    }
  }, [isScroll, indexImgVisible]);

  return imageTextures.map((img, index) => (
    <Image key={index} img={img} index={index} pageWidth={pageWidth} isTablet={isTablet} isMobile={isMobile} />
  ));
}

/**
 * Page
 */
const WebglCarousel = () => {
  const { isTablet, isMobile, width } = useViewport();

  // Camera
  const camera = {};
  camera.position = [0, 0, 600];
  camera.fov = 2 * Math.atan(window.innerHeight / 2 / 600) * (180 / Math.PI);

  // Dom elements
  const titleRefs = useRef([]);
  const cursor = useRef();
  const lines = useRef([]);

  // Animation title
  const [displayTitle, hideTitle] = useAnimation(titleRefs);

  return (
    <WebglPage className="page" as={motion.div} variants={revealY} initial="hidden" animate="visible" exit="exit">
      <Close />

      <h1>WebGL Version</h1>

      {images.map((img, i) => (
        <Title key={i} ref={(el) => (titleRefs.current[i] = el)}>
          <h3>{img.title}</h3>
          <p>image description</p>
        </Title>
      ))}

      <Canvas camera={{ fov: camera.fov, position: camera.position }}>
        <ScrollControls pages={images.length} distance={1} damping={4} horizontal={true}>
          <Suspense fallback={null}>
            <Scroll>
              <Content
                images={images}
                displayTitle={displayTitle}
                hideTitle={hideTitle}
                cursor={cursor}
                lines={lines}
                pageWidth={width}
                isTablet={isTablet}
                isMobile={isMobile}
              />
            </Scroll>
          </Suspense>
        </ScrollControls>
      </Canvas>

      <Timeline>
        {images.map((img, i) => (
          <span key={i} ref={(el) => (lines.current[i] = el)} className="lines"></span>
        ))}
        <div className="cursor__wrapper" ref={cursor}>
          <div className="cursor"></div>
        </div>
      </Timeline>
    </WebglPage>
  );
};

export default WebglCarousel;
