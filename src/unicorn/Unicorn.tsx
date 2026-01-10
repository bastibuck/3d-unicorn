import React from "react";
import { MaterialDebugConfig, BrickMaterial } from "./materials";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

const brickSize = 7.5;
const brickHeight = 3;

const fullRotation = Math.PI * 2;

const Unicorn: React.FC = () => {
  const unicorn = useGLTF("./lego-tile.glb");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locator = useControls("brick-location", {
    x: {
      value: 0,
      step: brickSize / 2,
      min: -brickSize * 10,
      max: brickSize * 10,
    },
    y: {
      value: 0,
      step: brickHeight,
      min: 0,
      max: brickHeight * 10,
    },
    z: {
      value: 0,
      step: brickSize / 2,
      min: -brickSize * 10,
      max: brickSize * 10,
    },
  });

  return (
    <>
      <MaterialDebugConfig />

      <group name="unicorn" scale={0.2}>
        <group name="base" visible={true} position={[0, 0, 0]}>
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
            geometry={unicorn.meshes["2x1sloped^2"].geometry}
            position={[
              brickSize * 2,
              brickHeight * 1,
              brickSize * 0.5 + brickSize * 1,
            ]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.blueLight}
          />
          <mesh
            geometry={unicorn.meshes["2x1sloped^2"].geometry}
            position={[
              brickSize * -2,
              brickHeight * 1,
              brickSize * 0.5 + brickSize * 1,
            ]}
            material={BrickMaterial.blueLight}
          />

          <mesh
            geometry={unicorn.meshes["2x2"].geometry}
            position={[0, brickHeight * 2, brickSize * -1]}
            rotation={[0, fullRotation * 0.25, 0]}
            material={BrickMaterial.orange}
          />
          <mesh
            geometry={unicorn.meshes["2x1sloped^2"].geometry}
            position={[
              brickSize * 2,
              brickHeight * 1,
              -(brickSize * 0.5 + brickSize * 1),
            ]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.orange}
          />
          <mesh
            geometry={unicorn.meshes["2x1sloped^2"].geometry}
            position={[brickSize * -2, brickHeight, brickSize * -1.5]}
            material={BrickMaterial.orange}
          />

          <mesh
            geometry={unicorn.meshes["2x1sloped^2"].geometry}
            position={[brickSize * -1, brickHeight * 1, brickSize * -2.5]}
            material={BrickMaterial.red}
          />
          <mesh
            geometry={unicorn.meshes["2x1sloped^2"].geometry}
            position={[brickSize * 1, brickHeight * 1, brickSize * -2.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.red}
          />
          <mesh
            geometry={unicorn.meshes["2x1sloped^2"].geometry}
            position={[brickSize * -1, brickHeight * 1, brickSize * 2.5]}
            material={BrickMaterial.purple}
          />
          <mesh
            geometry={unicorn.meshes["2x1sloped^2"].geometry}
            position={[brickSize * 1, brickHeight * 1, brickSize * 2.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.purple}
          />

          <mesh
            geometry={unicorn.meshes["3x1sloped^3"].geometry}
            position={[brickSize * 2.5, brickHeight * 1, brickSize * -0.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.yellow}
          />
          <mesh
            geometry={unicorn.meshes["3x1sloped^3"].geometry}
            position={[brickSize * -2.5, brickHeight * 1, brickSize * -0.5]}
            material={BrickMaterial.yellow}
          />

          <mesh
            geometry={unicorn.meshes["3x1sloped^3"].geometry}
            position={[brickSize * -2.5, brickHeight * 1, brickSize * 0.5]}
            material={BrickMaterial.turquoiseDark}
          />
          <mesh
            geometry={unicorn.meshes["3x1sloped^3"].geometry}
            position={[brickSize * 2.5, brickHeight * 1, brickSize * 0.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.turquoiseDark}
          />
        </group>

        <group
          name="tail"
          rotation-y={fullRotation * 0.25}
          position={[brickSize * -2, brickHeight * 21, 0]}
        >
          <mesh
            geometry={unicorn.meshes["4x1"].geometry}
            material={BrickMaterial.purple}
          />
          <mesh
            geometry={unicorn.meshes["1x1"].geometry}
            position={[brickSize * 0, brickHeight * 1, brickSize * -0.5]}
            material={BrickMaterial.blueDark}
          />

          <mesh
            geometry={unicorn.meshes["1x1"].geometry}
            position={[brickSize * 0, brickHeight * 4, brickSize * -2.5]}
            material={BrickMaterial.blueDark}
          />

          <mesh
            geometry={unicorn.meshes["4x1"].geometry}
            position={[brickSize * 0, brickHeight * 5, brickSize * -1]}
            material={BrickMaterial.turquoiseDark}
          />

          <mesh
            geometry={unicorn.meshes["3x1flat"].geometry}
            position={[brickSize * 0, brickHeight * 6, brickSize * 0.5]}
            material={BrickMaterial.turquoiseDark}
          />

          <mesh
            geometry={unicorn.meshes["2x1flat"].geometry}
            position={[brickHeight * 2.25, brickSize * 1.5, 0]}
            rotation-z={fullRotation * 0.25}
            material={BrickMaterial.blueLight}
          />
          <mesh
            geometry={unicorn.meshes["2x1flat"].geometry}
            position={[brickHeight * -2.25, brickSize * 1.5, 0]}
            rotation-z={fullRotation * -0.25}
            material={BrickMaterial.blueLight}
          />

          <mesh
            geometry={unicorn.meshes["2x1^3"].geometry}
            position={[0, brickHeight * 2, brickSize * -1]}
            rotation-y={fullRotation * -0.25}
            material={BrickMaterial.blueDark}
          />
          <mesh
            geometry={unicorn.meshes["2x1^3"].geometry}
            position={[0, brickHeight * 2, brickSize * 1]}
            rotation-y={fullRotation * -0.25}
            material={BrickMaterial.blueDark}
          />

          <mesh
            geometry={unicorn.meshes["1x1flatrounded"].geometry}
            position={[brickHeight * -1.25, brickSize * 1.5, brickSize * 1.5]}
            rotation={[0, fullRotation * -0.5, fullRotation * -0.25]}
            material={BrickMaterial.blueLight}
          />
          <mesh
            geometry={unicorn.meshes["1x1flatrounded"].geometry}
            position={[brickHeight * 2.25, brickSize * 1.5, brickSize * 1.5]}
            rotation={[0, fullRotation * -0.5, fullRotation * -0.25]}
            material={BrickMaterial.blueLight}
          />
          <mesh
            geometry={unicorn.meshes["2x2flatrounded"].geometry}
            position={[brickHeight * -1.25, brickSize * 2, brickSize * -2]}
            rotation={[fullRotation * 0, fullRotation * 0, fullRotation * 0.25]}
            material={BrickMaterial.blueLight}
          />
          <mesh
            geometry={unicorn.meshes["2x2flatrounded"].geometry}
            position={[brickHeight * 2.25, brickSize * 2, brickSize * -2]}
            rotation={[fullRotation * 0, fullRotation * 0, fullRotation * 0.25]}
            material={BrickMaterial.blueLight}
          />

          {/* <mesh
            geometry={unicorn.meshes["1x1"].geometry}
            position={[locator.x, locator.y, locator.z]}
            rotation={[fullRotation * 0, fullRotation * 0, fullRotation * 0.]}
            material={BrickMaterial.red}
          /> */}
        </group>
      </group>
    </>
  );
};

export default Unicorn;

useGLTF.preload("./lego-tile.glb");
