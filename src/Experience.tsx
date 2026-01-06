import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type Mesh } from "three";

const Experience: React.FC = () => {
  const torusMeshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (torusMeshRef.current) {
      torusMeshRef.current.rotation.y -= delta * 0.5;
      torusMeshRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={5} position={[2, 4, 3]} castShadow />

      <mesh
        scale={1}
        position={[0, 2, 0]}
        ref={torusMeshRef}
        castShadow
        receiveShadow
      >
        <torusKnotGeometry args={[undefined, undefined, 128, 32]} />
        <meshStandardMaterial />

        <Html
          position={[2, 0, 0]}
          wrapperClass="unicorn-label"
          center
          occlude={[torusMeshRef]}
        >
          Imma be an unicorn
        </Html>
      </mesh>

      <mesh
        rotation-x={-Math.PI * 0.5}
        position={[0, 0, 0]}
        scale={30}
        receiveShadow
        castShadow
      >
        <planeGeometry />
        <meshStandardMaterial color={"#aaaaaa"} />
      </mesh>
    </>
  );
};

export default Experience;
