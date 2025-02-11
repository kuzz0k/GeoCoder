import { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

const Globe = () => {
  const globeRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "/earth.jpg");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = (event) => {
      let newScale = scale - event.deltaY * 0.005;


      newScale = Math.min(4, Math.max(1, newScale));

      setScale(newScale);

      gsap.to(globeRef.current.scale, { x: newScale, y: newScale, z: newScale, duration: 0.5 });
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [scale]);

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Globe;
