import Dot from "./Dot";
import { useState, useEffect } from "react";
const Dots = ({
  data,
  xScale,
  yScale,
  radius = 4,
  innerHeight,
  couleur,
  type = "dot",
  showXBar,
  setShowXBar,
  showY,
}) => {
  return data.map((d) => (
    <Dot
      d={d}
      xScale={xScale}
      yScale={yScale}
      radius={radius}
      color={couleur}
      innerHeight={innerHeight}
      type={type}
      showXBar={showXBar}
      setShowXBar={setShowXBar}
      showY={showY}
    />
  ));
};

export { Dots };
