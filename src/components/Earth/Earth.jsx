import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Globe from "../Globe/Globe";
import StarsBackground from "../StarsBackground/StarsBackground";
import cls from './Earth.module.scss'
import React from 'react'

const Earth = () => {
  return (
    <div className={cls.main}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={2.5} />
        <pointLight position={[10, 10, 10]} />
        <StarsBackground />
        <Globe />
        <OrbitControls enableZoom={false}/>
      </Canvas>
    </div>
  )
}

export default Earth