import Dot from "./Dot";

const Dots = ({
  data,
  xScale,
  yScale,
  radius = 4,
  innerHeight,
  couleur,
  type = "dot",
}) => {
  return data.map((d) => {
    return (
      <Dot
        d={d}
        xScale={xScale}
        yScale={yScale}
        radius={radius}
        color={couleur}
        innerHeight={innerHeight}
        type={type}
      />
    );
  });
};

export { Dots };
