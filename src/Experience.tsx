import { Stage, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Object3D } from "three";
import * as THREE from "three";

const materialWhite = new THREE.MeshStandardMaterial({
  metalness: 0.2,
  roughness: 0.4,
  color: "#ffffff",
});
const materialRed = new THREE.MeshStandardMaterial({
  metalness: 0.2,
  roughness: 0.4,
  color: "#fd2c2c",
});
const materialBlue = new THREE.MeshStandardMaterial({
  metalness: 0.2,
  roughness: 0.4,
  color: "#4077f7",
});

const Experience: React.FC = () => {
  const unicornMeshRef = useRef<Object3D>(null);

  const unicorn = useGLTF("./lego-tile.glb");

  return (
    <Stage
      adjustCamera={false}
      shadows={{
        type: "contact",
        opacity: 0.35,
        blur: 1.6,
      }}
      environment={{
        environmentIntensity: 0.5,
        preset: "studio",
      }}
    >
      <group dispose={null} ref={unicornMeshRef}>
        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[0, 0, 0]}
          material={materialRed}
        />

        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[-2, 0, 2]}
          material={materialRed}
        />

        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[-2, 0.405, 2]}
          material={materialBlue}
        />

        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[-2, 0.81, 2]}
          material={materialWhite}
        />

        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[2, 0, 0]}
          material={materialWhite}
        />

        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[2, 0.405, 0]}
          material={materialBlue}
        />

        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[-1.36, 0.27, -1.61]}
          material={materialBlue}
          rotation={[-0.21, -0.12, 0.04]}
        />
      </group>
    </Stage>
  );
};

export default Experience;
