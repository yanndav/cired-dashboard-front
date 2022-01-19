import { line, curveMonotoneX } from "d3-shape";
const Path = ({ data, xScale, yScale, couleur, type = "1,0" }) => (
  <path
    // onMouseOver={() => setShowY(group)}
    // onMouseOut={() => setShowY(null)}
    className="line"
    style={{ stroke: couleur, strokeDasharray: type }}
    d={line()
      .x((d) => xScale(d.ANNEE))
      .y((d) => yScale(d.VALEUR))(
      // .curve(curveMonotoneX)
      data
    )}
  />
);

export { Path };
