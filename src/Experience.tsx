import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, type Mesh } from "three";

const Experience: React.FC = () => {
  const torusMeshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame((_state, delta) => {
    if (torusMeshRef.current) {
      torusMeshRef.current.rotation.y += delta * 0.3;
      torusMeshRef.current.rotation.x += delta * 0.3;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh position={[-2, 0, 1]}>
          <boxGeometry />
          <meshBasicMaterial color="deeppink" wireframe />
        </mesh>

        <mesh scale={1.1} position={[2, 0, 0]} ref={torusMeshRef}>
          <torusKnotGeometry args={[undefined, undefined, 128, 32]} />
          <meshNormalMaterial />
        </mesh>
      </group>

      <mesh rotation-x={-Math.PI * 0.5} position={[0, -1, 0]} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="green" />
      </mesh>
    </>
  );
};

export default Experience;
