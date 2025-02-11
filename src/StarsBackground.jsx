import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const StarsBackground = () => {
  const starRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "/stars.jpg");

  return (
    <mesh ref={starRef}>
      <sphereGeometry args={[50, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

export default StarsBackground;
