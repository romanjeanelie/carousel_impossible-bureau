import * as THREE from "three";
import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useTexture,
  ScrollControls,
  Scroll,
  useIntersect,
  Bounds,
  useBounds,
  useScroll,
  Html,
} from "@react-three/drei";
import { Block } from "../Block";

import styled from "styled-components";
import { motion } from "framer-motion";

import { useInView } from "react-intersection-observer";

/**
 *
 * Styles
 */
const WebglPage = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
`;

const Map = styled.div`
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  height: 3rem;
  display: flex;

  span {
    width: 3px;
    height: 100%;
    margin-right: 1rem;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Title = styled.div`
  z-index: 2;
  position: fixed;
  top: 20%;
  left: 15%;
  color: ${({ theme }) => theme.colors.white};

  font-weight: 200;
  text-transform: uppercase;
  h3 {
    font-size: 5rem;
    letter-spacing: 0.5rem;
  }
  p {
    position: relative;
    margin-top: 2rem;

    font-size: 1.5rem;
    letter-spacing: 0.2rem;
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

function Image({ img, displayText }) {
  const factorW = window.innerWidth * 0.6;
  const factorH = window.innerHeight * 0.6;
  const width = factorW;
  const height = factorH;

  const visible = useRef();

  const data = useScroll();

  const targetRef = useIntersect((isVisible) => (visible.current = isVisible));
  useFrame((state, delta) => {
    const scale = THREE.MathUtils.lerp(targetRef.current.scale.x, visible.current ? 1 : 0.5, delta * 2);
    targetRef.current.scale.set(scale, scale, scale);
    const indexImgVisible = Math.round(Math.max(data.offset, 0) * data.pages);
    displayText(indexImgVisible);
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

function Content({ images }) {
  const { widthCanvas } = useThree((state) => state.viewport);
  const imageTextures = useTexture(images);

  const offsets = imageTextures.map((img, i) => {
    const widthImage = img.image.width;
    const offset = window.innerWidth * i;
    return offset;
  });

  return imageTextures.map((img, index) => (
    <group key={index} position={[offsets[index], 0, 0]}>
      <Image img={img} />
    </group>
  ));
}

function WebglCarrousel() {
  const camera = {};
  camera.position = [0, 0, 600];
  camera.fov = 2 * Math.atan(window.innerHeight / 2 / 600) * (180 / Math.PI);

  const displayText = (i) => {
    console.log("display text", i);
  };

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

  return (
    <WebglPage className="page" as={motion.div} variants={revealY} initial="hidden" animate="visible" exit="exit">
      <Map>
        {images.map((img, i) => (
          <span key={i}></span>
        ))}
      </Map>
      {images.map((img, i) => (
        <Title key={i}>
          <h3>Image Title</h3>
          <p>image details</p>
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
              <Content images={images} displayText={displayText} />
            </Scroll>
          </Suspense>
        </ScrollControls>
      </Canvas>
    </WebglPage>
  );
}

export default WebglCarrousel;
