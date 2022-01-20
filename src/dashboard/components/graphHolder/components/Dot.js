import "./graphStyling.css";

import { useState } from "react";
import { Polygon } from "react-leaflet";
const Dot = ({
  d,
  xScale,
  yScale,
  radius,
  color,
  innerHeight,
  type,
  showXBar,
  setShowXBar,
  showY,
}) => {
  return (
    <g
      onMouseOver={() => setShowXBar(d.ANNEE)}
      onClick={() => setShowXBar(d.ANNEE)}
      onDoubleClick={() => setShowXBar(null)}
      onMouseOut={() => setShowXBar(null)}
    >
      {showY === d.CODGEO && (
        <text
          className="tooltip"
          // key={xScale(d[xVariable])*yScale(d[yVariable])}
          y={yScale(d.VALEUR)}
          x={xScale(d.ANNEE)}
          dy={-3}
          // style={{fill:color}}
        >
          {Math.round(d.VALEUR * 10) / 10}
        </text>
      )}
      {showXBar === d.ANNEE && (
        <>
          <text
            className="tooltip"
            key={xScale(d.ANNEE) * yScale(d.VALEUR)}
            y={yScale(d.VALEUR)}
            x={xScale(d.ANNEE)}
            dy={-3}
            // style={{fill:color}}
          >
            {Math.round(d.VALEUR * 10) / 10}
          </text>

          <line
            className="lineXShow"
            // style={{stroke:setShow&&"grey",strokeWidth:20}}
            // style={{stroke:"blue"}}
            x1={xScale(d.ANNEE)}
            x2={xScale(d.ANNEE)}
            y1={innerHeight}
            y2={0}
          />
        </>
      )}
      <line
        className="lineXNotShow"
        // style={{ stroke: "grey", strokeWidth: 20 }}
        x1={xScale(d.ANNEE)}
        x2={xScale(d.ANNEE)}
        y1={innerHeight}
        y2={0}
      />
      {type === "dot" && (
        <circle
          className="dot"
          key={"dot-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          cy={yScale(d.VALEUR)}
          cx={xScale(d.ANNEE)}
          r={radius}
          style={{ fill: color }}
        />
      )}
      {type === "square" && (
        <polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE) - 4},${yScale(d.VALEUR) - 4} ` + // TOP LEFT
            `${xScale(d.ANNEE) - 4},${yScale(d.VALEUR) + 4} ` + // BOTTOM LEFT
            `${xScale(d.ANNEE) + 4},${yScale(d.VALEUR) + 4} ` + // BOTTOM RIGHT
            `${xScale(d.ANNEE) + 4},${yScale(d.VALEUR) - 4}` // TOP RIGHT
          } // BOTTOM LEFT
          fill={color}
        />
      )}

      {type === "triangle" && (
        <polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) - 4} ` + //TOP
            `${xScale(d.ANNEE) - 4},${yScale(d.VALEUR) + 4} ` + // LEFT
            `${xScale(d.ANNEE) + 4},${yScale(d.VALEUR) + 4}`
          } // RIGHT
          fill={color}
        />
      )}

      {type === "5f" && (
        <polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) - 4} ` + //TOP
            `${xScale(d.ANNEE) + 4},${yScale(d.VALEUR)} ` + // MIDDLE RIGHT
            `${xScale(d.ANNEE) + 2.5},${yScale(d.VALEUR) + 4} ` + // BOTTOM RIGHT
            `${xScale(d.ANNEE) - 2.5},${yScale(d.VALEUR) + 4} ` + // BOTTOM LEFT
            `${xScale(d.ANNEE) - 4},${yScale(d.VALEUR)} ` // MIDDLE LEFT
          }
          fill={color}
        />
      )}
      {type === "etoile" && (
        <polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) - 4} ` + //TOP
            `${xScale(d.ANNEE) + 1},${yScale(d.VALEUR) - 1} ` + // MIDDLE RIGHT
            `${xScale(d.ANNEE) + 4},${yScale(d.VALEUR) - 1} ` + // MIDDLE RIGHT
            `${xScale(d.ANNEE) + 1.5},${yScale(d.VALEUR) + 1} ` + // MIDDLE RIGHT
            `${xScale(d.ANNEE) + 2.5},${yScale(d.VALEUR) + 4} ` + // BOTTOM RIGHT
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) + 1.8} ` + // BOTTOM RIGHT
            `${xScale(d.ANNEE) - 2.5},${yScale(d.VALEUR) + 4} ` + // BOTTOM LEFT
            `${xScale(d.ANNEE) - 1.5},${yScale(d.VALEUR) + 1} ` + // BOTTOM LEFT
            `${xScale(d.ANNEE) - 4},${yScale(d.VALEUR) - 1} ` + // MIDDLE LEFT
            `${xScale(d.ANNEE) - 1},${yScale(d.VALEUR) - 1} ` // MIDDLE LEFT
          }
          fill={color}
        />
      )}
      {type === "6f" && (
        <polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) - 4} ` + //TOP
            `${xScale(d.ANNEE) + 3.5},${yScale(d.VALEUR) - 1.5} ` + // MIDDLE UP RIGHT
            `${xScale(d.ANNEE) + 3.5},${yScale(d.VALEUR) + 1.5} ` + // MIDDLE DOWN RIGHT
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) + 4} ` + // BOTTOM
            `${xScale(d.ANNEE) - 3.5},${yScale(d.VALEUR) + 1.5} ` + // MIDDLE DOWN LEFT
            `${xScale(d.ANNEE) - 3.5},${yScale(d.VALEUR) - 1.5} ` // MIDDLE UP LEFT
          }
          fill={color}
        />
      )}
      {type === "7f" && (
        <polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) - 4} ` + //TOP
            `${xScale(d.ANNEE) + 3.7},${yScale(d.VALEUR) - 1.5} ` + // MIDDLE TOP RIGHT
            `${xScale(d.ANNEE) + 3.7},${yScale(d.VALEUR) + 1.5} ` + // MIDDLE RIGHT
            `${xScale(d.ANNEE) + 2},${yScale(d.VALEUR) + 4} ` + // BOTTOM RIGHT
            `${xScale(d.ANNEE) - 2},${yScale(d.VALEUR) + 4} ` + // BOTTOM LEFT
            `${xScale(d.ANNEE) - 3.7},${yScale(d.VALEUR) + 1.5} ` + // MIDDLE LEFT
            `${xScale(d.ANNEE) - 3.7},${yScale(d.VALEUR) - 1.5} ` // MIDDLE LEFT
          }
          fill={color}
        />
      )}
    </g>
  );
};
export default Dot;
