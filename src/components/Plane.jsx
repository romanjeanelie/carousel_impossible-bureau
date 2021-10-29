import React from "react";
import { useTexture } from "@react-three/drei";

const Plane = ({ color, args, ...props }) => {
  return (
    <mesh position={[0, 0, 0]}>
      <planeBufferGeometry args={args} />
      <meshBasicMaterial {...props} />
    </mesh>
  );
};

export default Plane;
