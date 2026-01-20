import React, { useRef } from "react";
import { MaterialDebugConfig, BrickMaterial } from "./materials";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Group, Mesh } from "three";

const brickSize = 7.5;
const brickHeight = 3;

const visible = {
  base: true,
  torso: true,
  backLegs: true,
  frontLegs: true,
  tail: true,
};

const fullRotation = Math.PI * 2;

const Unicorn: React.FC = () => {
  const unicorn = useGLTF("./lego-tile.glb");

  const unicornRef = useRef<Group>(null);
  const animatedMeshesRef = useRef<Mesh[]>([]);
  const animationTimeline = useRef<gsap.core.Timeline | null>(null);

  const visibility = useControls("unicorn-parts", visible, { collapsed: true });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locator = useControls("brick-location", {
    x: {
      value: 0,
      step: brickSize / 2,
      min: -brickSize * 15,
      max: brickSize * 15,
    },
    y: {
      value: 0,
      step: brickHeight,
      min: -brickHeight * 15,
      max: brickHeight * 15,
    },
    z: {
      value: 0,
      step: brickSize / 2,
      min: -brickSize * 15,
      max: brickSize * 15,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rotator = useControls("brick-rotation", {
    x: {
      value: 0,
      step: fullRotation * 0.125,
      min: fullRotation * -1,
      max: fullRotation * 1,
    },
    y: {
      value: 0,
      step: fullRotation * 0.125,
      min: fullRotation * -1,
      max: fullRotation * 1,
    },
    z: {
      value: 0,
      step: fullRotation * 0.125,
      min: fullRotation * -1,
      max: fullRotation * 1,
    },
  });

  const { contextSafe } = useGSAP(
    () => {
      if (unicornRef.current) {
        animatedMeshesRef.current = [];

        unicornRef.current.traverse((child) => {
          if (child instanceof Mesh) {
            animatedMeshesRef.current.push(child);
          }
        });
      }

      animationTimeline.current = gsap
        .timeline({ reversed: true })
        .to(
          animatedMeshesRef.current.map((d) => d.position),
          {
            x: "random(-100, 100)",
            y: "random(10, 110)",
            z: "random(-100, 100)",

            ease: "back.out",
            duration: 0.6,
            stagger: {
              amount: 0.5,
              from: "center", // TODO? maybe remove this in favor of having the correct order of building and unbuilding the unicorn?
            },
          },
          0,
        )
        .to(
          animatedMeshesRef.current.map((d) => d.rotation),
          {
            x: () => gsap.utils.random(-Math.PI, Math.PI),
            y: () => gsap.utils.random(-Math.PI, Math.PI),
            z: () => gsap.utils.random(-Math.PI, Math.PI),

            ease: "none",
            duration: 0.6,
            stagger: {
              amount: 0.5,
              from: "center", // TODO? maybe remove this in favor of having the correct order of building and unbuilding the unicorn?
            },
          },
          0,
        );
    },
    { scope: unicornRef },
  );

  return (
    <group
      onClick={(event) => {
        event.stopPropagation();

        contextSafe(() => {
          animationTimeline.current?.reversed(
            !animationTimeline.current.reversed(),
          );
        })();
      }}
    >
      <MaterialDebugConfig />

      <group name="unicorn" scale={0.2} ref={unicornRef}>
        <group name="base" visible={visibility.base}>
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
            geometry={unicorn.meshes["2x1flatsloped^2"].geometry}
            position={[
              brickSize * 2,
              brickHeight * 1,
              brickSize * 0.5 + brickSize * 1,
            ]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.blueLight}
          />
          <mesh
            geometry={unicorn.meshes["2x1flatsloped^2"].geometry}
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
            geometry={unicorn.meshes["2x1flatsloped^2"].geometry}
            position={[
              brickSize * 2,
              brickHeight * 1,
              -(brickSize * 0.5 + brickSize * 1),
            ]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.orange}
          />
          <mesh
            geometry={unicorn.meshes["2x1flatsloped^2"].geometry}
            position={[brickSize * -2, brickHeight, brickSize * -1.5]}
            material={BrickMaterial.orange}
          />

          <mesh
            geometry={unicorn.meshes["2x1flatsloped^2"].geometry}
            position={[brickSize * -1, brickHeight * 1, brickSize * -2.5]}
            material={BrickMaterial.red}
          />
          <mesh
            geometry={unicorn.meshes["2x1flatsloped^2"].geometry}
            position={[brickSize * 1, brickHeight * 1, brickSize * -2.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.red}
          />
          <mesh
            geometry={unicorn.meshes["2x1flatsloped^2"].geometry}
            position={[brickSize * -1, brickHeight * 1, brickSize * 2.5]}
            material={BrickMaterial.purple}
          />
          <mesh
            geometry={unicorn.meshes["2x1flatsloped^2"].geometry}
            position={[brickSize * 1, brickHeight * 1, brickSize * 2.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.purple}
          />

          <mesh
            geometry={unicorn.meshes["3x1flatsloped^3"].geometry}
            position={[brickSize * 2.5, brickHeight * 1, brickSize * -0.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.yellow}
          />
          <mesh
            geometry={unicorn.meshes["3x1flatsloped^3"].geometry}
            position={[brickSize * -2.5, brickHeight * 1, brickSize * -0.5]}
            material={BrickMaterial.yellow}
          />

          <mesh
            geometry={unicorn.meshes["3x1flatsloped^3"].geometry}
            position={[brickSize * -2.5, brickHeight * 1, brickSize * 0.5]}
            material={BrickMaterial.turquoiseDark}
          />
          <mesh
            geometry={unicorn.meshes["3x1flatsloped^3"].geometry}
            position={[brickSize * 2.5, brickHeight * 1, brickSize * 0.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.turquoiseDark}
          />
        </group>

        <group
          name="tail"
          visible={visibility.tail}
          rotation={[0, fullRotation * 0.25, 0]}
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

          <mesh
            geometry={unicorn.meshes["1x2joint"].geometry}
            position={[0, brickHeight * 1, brickSize * 1]}
            rotation={[fullRotation * 0, fullRotation * 0, fullRotation * 0]}
            material={BrickMaterial.blueDark}
          />

          <mesh
            geometry={unicorn.meshes["2x1step^3"].geometry}
            position={[0, brickHeight * 1, brickSize * -2]}
            rotation={[fullRotation * 0, fullRotation * 0.5, fullRotation * 0]}
            material={BrickMaterial.purple}
          />

          <mesh
            geometry={unicorn.meshes["2x1slantedconnector"].geometry}
            position={[0, brickHeight * 6, brickSize * -2]}
            rotation={[fullRotation * 0, fullRotation * 0.5, fullRotation * 0]}
            material={BrickMaterial.turquoiseDark}
          />
          <mesh
            geometry={unicorn.meshes["1x1flatsloped^2"].geometry}
            position={[0, brickHeight * 9, brickSize * -2.5]}
            rotation={[fullRotation * 0, fullRotation * 0.25, fullRotation * 0]}
            material={BrickMaterial.turquoiseDark}
          />
          <mesh
            geometry={unicorn.meshes["2x1arcspringboard"].geometry}
            position={[0, brickHeight * 3, brickSize * 2]}
            rotation={[fullRotation * 0, fullRotation * 0, fullRotation * 0]}
            material={BrickMaterial.turquoiseDark}
          />
        </group>

        <group
          name="back-feet"
          visible={visibility.backLegs}
          position={[0, brickHeight * 3, 0]}
        >
          <mesh
            geometry={unicorn.meshes["2x2jointtarget"].geometry}
            position={[0, 0, brickSize * 1]}
            rotation={[fullRotation * 0, fullRotation * 0.5, fullRotation * 0]}
            material={BrickMaterial.grey}
          />
          <mesh
            geometry={unicorn.meshes["2x1flatrounded"].geometry}
            position={[brickSize * 0.5, brickHeight * 1, brickSize * -1]}
            rotation={[fullRotation * 0, fullRotation * 0, fullRotation * 0]}
            material={BrickMaterial.grey}
          />
          <mesh
            geometry={unicorn.meshes["2x2jointtarget"].geometry}
            position={[0, 0, brickSize * -1]}
            rotation={[fullRotation * 0, fullRotation * 0.5, fullRotation * 0]}
            material={BrickMaterial.grey}
          />
          <mesh
            geometry={unicorn.meshes["2x1flatrounded"].geometry}
            position={[brickSize * 0.5, brickHeight * 1, brickSize * 1]}
            rotation={[fullRotation * 0, fullRotation * 0, fullRotation * 0]}
            material={BrickMaterial.grey}
          />
        </group>

        <group
          name="back-legs"
          visible={visibility.backLegs}
          position={[brickSize * -1.25, brickHeight * 4, 0]}
          rotation={[0, 0, fullRotation * -0.25]}
        >
          <mesh
            geometry={unicorn.meshes["1x2joint"].geometry}
            position={[brickSize * -2, brickHeight * 1, brickSize * -1]}
            rotation={[fullRotation * 0, fullRotation * 0.25, fullRotation * 0]}
            material={BrickMaterial.white}
          />
          <mesh
            geometry={unicorn.meshes["1x2joint"].geometry}
            position={[brickSize * -2, brickHeight * 1, brickSize * 1]}
            rotation={[fullRotation * 0, fullRotation * 0.25, fullRotation * 0]}
            material={BrickMaterial.white}
          />
          <mesh
            geometry={unicorn.meshes["4x1"].geometry}
            position={[brickSize * -3, brickHeight * 0, brickSize * -1]}
            rotation={[fullRotation * 0, fullRotation * 0.25, fullRotation * 0]}
            material={BrickMaterial.white}
          />
          <mesh
            geometry={unicorn.meshes["4x1"].geometry}
            position={[brickSize * -3, brickHeight * 0, brickSize * 1]}
            rotation={[fullRotation * 0, fullRotation * 0.25, fullRotation * 0]}
            material={BrickMaterial.white}
          />

          <mesh
            geometry={unicorn.meshes["3x1"].geometry}
            position={[brickSize * -4.5, brickHeight * 1, brickSize * -1]}
            rotation={[fullRotation * 0, fullRotation * 0, fullRotation * 0]}
            material={BrickMaterial.turquoiseLight}
          />
          <mesh
            geometry={unicorn.meshes["3x1"].geometry}
            position={[brickSize * -4.5, brickHeight * 1, brickSize * 1]}
            rotation={[fullRotation * 0, fullRotation * 0, fullRotation * 0]}
            material={BrickMaterial.turquoiseLight}
          />

          <mesh
            geometry={unicorn.meshes["3x1flatsloped^3"].geometry}
            position={[brickSize * -3.5, brickHeight * 2, brickSize * -1]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.white}
          />
          <mesh
            geometry={unicorn.meshes["3x1flatsloped^3"].geometry}
            position={[brickSize * -3.5, brickHeight * 2, brickSize * 1]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.white}
          />

          <mesh
            geometry={unicorn.meshes["2x1flatsloped^2inverted"].geometry}
            position={[brickSize * -5, brickHeight * 1, brickSize * -1]}
            rotation={[fullRotation * 0.5, fullRotation * 0, fullRotation * 0]}
            material={BrickMaterial.turquoiseLight}
          />
          <mesh
            geometry={unicorn.meshes["2x1flatsloped^2inverted"].geometry}
            position={[brickSize * -5, brickHeight * 1, brickSize * 1]}
            rotation={[fullRotation * 0.5, fullRotation * 0, fullRotation * 0]}
            material={BrickMaterial.turquoiseLight}
          />
          <mesh
            geometry={unicorn.meshes["1x1rounded"].geometry}
            position={[brickSize * -3.5, brickHeight * -1, brickSize * -1]}
            rotation={[fullRotation * 0, fullRotation * 0, fullRotation * 0]}
            material={BrickMaterial.white}
          />
          <mesh
            geometry={unicorn.meshes["1x1rounded"].geometry}
            position={[brickSize * -3.5, brickHeight * -1, brickSize * 1]}
            rotation={[fullRotation * 0, fullRotation * 0, fullRotation * 0]}
            material={BrickMaterial.white}
          />
          <mesh
            geometry={unicorn.meshes["2x1jointtarget"].geometry}
            position={[brickSize * -5, brickHeight * 2, brickSize * 1]}
            rotation={[fullRotation * 0, fullRotation * 0.5, fullRotation * 0]}
            material={BrickMaterial.white}
          />
          <mesh
            geometry={unicorn.meshes["2x1jointtarget"].geometry}
            position={[brickSize * -5, brickHeight * 2, brickSize * -1]}
            rotation={[fullRotation * 0, fullRotation * 0.5, fullRotation * 0]}
            material={BrickMaterial.white}
          />
        </group>

        <group
          name="front-legs"
          visible={visibility.frontLegs}
          position={[brickSize * 8, brickHeight * 3.5, 0]}
        >
          <group
            name="legs"
            position={[brickSize * -1.25, brickHeight * 1, 0]}
            rotation={[0, 0, fullRotation * -0.25]}
          >
            <mesh
              geometry={unicorn.meshes["1x2joint"].geometry}
              position={[brickSize * -2, brickHeight * 1, brickSize * 1]}
              rotation={[0, fullRotation * 0.25, 0]}
              material={BrickMaterial.white}
            />
            <mesh
              geometry={unicorn.meshes["1x2joint"].geometry}
              position={[brickSize * -2, brickHeight * 1, brickSize * -1]}
              rotation={[0, fullRotation * 0.25, 0]}
              material={BrickMaterial.white}
            />

            <mesh
              geometry={unicorn.meshes["2x1flatsloped^2"].geometry}
              position={[brickSize * -2, brickHeight * 2, brickSize * 1]}
              rotation={[0, fullRotation * 0.5, 0]}
              material={BrickMaterial.white}
            />
            <mesh
              geometry={unicorn.meshes["2x1flatsloped^2"].geometry}
              position={[brickSize * -2, brickHeight * 2, brickSize * -1]}
              rotation={[0, fullRotation * 0.5, 0]}
              material={BrickMaterial.white}
            />

            <mesh
              geometry={unicorn.meshes["1x1grabber"].geometry}
              position={[brickSize * -2.5, brickHeight * 2, brickSize * 1]}
              rotation={[0, fullRotation * -0.25, 0]}
              material={BrickMaterial.white}
            />

            <mesh
              geometry={unicorn.meshes["1x1grabber"].geometry}
              position={[brickSize * -2.5, brickHeight * 2, brickSize * -1]}
              rotation={[0, fullRotation * -0.25, 0]}
              material={BrickMaterial.white}
            />

            <mesh
              geometry={unicorn.meshes["1x1jointdouble"].geometry}
              position={[brickSize * -4.7, brickHeight * 2, brickSize * 1]}
              rotation={[0, fullRotation * 0.25, 0]}
              material={BrickMaterial.white}
            />
            <mesh
              geometry={unicorn.meshes["1x1jointdouble"].geometry}
              position={[brickSize * -4.7, brickHeight * 2, brickSize * -1]}
              rotation={[0, fullRotation * 0.25, 0]}
              material={BrickMaterial.white}
            />

            <mesh
              geometry={unicorn.meshes["1x1flatroundedhalf"].geometry}
              position={[brickSize * -4.7, brickHeight * 3, brickSize * 1]}
              rotation={[0, fullRotation * 0.25, 0]}
              material={BrickMaterial.white}
            />
            <mesh
              geometry={unicorn.meshes["1x1flatroundedhalf"].geometry}
              position={[brickSize * -4.7, brickHeight * 3, brickSize * -1]}
              rotation={[0, fullRotation * 0.25, 0]}
              material={BrickMaterial.white}
            />
          </group>

          <group name="feet">
            <mesh
              geometry={unicorn.meshes["2x2jointtarget"].geometry}
              position={[0, 0, brickSize * 1]}
              rotation={[
                fullRotation * 0,
                fullRotation * 0.5,
                fullRotation * 0,
              ]}
              material={BrickMaterial.grey}
            />
            <mesh
              geometry={unicorn.meshes["2x1flatrounded"].geometry}
              position={[brickSize * 0.5, brickHeight * 1, brickSize * -1]}
              rotation={[0, 0, 0]}
              material={BrickMaterial.grey}
            />
            <mesh
              geometry={unicorn.meshes["2x2jointtarget"].geometry}
              position={[0, 0, brickSize * -1]}
              rotation={[0, fullRotation * 0.5, 0]}
              material={BrickMaterial.grey}
            />
            <mesh
              geometry={unicorn.meshes["2x1flatrounded"].geometry}
              position={[brickSize * 0.5, brickHeight * 1, brickSize * 1]}
              rotation={[0, 0, 0]}
              material={BrickMaterial.grey}
            />
          </group>
        </group>

        <group
          name="torso"
          visible={visibility.torso}
          position={[brickSize * 4.2, brickHeight * 14, 0]}
          rotation={[0, fullRotation * 0.25, 0]}
        >
          {/* <mesh
            geometry={unicorn.meshes["1x1"].geometry}
            position={[locator.x, locator.y, locator.z]}
            rotation={[rotator.x, rotator.y, rotator.z]}
            material={BrickMaterial.red}
          /> */}

          {/* <mesh
            geometry={unicorn.meshes["1x1"].geometry}
            position={[locator.x, locator.y, locator.z]}
            rotation={[rotator.x, rotator.y, rotator.z]}
            material={BrickMaterial.red}
          /> */}

          <mesh
            geometry={unicorn.meshes["2x2"].geometry}
            position={[0, brickHeight * 1, brickSize * 1]}
            material={BrickMaterial.turquoiseDark}
          />
          <mesh
            geometry={unicorn.meshes["2x1"].geometry}
            position={[0, brickHeight * 1, brickSize * 2.5]}
            rotation={[0, fullRotation * 0.25, 0]}
            material={BrickMaterial.turquoiseLight}
          />

          <mesh
            geometry={unicorn.meshes["4x2"].geometry}
            position={[0, brickHeight * 2, brickSize * 1]}
            material={BrickMaterial.turquoiseLight}
          />

          <mesh
            geometry={unicorn.meshes["6x4"].geometry}
            position={[0, brickHeight * 3, 0]}
            material={BrickMaterial.white}
          />

          <mesh
            geometry={unicorn.meshes["2x1grabber"].geometry}
            position={[brickSize * 1, brickHeight * 4, brickSize * 2.5]}
            material={BrickMaterial.white}
          />
          <mesh
            geometry={unicorn.meshes["2x1grabber"].geometry}
            position={[brickSize * -1, brickHeight * 4, brickSize * 2.5]}
            material={BrickMaterial.white}
          />

          {/* <mesh
            geometry={unicorn.meshes["2x1"].geometry} // TODO! slanted 2x1 connector bit x2
            position={[locator.x, locator.y, locator.z]}
            rotation={[rotator.x, rotator.y, rotator.z]}
            material={BrickMaterial.red}
          /> */}

          <mesh
            geometry={unicorn.meshes["2x1"].geometry}
            position={[0, brickHeight * 6, brickSize * 2.5]}
            rotation={[0, fullRotation * 0.25, 0]}
            material={BrickMaterial.turquoiseLight}
          />

          {/* <mesh
            geometry={unicorn.meshes["2x1"].geometry} // TODO! up-side-down slope 2x1^3
            position={[locator.x, locator.y, locator.z]}
            rotation={[rotator.x, rotator.y, rotator.z]}
            material={BrickMaterial.red}
          /> */}

          <mesh
            geometry={unicorn.meshes["2x1"].geometry}
            position={[0, brickHeight * 8, brickSize * 2.5]}
            rotation={[0, fullRotation * 0.25, 0]}
            material={BrickMaterial.turquoiseLight}
          />

          <mesh
            geometry={unicorn.meshes["4x2"].geometry}
            position={[brickSize * -1, brickHeight * 4, 0]}
            material={BrickMaterial.turquoiseLight}
          />
          <mesh
            geometry={unicorn.meshes["4x2"].geometry}
            position={[brickSize * 1, brickHeight * 4, 0]}
            material={BrickMaterial.turquoiseLight}
          />

          <mesh
            geometry={unicorn.meshes["4x1"].geometry}
            position={[brickSize * -1.5, brickHeight * 5, 0]}
            material={BrickMaterial.white}
          />
          <mesh
            geometry={unicorn.meshes["4x1"].geometry}
            position={[brickSize * 1.5, brickHeight * 5, 0]}
            material={BrickMaterial.white}
          />

          {/* <mesh
            geometry={unicorn.meshes["1x1"].geometry}
            position={[locator.x, locator.y, locator.z]}
            rotation={[rotator.x, rotator.y, rotator.z]}
            material={BrickMaterial.red}
          /> */}

          {/* <mesh
            geometry={unicorn.meshes["1x1"].geometry}
            position={[locator.x, locator.y, locator.z]}
            rotation={[rotator.x, rotator.y, rotator.z]}
            material={BrickMaterial.red}
          /> */}

          {/* <mesh
            geometry={unicorn.meshes["1x1"].geometry}
            position={[locator.x, locator.y, locator.z]}
            rotation={[rotator.x, rotator.y, rotator.z]}
            material={BrickMaterial.red}
          /> */}

          {/* <mesh
            geometry={unicorn.meshes["1x1"].geometry}
            position={[locator.x, locator.y, locator.z]}
            rotation={[rotator.x, rotator.y, rotator.z]}
            material={BrickMaterial.red}
          /> */}

          <mesh
            geometry={unicorn.meshes["2x1joint"].geometry}
            position={[brickSize * 1, brickHeight * 4, brickSize * -2.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.turquoiseLight}
          />
          <mesh
            geometry={unicorn.meshes["2x1joint"].geometry}
            position={[brickSize * -1, brickHeight * 4, brickSize * -2.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.turquoiseLight}
          />

          <mesh
            geometry={unicorn.meshes["4x1^3"].geometry}
            position={[0, brickHeight * 5, brickSize * -2.5]}
            rotation={[0, fullRotation * 0.25, 0]}
            material={BrickMaterial.white}
          />

          <mesh
            geometry={unicorn.meshes["1x1flatsloped^2"].geometry}
            position={[brickSize * -1.5, brickHeight * 8, brickSize * -2.5]}
            material={BrickMaterial.white}
          />
          <mesh
            geometry={unicorn.meshes["1x1flatsloped^2"].geometry}
            position={[brickSize * 1.5, brickHeight * 8, brickSize * -2.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.white}
          />

          <mesh
            geometry={unicorn.meshes["2x1grabber"].geometry}
            position={[0, brickHeight * 8, brickSize * -2.5]}
            rotation={[0, fullRotation * 0.5, 0]}
            material={BrickMaterial.white}
          />

          <mesh
            geometry={unicorn.meshes["4x2"].geometry}
            position={[0, brickHeight * 9, brickSize * -1]}
            material={BrickMaterial.turquoiseLight}
          />

          {/* <mesh
            geometry={unicorn.meshes["1x1"].geometry}
            position={[locator.x, locator.y, locator.z]}
            rotation={[rotator.x, rotator.y, rotator.z]}
            material={BrickMaterial.red}
          /> */}
        </group>
      </group>
    </group>
  );
};

export default Unicorn;

useGLTF.preload("./lego-tile.glb");
