import { line, curveMonotoneX } from "d3-shape";
const Path = ({
  data,
  xScale,
  yScale,
  couleur,
  type = "1,0",
  setShowY,
  group,
}) => {
  return (
    <>
      <path
        className="line"
        style={{ stroke: couleur, strokeDasharray: type, cursor: "pointer" }}
        d={line()
          .x((d) => xScale(d.ANNEE))
          .y((d) => yScale(d.VALEUR))(
          // .curve(curveMonotoneX)
          data
        )}
      />
    </>
  );
};

export { Path };
