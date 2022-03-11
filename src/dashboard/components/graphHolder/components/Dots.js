import Dot from "./Dot";

const Dots = ({ data, xScale, yScale, couleur, type = "dot", setTooltips }) =>
  data.map((d) => (
    <Dot
      d={d}
      xScale={xScale}
      yScale={yScale}
      color={couleur}
      type={type}
      setTooltips={setTooltips}
    />
  ));

export { Dots };
