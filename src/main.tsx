import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Experience from "./Experience.tsx";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PerformanceMonitor from "./debug/PerformanceMonitor.tsx";
import DebugControls from "./debug/DebugControls.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Canvas dpr={[1, 2]} camera={{ position: [14, 12, 15] }}>
      <Experience />

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.4}
        enablePan={false}
        minPolarAngle={0.35}
        maxPolarAngle={1.5}
        minDistance={4}
        maxDistance={15}
      />

      <PerformanceMonitor />
    </Canvas>

    <DebugControls />
  </StrictMode>
);
