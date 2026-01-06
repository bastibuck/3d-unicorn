import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import useDebug from "./debug/useDebug";

const Environment: React.FC = () => {
  const { enabled } = useDebug();

  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  useHelper(
    enabled && (directionalLightRef as React.RefObject<THREE.DirectionalLight>),
    THREE.DirectionalLightHelper,
    1
  );

  return (
    <>
      <color args={["#242424"]} attach="background" />
      {/* <SoftShadows size={25} samples={10} focus={0} />  currently broken */}

      <ambientLight intensity={0.5} />

      <directionalLight
        ref={directionalLightRef}
        intensity={2}
        position={[3, 5.5, 6]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={25}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-camera-left={-12}
        shadow-camera-right={12}
      />
    </>
  );
};

export default Environment;
