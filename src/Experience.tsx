import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type Mesh } from "three";

const Experience: React.FC = () => {
  const torusMeshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (torusMeshRef.current) {
      torusMeshRef.current.rotation.y += delta * 0.3;
      torusMeshRef.current.rotation.x += delta * 0.3;
    }

    const cameraCirclePositionAngle = state.clock.elapsedTime * 0.2;
    state.camera.position.x = Math.sin(cameraCirclePositionAngle) * 6;
    state.camera.position.z = Math.cos(cameraCirclePositionAngle) * 6;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <mesh position={[-2, 0.5, 1]}>
        <boxGeometry />
        <meshBasicMaterial color="deeppink" wireframe />
      </mesh>

      <mesh scale={1.1} position={[2, 2, 2]} ref={torusMeshRef}>
        <torusKnotGeometry args={[undefined, undefined, 128, 32]} />
        <meshNormalMaterial />
      </mesh>

      <mesh position={[0, 1, 0]}>
        <sphereGeometry />
        <meshBasicMaterial color="mediumpurple" />
      </mesh>

      <mesh rotation-x={-Math.PI * 0.5} position={[0, 0, 0]} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="green" />
      </mesh>
    </>
  );
};

export default Experience;
