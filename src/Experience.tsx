import { OrbitControls, Stage } from "@react-three/drei";
import Unicorn from "./unicorn/Unicorn";
import { parseAsInteger, useQueryState } from "nuqs";

const Experience: React.FC = () => {
  const [speed] = useQueryState("speed", parseAsInteger.withDefault(1));

  return (
    <>
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
        <Unicorn />
      </Stage>

      <OrbitControls
        autoRotate
        autoRotateSpeed={speed}
        enablePan={false}
        minPolarAngle={0.35}
        maxPolarAngle={1.5}
        minDistance={20}
        maxDistance={55}
      />
    </>
  );
};

export default Experience;
