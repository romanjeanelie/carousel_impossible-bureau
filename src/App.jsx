import "./styles/index.scss";
import { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useTexture, ScrollControls, Scroll } from "@react-three/drei";
import Plane from "./components/Plane";
import { Block } from "./Block";

function Image({ img, index }) {
  return <Plane map={img} args={[2, 3, 25, 25]} />;
}

function Content() {
  const images = useTexture([
    // "./assets/00.jpg",
    // "./assets/01.jpg",
    // "./assets/02.jpg",
    // "./assets/03.jpg",
    // "./assets/04.jpg",
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/238/200/300",
    "https://picsum.photos/id/234/200/300",
    "https://picsum.photos/id/232/200/300",
    "https://picsum.photos/id/236/200/300",
    "https://picsum.photos/id/231/200/300",
  ]);
  return images.map((img, index) => (
    <Block key={index} offset={index}>
      <Image key={index} img={img} />
    </Block>
  ));
}

function App() {
  return (
    <div className="App">
      <Canvas>
        <ScrollControls
          pages={3} // Each page takes 100% of the height of the canvas
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
    </div>
  );
}

export default App;
