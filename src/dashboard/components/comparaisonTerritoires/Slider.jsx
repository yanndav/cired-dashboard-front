import React from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const log = (value) => console.log(value);
const SliderValues = ({ MIN, MAX }) => {
  return (
    <>
      <Range min={MIN} max={MAX} onAfterChange={log} allowCross={false} />
    </>
  );
};

export default SliderValues;
