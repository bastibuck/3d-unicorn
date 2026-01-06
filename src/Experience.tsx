import {
  Center,
  Float,
  Html,
  MeshReflectorMaterial,
  Stage,
  Text3D,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
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

  const torusControls = useControls("torusKnot", {
    position: {
      value: { x: 0, z: 0 },
      min: -5,
      max: 5,
      step: 0.2,
    },
    label: "Wohooo",
  });

  return (
    <Stage
      adjustCamera={false}
      shadows={{
        type: "contact",
        opacity: 0.6,
        blur: 0.6,
        position: [0, 0.001, 0],
      }}
      preset="portrait"
      environment={{ environmentIntensity: 0.3, preset: "studio" }}
      castShadow
    >
      <mesh
        position={[torusControls.position.x, 2, torusControls.position.z]}
        ref={torusMeshRef}
        castShadow
        receiveShadow
      >
        <torusKnotGeometry args={[undefined, undefined, 256, 32]} />
        <meshNormalMaterial />

        <Html position={[2, 0, 0]} wrapperClass="unicorn-label" center occlude>
          {torusControls.label}
        </Html>
      </mesh>

      <Float speed={2} floatIntensity={2} position={[0, 7, -5]}>
        <Center>
          <Text3D
            scale={1.5}
            font={"https://drei.pmnd.rs/fonts/helvetiker_regular.typeface.json"}
            bevelEnabled
            bevelSegments={10}
            bevelSize={0.08}
            letterSpacing={0.1}
            castShadow
            receiveShadow
          >
            Imma be
            <meshStandardMaterial color={"deeppink"} />
          </Text3D>
        </Center>
      </Float>

      <Float speed={3} floatIntensity={1.5} position={[0, 4.5, -5]}>
        <Center>
          <Text3D
            scale={1.5}
            font={"https://drei.pmnd.rs/fonts/helvetiker_regular.typeface.json"}
            bevelEnabled
            bevelSegments={10}
            bevelSize={0.08}
            letterSpacing={0.1}
            castShadow
            receiveShadow
          >
            a unicorn
            <meshStandardMaterial color={"#ccff44"} />
          </Text3D>
        </Center>
      </Float>

      <mesh
        rotation-x={-Math.PI * 0.5}
        position={[0, 0, 0]}
        scale={30}
        receiveShadow
      >
        <planeGeometry />
        <MeshReflectorMaterial
          color="#c4c4c4"
          resolution={256}
          blur={[1000, 1000]}
          mixBlur={0.9}
          mirror={0.3}
        />
      </mesh>
    </Stage>
  );
};

export default Experience;
