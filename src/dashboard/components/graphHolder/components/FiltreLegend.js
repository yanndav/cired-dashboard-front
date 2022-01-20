import "./graphStyling.css";
const FiltreLegend = ({ filtre }) => {
  const color = "black";
  const radius = 4;
  const width = 35;
  const height = 15;
  const xMid = width / 2;
  const yMid = height / 2;

  return (
    <svg width={width} height={height}>
      <path
        className={"line-leg" + JSON.stringify(filtre.FILTRES)}
        style={{
          stroke: color,
          strokeDasharray: filtre.LINETYPE,
          cursor: "pointer",
        }}
        d={`M 0 ${yMid} L ${width} ${yMid}`}
      />
      {filtre.SHAPE === "dot" && (
        <circle
          className="dot"
          key={"dot-leg" + JSON.stringify(filtre.FILTRES)}
          cy={yMid}
          cx={xMid}
          r={radius}
          style={{ fill: color }}
        />
      )}
      {filtre.SHAPE === "square" && (
        <polygon
          key={"dot-leg" + JSON.stringify(filtre.FILTRES)}
          points={
            `${xMid - 4},${yMid - 4} ` + // TOP LEFT
            `${xMid - 4},${yMid + 4} ` + // BOTTOM LEFT
            `${xMid + 4},${yMid + 4} ` + // BOTTOM RIGHT
            `${xMid + 4},${yMid - 4}` // TOP RIGHT
          } // BOTTOM LEFT
          fill={color}
        />
      )}
      {filtre.SHAPE === "triangle" && (
        <polygon
          key={"dot-leg" + JSON.stringify(filtre.FILTRES)}
          points={
            `${xMid},${yMid - 4} ` + //TOP
            `${xMid - 4},${yMid + 4} ` + // LEFT
            `${xMid + 4},${yMid + 4}`
          } // RIGHT
          fill={color}
        />
      )}
      {filtre.SHAPE === "5f" && (
        <polygon
          key={"dot-leg" + JSON.stringify(filtre.FILTRES)}
          points={
            `${xMid},${yMid - 4} ` + //TOP
            `${xMid + 4},${yMid} ` + // MIDDLE RIGHT
            `${xMid + 2.5},${yMid + 4} ` + // BOTTOM RIGHT
            `${xMid - 2.5},${yMid + 4} ` + // BOTTOM LEFT
            `${xMid - 4},${yMid} ` // MIDDLE LEFT
          }
          // fill={color}
        />
      )}{" "}
      {filtre.SHAPE === "etoile" && (
        <polygon
          key={"dot-leg" + JSON.stringify(filtre.FILTRES)}
          points={
            `${xMid},${yMid - 4} ` + //TOP
            `${xMid + 1},${yMid - 1} ` + // MIDDLE RIGHT
            `${xMid + 4},${yMid - 1} ` + // MIDDLE RIGHT
            `${xMid + 1.5},${yMid + 1} ` + // MIDDLE RIGHT
            `${xMid + 2.5},${yMid + 4} ` + // BOTTOM RIGHT
            `${xMid},${yMid + 1.8} ` + // BOTTOM RIGHT
            `${xMid - 2.5},${yMid + 4} ` + // BOTTOM LEFT
            `${xMid - 1.5},${yMid + 1} ` + // BOTTOM LEFT
            `${xMid - 4},${yMid - 1} ` + // MIDDLE LEFT
            `${xMid - 1},${yMid - 1} ` // MIDDLE LEFT
          }
          // fill={color}
        />
      )}{" "}
      {filtre.SHAPE === "6f" && (
        <polygon
          key={"dot-leg" + JSON.stringify(filtre.FILTRES)}
          points={
            `${xMid},${yMid - 4} ` + //TOP
            `${xMid + 3.5},${yMid - 1.5} ` + // MIDDLE UP RIGHT
            `${xMid + 3.5},${yMid + 1.5} ` + // MIDDLE DOWN RIGHT
            `${xMid},${yMid + 4} ` + // BOTTOM
            `${xMid - 3.5},${yMid + 1.5} ` + // MIDDLE DOWN LEFT
            `${xMid - 3.5},${yMid - 1.5} ` // MIDDLE UP LEFT
          }
          //  fill={color}
        />
      )}{" "}
      {filtre.SHAPE === "7f" && (
        <polygon
          key={"dot-leg" + JSON.stringify(filtre.FILTRES)}
          points={
            `${xMid},${yMid - 4} ` + //TOP
            `${xMid + 3.7},${yMid - 1.5} ` + // MIDDLE TOP RIGHT
            `${xMid + 3.7},${yMid + 1.5} ` + // MIDDLE RIGHT
            `${xMid + 2},${yMid + 4} ` + // BOTTOM RIGHT
            `${xMid - 2},${yMid + 4} ` + // BOTTOM LEFT
            `${xMid - 3.7},${yMid + 1.5} ` + // MIDDLE LEFT
            `${xMid - 3.7},${yMid - 1.5} ` // MIDDLE LEFT
          }
          // fill={color}
        />
      )}
    </svg>
  );
};
export default FiltreLegend;
