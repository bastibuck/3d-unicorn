import {
  Center,
  Float,
  Html,
  MeshReflectorMaterial,
  Text3D,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Object3D } from "three";

const Experience: React.FC = () => {
  const torusMeshRef = useRef<Object3D>(null);

  useFrame((_state, delta) => {
    if (torusMeshRef.current) {
      torusMeshRef.current.rotation.y -= delta * 0.5;
      torusMeshRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={4} position={[5, 4, 7]} castShadow />

      <mesh
        scale={1}
        position={[0, 2, 0]}
        ref={torusMeshRef}
        castShadow
        receiveShadow
      >
        <torusKnotGeometry args={[undefined, undefined, 128, 32]} />
        <meshStandardMaterial />

        <Html position={[2, 0, 0]} wrapperClass="unicorn-label" center occlude>
          Wohooooo
        </Html>
      </mesh>

      <Float speed={3} floatIntensity={1.5} position={[0, 6, -20]}>
        <Center>
          <Text3D
            scale={2}
            font={"https://drei.pmnd.rs/fonts/helvetiker_regular.typeface.json"}
            bevelEnabled
            bevelSegments={10}
            bevelSize={0.08}
            letterSpacing={0.1}
          >
            Imma be
            <meshNormalMaterial />
          </Text3D>
          <Text3D
            scale={2}
            font={"https://drei.pmnd.rs/fonts/helvetiker_regular.typeface.json"}
            bevelEnabled
            bevelSegments={10}
            bevelSize={0.08}
            letterSpacing={0.1}
            position={[0, -3, 0]}
          >
            a unicorn
            <meshNormalMaterial />
          </Text3D>
        </Center>
      </Float>

      <mesh
        rotation-x={-Math.PI * 0.5}
        position={[0, 0, 0]}
        scale={30}
        receiveShadow
        castShadow
      >
        <planeGeometry />
        <MeshReflectorMaterial
          color={"#acacacff"}
          resolution={512}
          blur={[400, 400]}
          mixBlur={0.8}
          mirror={0.2}
        />
      </mesh>
    </>
  );
};

export default Experience;
