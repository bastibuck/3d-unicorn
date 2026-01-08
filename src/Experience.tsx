import { Stage } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Object3D } from "three";

const Experience: React.FC = () => {
  const torusMeshRef = useRef<Object3D>(null);

  useFrame((_state, delta) => {
    if (torusMeshRef.current) {
      torusMeshRef.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <Stage
      adjustCamera={false}
      center={{ disable: true }}
      shadows={{
        type: "contact",
        opacity: 0.25,
        blur: 1.6,
      }}
      environment={{
        environmentIntensity: 0.5,
        preset: "studio",
      }}
    >
      <mesh ref={torusMeshRef}>
        <torusKnotGeometry args={[undefined, undefined, 256, 32]} />
        <meshStandardMaterial metalness={0.1} roughness={0.3} />
      </mesh>
    </Stage>
  );
};

export default Experience;
