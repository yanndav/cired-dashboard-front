import "./graphStyling.css";

import { useState } from "react";
const Dot = ({ d, xScale, yScale, radius, color, innerHeight }) => {
  return (
    <g
    // onMouseOver={()=>setShowX(d[xVariable])}
    // onClick={()=>setShowX(d[xVariable])}
    // onDoubleClick={()=>setShowX(null)}
    // onMouseOut={()=>setShowX(null)}
    >
      {/* {
                showY && <text className="tooltip"
                // key={xScale(d[xVariable])*yScale(d[yVariable])}
                y={yScale(d[yVariable])}
                x={xScale(d[xVariable])}
                dy={-15}
                // style={{fill:color}}
                >
                {d[xVariable]+': '+Math.round(d[yVariable]*10)/10}
                </text>
            } */}

      {/* {show && 
        <>
            <text className="tooltip"
            // key={xScale(d[xVariable])*yScale(d[yVariable])}
            y={yScale(d[yVariable])}
            x={xScale(d[xVariable])}
            dy={-15}
            // style={{fill:color}}
            >
            {d[xVariable]+': '+Math.round(d[yVariable]*10)/10}
            </text>

            <line
            className="lineXShow"
            // style={{stroke:setShow&&"grey",strokeWidth:20}}
            // style={{stroke:"blue"}}
            x1={xScale(d[xVariable])}
            x2={xScale(d[xVariable])}
            y1={innerHeight}
            y2={0}
            />
            </>
        } */}
      <line
        className="lineXNotShow"
        // style={{ stroke: "grey", strokeWidth: 20 }}
        x1={xScale(d.ANNEE)}
        x2={xScale(d.ANNEE)}
        y1={innerHeight}
        y2={0}
      />
      <circle
        className="dot"
        key={"dot-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
        cy={yScale(d.VALEUR)}
        cx={xScale(d.ANNEE)}
        r={radius}
        style={{ fill: color }}
      />
    </g>
  );
};
export default Dot;
