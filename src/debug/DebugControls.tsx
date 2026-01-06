import { Leva } from "leva";
import React from "react";
import useDebug from "./useDebug";

const DebugControls: React.FC = () => {
  const { enabled } = useDebug();

  if (enabled === false) {
    return null;
  }

  return <Leva hideCopyButton />;
};

export default DebugControls;
