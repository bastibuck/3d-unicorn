import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Experience from "./Experience.tsx";
import { Canvas } from "@react-three/fiber";
import PerformanceMonitor from "./debug/PerformanceMonitor.tsx";
import DebugControls from "./debug/DebugControls.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <Canvas dpr={[1, 2]} camera={{ position: [14, 12, 15] }}>
        <Experience />
        <PerformanceMonitor />
      </Canvas>

      <DebugControls />
    </NuqsAdapter>
  </StrictMode>
);
