import { useRef, useState, useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { latToPlace } from '../../http/geocodeApi'

const Globe = ({ setLocation, search }) => {
  const globeRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "/earth.jpg");
  const [scale, setScale] = useState(1);
  const { camera } = useThree();
  const [marker, setMarker] = useState(null);
  const isDragging = useRef(false);

  const handlePointerDown = () => {
    isDragging.current = false;
  };

  const handlePointerMove = () => {
    isDragging.current = true;
  };

  const handlePointerUp = (event) => {
    if (isDragging.current) return;
    const globe = globeRef.current;
    if (!globe) return;
  
    const intersect = event.intersections[0];
    if (!intersect) return;
  
    const point = intersect.point.clone().normalize().multiplyScalar(2.5);
    const lat = Math.asin(point.y / 2.5) * (180 / Math.PI);
    const lon = Math.atan2(point.z, point.x) * (180 / Math.PI) * (-1);
  
    setMarker({
      position: point.clone().multiplyScalar(scale).toArray(),
      lat,
      lon,
      originalPosition: point.clone()
    });

    latToPlace(lat, lon)
    .then(data => {
      if(data) {
        setLocation({place: `${data.address.city ? data.address.city : ''} ${data.address.country}`, lat: lat.toFixed(7), lon: lon.toFixed(7)})
      } else {
        setLocation({place: null, lat: null, lon: null})
      }
    })
  };

  useEffect(() => {
    if (!search.lat || !search.lon) return;

    const tempLat = parseFloat(search.lat);
    const tempLon = parseFloat(search.lon);
    const radius = 2.5; // Радиус сферы

    // Преобразование lat/lon в сферические координаты
    const phi = (90 - tempLat) * (Math.PI / 180);
    const theta = (-tempLon) * (Math.PI / 180);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    const point = new THREE.Vector3(x, y, z); // Позиция маркера

    setMarker({
      position: point.clone().toArray(),
      lat: tempLat,
      lon: tempLon,
      originalPosition: point,
    });

    // 🚀 Вычисляем камеру на луче, но выше маркера
    const cameraDistance = 5; // Насколько далеко камера от центра (больше радиуса!)
    const cameraPosition = point.clone().normalize().multiplyScalar(cameraDistance);

    // Анимация камеры
    gsap.to(camera.position, {
      x: cameraPosition.x,
      y: cameraPosition.y,
      z: cameraPosition.z,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => {
        camera.lookAt(0, 0, 0); // Всегда смотрим на центр сферы
      },
    });

    gsap.to(globeRef.current.scale, { 
      x: 1, 
      y: 1, 
      z: 1, 
      duration: 1
    });

    setScale(1)

  }, [search]);
  

  useEffect(() => {
    const handleScroll = (event) => {
      let newScale = scale - event.deltaY * 0.005;
      newScale = Math.min(1.5, Math.max(0.5, newScale));
      console.log(scale, newScale)
      setScale(newScale);

      if(marker){
        const newPosition = marker.originalPosition.clone().multiplyScalar(newScale);
        if(event.deltaY == 100){
          gsap.to(globeRef.current.scale, { 
            x: newScale, 
            y: newScale, 
            z: newScale, 
            duration: 0.5
          })
          setMarker((prev) => ({ ...prev, position: newPosition.toArray() }));
        } else {
          gsap.to(globeRef.current.scale, { 
            x: newScale, 
            y: newScale, 
            z: newScale, 
            duration: 0.5, 
            onComplete: () => {
            setMarker((prev) => ({ ...prev, position: newPosition.toArray() }));
          }});
        }
      } else {
        gsap.to(globeRef.current.scale, { 
          x: newScale, 
          y: newScale, 
          z: newScale, 
          duration: 0.5
        });
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [scale, marker]);

  return (
    <>
      <mesh
        ref={globeRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {marker && (
        <mesh position={marker.position}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      )}
    </>
  );
};

export default Globe;
