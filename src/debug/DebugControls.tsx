import { Leva } from "leva";
import React from "react";
import useDebug from "./useDebug";

const DebugControls: React.FC = () => {
  const { enabled } = useDebug();

  return <Leva hidden={enabled === false} hideCopyButton />;
};

export default DebugControls;
