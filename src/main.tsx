import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Experience from "./Experience.tsx";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PerformanceMonitor from "./debug/PerformanceMonitor.tsx";
import DebugControls from "./debug/DebugControls.tsx";
import Environment from "./Environment.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Canvas camera={{ position: [5, 1, 5] }} dpr={[1, 2]} shadows>
      <Environment />

      <Experience />

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.7}
        enablePan={false}
        reverseHorizontalOrbit
        minPolarAngle={0.45}
        maxPolarAngle={1.6}
        minDistance={4}
        maxDistance={15}
        target={[0, 2, 0]}
      />

      <PerformanceMonitor />
    </Canvas>

    <DebugControls />
  </StrictMode>
);
