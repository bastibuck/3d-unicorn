import {
  Center,
  Float,
  Html,
  MeshReflectorMaterial,
  Stage,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useState } from "react";
import { Object3D } from "three";

const donuts = Array.from({ length: 20 }).map(() => ({
  position: [
    (Math.random() - 0.5) * 24,
    (Math.random() - 0.5) * 24,
    (Math.random() - 0.5) * 24,
  ] as const,
  rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as const,
}));

const Experience: React.FC = () => {
  const torusMeshRef = useRef<Object3D>(null);
  const [torusMeshGeometryRef, setTorusMeshGeometryRef] = useState();

  useFrame((_state, delta) => {
    if (torusMeshRef.current) {
      torusMeshRef.current.rotation.y -= delta * 0.5;
      torusMeshRef.current.rotation.x += delta * 0.5;
    }
  });

  const [matcapTextureTextOne] = useMatcapTexture(
    "326666_66CBC9_C0B8AE_52B3B4"
  );
  const [matcapTextureTextTwo] = useMatcapTexture(
    "8A3DA1_D77CE4_C263D4_B75AC9"
  );
  const [matcapTextureDonut] = useMatcapTexture("7877EE_D87FC5_75D9C7_1C78C0");

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
        opacity: 0.25,
        blur: 0.6,
        position: [0, 1.401, 0],
      }}
      preset="portrait"
      environment={{ environmentIntensity: 0.3, preset: "studio" }}
      castShadow
    >
      {/* setting this once in state to be reused */}
      <torusGeometry ref={setTorusMeshGeometryRef} />

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
            size={2}
            font={"https://drei.pmnd.rs/fonts/helvetiker_regular.typeface.json"}
            bevelEnabled
            bevelSegments={10}
            bevelSize={0.08}
            letterSpacing={0.1}
            castShadow
            receiveShadow
          >
            Imma be
            <meshMatcapMaterial matcap={matcapTextureTextOne} />
          </Text3D>
        </Center>
      </Float>

      <Float speed={3} floatIntensity={1.5} position={[0, 4.5, -5]}>
        <Center>
          <Text3D
            size={2}
            font={"https://drei.pmnd.rs/fonts/helvetiker_regular.typeface.json"}
            bevelEnabled
            bevelSegments={10}
            bevelSize={0.08}
            letterSpacing={0.1}
            castShadow
            receiveShadow
          >
            a unicorn
            <meshMatcapMaterial matcap={matcapTextureTextTwo} />
          </Text3D>
        </Center>
      </Float>

      {donuts.map((donut, idx) => (
        <Float key={idx} floatIntensity={20} rotationIntensity={10} speed={0.4}>
          <mesh
            geometry={torusMeshGeometryRef}
            position={donut.position}
            rotation={donut.rotation}
          >
            <meshMatcapMaterial matcap={matcapTextureDonut} />
          </mesh>
        </Float>
      ))}

      <mesh rotation-x={-Math.PI * 0.5} scale={30} receiveShadow>
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
