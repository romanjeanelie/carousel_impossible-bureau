import * as THREE from "three";
import { Suspense, useRef } from "react";
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
  color: white;
  font-size: 2rem;
  transform: translateX(-50%);
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

function Image({ img }) {
  const width = img.image.width;
  const height = img.image.height;

  const visible = useRef();

  const data = useScroll();

  const targetRef = useIntersect((isVisible) => (visible.current = isVisible));
  useFrame((state, delta) => {
    const scale = THREE.MathUtils.lerp(targetRef.current.scale.x, visible.current ? 1.5 : 1, delta * 2);
    targetRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={targetRef} position={[0, 0, 0]}>
      <planeBufferGeometry args={[width, height, 25, 25]} />
      <meshBasicMaterial map={img} />
      <Html position={[0, -300, 0]}>
        <Title>
          <p>TITRE</p>
        </Title>
      </Html>
    </mesh>
  );
}

function Content() {
  const { widthCanvas } = useThree((state) => state.viewport);

  const images = useTexture([
    "https://picsum.photos/id/217/600/500",
    "https://picsum.photos/id/238/600/500",
    "https://picsum.photos/id/234/600/500",
    "https://picsum.photos/id/232/600/500",
    "https://picsum.photos/id/236/600/500",
    "https://picsum.photos/id/231/600/500",
    "https://picsum.photos/id/230/600/500",
    "https://picsum.photos/id/229/600/500",
    "https://picsum.photos/id/228/600/500",
    "https://picsum.photos/id/227/600/500",
  ]);

  return images.map((img, index) => (
    <group key={index} position={[1400 * index, 0, 0]}>
      <Image img={img} />
    </group>
  ));
}

function WebglCarrousel() {
  const camera = {};
  camera.position = [0, 0, 600];
  camera.fov = 2 * Math.atan(window.innerHeight / 2 / 600) * (180 / Math.PI);

  return (
    <WebglPage className="page" as={motion.div} variants={revealY} initial="hidden" animate="visible" exit="exit">
      <Map>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </Map>
      <Canvas camera={{ fov: camera.fov, position: camera.position }}>
        <ScrollControls
          pages={6} // Each page takes 100% of the height of the canvas
          distance={1} // A factor that increases scroll bar travel (default: 1)
          damping={4} // Friction, higher is faster (default: 4)
          horizontal={true} // Can also scroll horizontally (default: false)
          infinite={false} // Can also scroll infinitely (default: false)
        >
          <Suspense fallback={null}>
            <Scroll>
              <Content />
            </Scroll>
          </Suspense>
        </ScrollControls>
      </Canvas>
    </WebglPage>
  );
}

export default WebglCarrousel;
