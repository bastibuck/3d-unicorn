import { Stage } from "@react-three/drei";
import Unicorn from "./unicorn/Unicorn";

const Experience: React.FC = () => {
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
      <Unicorn />
    </Stage>
  );
};

export default Experience;
