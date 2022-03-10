import { line } from "d3-shape";
const Path = ({ data, xScale, yScale, couleur, type = "1,0" }) => {
  return (
    <path
      className="line"
      style={{ stroke: couleur, strokeDasharray: type }}
      d={line()
        .x((d) => xScale(d.ANNEE))
        .y((d) => yScale(d.VALEUR))(data)}
    />
  );
};

export { Path };
