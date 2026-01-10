import React from "react";
import { MaterialDebugConfig, BrickMaterial } from "./materials";
import { useGLTF } from "@react-three/drei";

const brickSize = 7.5;
const brickHeight = 3;

const fullRotation = Math.PI * 2;

const Unicorn: React.FC = () => {
  const unicorn = useGLTF("./lego-tile.glb");

  return (
    <>
      <MaterialDebugConfig />

      <group name="base" scale={0.2}>
        <mesh
          geometry={unicorn.meshes["8x4rounded"].geometry}
          position={[brickSize * -2, 0, 0]}
          rotation-y={fullRotation * 0.5}
          material={BrickMaterial.white}
        />
        <mesh
          geometry={unicorn.meshes["8x4rounded"].geometry}
          position={[brickSize * 2, 0, 0]}
          material={BrickMaterial.white}
        />

        <mesh
          geometry={unicorn.meshes["2x6"].geometry}
          position={[0, brickHeight, 0]}
          material={BrickMaterial.turquoiseDark}
        />

        <mesh
          geometry={unicorn.meshes["2x1"].geometry}
          position={[brickSize + brickSize / 2, brickHeight, brickSize]}
          material={BrickMaterial.blueLight}
        />
        <mesh
          geometry={unicorn.meshes["2x1"].geometry}
          position={[brickSize + brickSize / 2, brickHeight, -brickSize]}
          material={BrickMaterial.orange}
        />

        <mesh
          geometry={unicorn.meshes["2x1"].geometry}
          position={[
            (brickSize * 1 + brickSize * 0.5) * -1,
            brickHeight,
            brickSize * 1,
          ]}
          material={BrickMaterial.blueLight}
        />
        <mesh
          geometry={unicorn.meshes["2x1"].geometry}
          position={[
            (brickSize * 1 + brickSize * 0.5) * -1,
            brickHeight,
            brickSize * -1,
          ]}
          material={BrickMaterial.orange}
        />

        <mesh
          geometry={unicorn.meshes["2x1flatrounded"].geometry}
          position={[0, brickHeight, brickSize / 2 + brickSize * 3]}
          rotation={[0, fullRotation * 0.75, 0]}
          material={BrickMaterial.white}
        />
        <mesh
          geometry={unicorn.meshes["2x1flatrounded"].geometry}
          position={[0, brickHeight, (brickSize / 2 + brickSize * 3) * -1]}
          rotation={[0, fullRotation * 0.25, 0]}
          material={BrickMaterial.white}
        />

        <mesh
          geometry={unicorn.meshes["2x2"].geometry}
          position={[0, brickHeight * 2, brickSize * 1]}
          rotation={[0, fullRotation * 0.25, 0]}
          material={BrickMaterial.blueLight}
        />
        <mesh
          geometry={unicorn.meshes["2x2"].geometry}
          position={[0, brickHeight * 2, brickSize * -1]}
          rotation={[0, fullRotation * 0.25, 0]}
          material={BrickMaterial.orange}
        />
      </group>
    </>
  );
};

export default Unicorn;

useGLTF.preload("./lego-tile.glb");
