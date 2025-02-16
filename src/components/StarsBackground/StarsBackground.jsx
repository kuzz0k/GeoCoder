import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"

const StarsBackground = () => {
  const starRef = useRef()
  const [rotation, setRotation] = useState({ y: 0, x: 0 })

  const radius = 50
  const numStars = 1000

  const stars = new Float32Array(numStars * 3)
  for (let i = 0; i < numStars; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)

    stars[i * 3] = x
    stars[i * 3 + 1] = y
    stars[i * 3 + 2] = z
  }

  useFrame(() => {
    starRef.current.rotation.y = rotation.y * 0.5
    starRef.current.rotation.x = rotation.x * 0.5
  })

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={stars}
          itemSize={3}
          count={stars.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.01} />
    </points>
  )
}

export default StarsBackground
