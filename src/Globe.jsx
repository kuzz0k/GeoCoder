import { useRef, useState, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

const Globe = () => {
  const globeRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "/earth.jpg");
  const [scale, setScale] = useState(1);
  const [isHovered, setIsHovered] = useState(false); // Следим, наведен ли курсор
  const [marker, setMarker] = useState(null); // Храним координаты точки
  const isDragging = useRef(false);

  const handlePointerDown = () => {
    isDragging.current = false; // При нажатии сбрасываем флаг
  };

  const handlePointerMove = () => {
    isDragging.current = true; // Если двигаем мышь, считаем, что это не клик
  };

  const handlePointerUp = (event) => {
    if (isDragging.current) return; // Если был drag, не определяем координаты

    const globe = globeRef.current;
    if (!globe) return;

    const intersect = event.intersections[0];
    if (!intersect) return;

    const point = intersect.point.clone().normalize();
    const lat = Math.asin(point.y) * (180 / Math.PI);
    const lon = Math.atan2(point.z, point.x) * (180 / Math.PI)*(-1);

    setMarker({ position: point, lat, lon });
    console.log(lat, lon)
  };



  useEffect(() => {
    const handleScroll = (event) => {
      if (!isHovered) return; // Если курсор не над глобусом, игнорируем скролл

      let newScale = scale - event.deltaY * 0.005;
      newScale = Math.min(4, Math.max(1, newScale));

      setScale(newScale);
      console.log(newScale)
      gsap.to(globeRef.current.scale, { x: newScale, y: newScale, z: newScale, duration: 0.5 });
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [scale, isHovered]);

  return (
    <mesh
      ref={globeRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerEnter={() => setIsHovered(true)} // Навели курсор → включаем зум
      onPointerLeave={() => setIsHovered(false)} // Увели курсор → выключаем зум
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Globe;
