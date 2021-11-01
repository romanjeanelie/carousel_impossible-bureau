import * as THREE from "three";
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, ScrollControls, Scroll, useIntersect, useScroll } from "@react-three/drei";

import { motion } from "framer-motion";
import styled from "styled-components";

/**
 * Images
 */
const images = [
  "https://picsum.photos/id/217/800/500",
  "https://picsum.photos/id/238/800/500",
  "https://picsum.photos/id/234/800/500",
  "https://picsum.photos/id/232/800/500",
  "https://picsum.photos/id/236/800/500",
  "https://picsum.photos/id/231/800/500",
  "https://picsum.photos/id/230/800/500",
  "https://picsum.photos/id/229/800/500",
  "https://picsum.photos/id/228/800/500",
  "https://picsum.photos/id/227/800/500",
];

/**
 *
 * Styles
 */
const WebglPage = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
`;

const Map = styled.div`
  position: absolute;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  height: 3rem;

  span {
    height: 1rem;
    width: 2px;
    margin-right: 1rem;
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
        width: 100%;
        height: 100%;
        background: ${({ theme }) => theme.colors.white};
        transform: rotate(45deg);
        top: 75%;
        left: 0%;
      }
    }
  }
`;

const Title = styled.div`
  z-index: 2;
  position: fixed;
  bottom: 7%;
  right: 10%;

  color: ${({ theme }) => theme.colors.white};
  opacity: 0;
  transition: opacity 500ms;

  font-weight: 200;
  text-transform: uppercase;
  font-size: 1.4rem;
  letter-spacing: 0.2rem;
  h3 {
    text-align: right;
  }
  p {
    margin-top: 1rem;
    text-transform: lowercase;
  }
`;

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
 * WebGL part
 */
// IMAGE
function Image({ img }) {
  const factorW = window.innerWidth * 0.6;
  const factorH = window.innerHeight * 0.6;
  const width = factorW;
  const height = factorH;

  const visible = useRef();

  const targetRef = useIntersect((isVisible) => (visible.current = isVisible));
  useFrame((state, delta) => {
    const scale = THREE.MathUtils.lerp(targetRef.current.scale.x, visible.current ? 1 : 0.5, delta * 2);
    targetRef.current.scale.set(scale, scale, scale);
  });

  return (
    <>
      <mesh ref={targetRef} position={[0, 0, 0]}>
        <planeBufferGeometry args={[width, height, 25, 25]} />
        <meshBasicMaterial map={img} />
      </mesh>
    </>
  );
}

const usePageInView = (cursor, lines) => {
  const data = useScroll();
  const [indexPageVisible, setIndexPageVisible] = useState(0);
  const [isScroll, setIsScroll] = useState(false);

  console.log("render usePage in view");
  useFrame((state, delta) => {
    if (data.delta > 0.0001) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
    const scrollOffset = Math.max(data.offset, 0);
    const newIndex = Math.floor(scrollOffset * data.pages + 0.1);
    cursor.current.style.transform = `translate3d(${scrollOffset * 100}%, 170%, 0)`;

    lines.current.forEach((line, i) => {
      const diff = 1 - Math.abs(i - scrollOffset * 10);
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

// CONTENT
function Content({ images, displayTitle, hideTitle, cursor, lines }) {
  const imageTextures = useTexture(images);

  const offsets = imageTextures.map((img, i) => {
    const offset = window.innerWidth * i;
    return offset;
  });

  const [indexImgVisible, isScroll] = usePageInView(cursor, lines);

  useEffect(() => {
    console.log(isScroll);
    if (isScroll) {
      hideTitle();
    } else {
      displayTitle(indexImgVisible);
    }
  }, [isScroll, indexImgVisible]);

  return imageTextures.map((img, index) => (
    <group key={index} position={[offsets[index], 0, 0]}>
      <Image img={img} index={index} />
    </group>
  ));
}

const useAnimation = (refs) => {
  const hide = () => {
    refs.current.forEach((ref, i) => {
      ref.style.opacity = 0;
    });
  };
  const display = (i) => {
    refs.current[i].style.opacity = 1;
  };

  return [display, hide];
};

// PAGE
function WebglCarrousel() {
  const camera = {};
  camera.position = [0, 0, 600];
  camera.fov = 2 * Math.atan(window.innerHeight / 2 / 600) * (180 / Math.PI);

  // Animations
  const titleRefs = useRef([]);
  const [displayTitle, hideTitle] = useAnimation(titleRefs);
  const cursor = useRef();
  const lines = useRef([]);

  return (
    <WebglPage className="page" as={motion.div} variants={revealY} initial="hidden" animate="visible" exit="exit">
      <Map>
        {images.map((img, i) => (
          <span key={i} ref={(el) => (lines.current[i] = el)}></span>
        ))}
        <div className="cursor__wrapper" ref={cursor}>
          <div className="cursor"></div>
        </div>
      </Map>
      {images.map((img, i) => (
        <Title key={i} ref={(el) => (titleRefs.current[i] = el)}>
          <h3>Image Title</h3>
          <p>description of the image</p>
        </Title>
      ))}
      <Canvas camera={{ fov: camera.fov, position: camera.position }}>
        <ScrollControls
          pages={images.length} // Each page takes 100% of the height of the canvas
          distance={1} // A factor that increases scroll bar travel (default: 1)
          damping={4} // Friction, higher is faster (default: 4)
          horizontal={true} // Can also scroll horizontally (default: false)
          infinite={false} // Can also scroll infinitely (default: false)
        >
          <Suspense fallback={null}>
            <Scroll>
              <Content
                images={images}
                displayTitle={displayTitle}
                hideTitle={hideTitle}
                cursor={cursor}
                lines={lines}
              />
            </Scroll>
          </Suspense>
        </ScrollControls>
      </Canvas>
    </WebglPage>
  );
}

export default WebglCarrousel;
