import React from "react";
import { MaterialDebugConfig, materials } from "./materials";
import { useGLTF } from "@react-three/drei";

const Unicorn: React.FC = () => {
  const unicorn = useGLTF("./lego-tile.glb");

  return (
    <>
      <MaterialDebugConfig />

      <group dispose={null}>
        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[-3, 0, 0]}
          material={materials.red}
        />
        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[0, 0, 0]}
          material={materials.white}
        />
        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[0, 1, 0]}
          material={materials.red}
        />
        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[0, 2, 0]}
          material={materials.blue}
        />
        <mesh
          geometry={unicorn.meshes.Cube.geometry}
          position={[3, 0, 0]}
          material={materials.blue}
        />
      </group>
    </>
  );
};

export default Unicorn;
