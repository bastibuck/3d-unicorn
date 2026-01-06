import { Perf } from "r3f-perf";
import React from "react";
import useDebug from "./useDebug";

const PerformanceMonitor: React.FC = () => {
  const { enabled } = useDebug();

  if (enabled === false) {
    return null;
  }

  return <Perf position="bottom-right" />;
};

export default PerformanceMonitor;
