import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Globe from "./Globe";
import StarsBackground from "./StarsBackground";

function App() {
  return (
    <div style={{ width: "140vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={2.5} />
        <pointLight position={[10, 10, 10]} />
        <StarsBackground />
        <Globe />
        <OrbitControls enableZoom={false}/>
      </Canvas>
    </div>
  );
}

export default App;
