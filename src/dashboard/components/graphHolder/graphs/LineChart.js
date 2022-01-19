// React Components
import { useState, useEffect } from "react";

// D3 components
import { scaleLinear } from "d3-scale";
import { min, max, extent } from "d3-array";
import scaleDomain from "../components/ScaleDomain";

// Import bar components
import { AxisLeftContinuous } from "../components/AxisLeft";
import { AxisBottomContinuous } from "../components/AxisBottom";
import { Dots } from "../components/Dots";
import { Path } from "../components/Path";
import Title from "../components/Title";
import GraphLegend from "../components/GraphLegend";

// Imports
import { setGraphColors } from "../components/graphFunctions";

const LineChart = ({ module, layer }) => {
  // Dimensions:
  const width = 600;
  const height = 500;
  const margin = { top: 20, right: 40, bottom: 100, left: 60 };
  const innerWidth = +width - margin.right - margin.left;
  const innerHeight = +height - margin.top - margin.bottom;

  // Constantes
  const [donnees, setDonnees] = useState(layer["DATA"]);

  useEffect(() => {
    setDonnees(layer["DATA"]);
  }, [layer]);

  const xScale = scaleLinear()
    .domain(extent(donnees, (d) => d["ANNEE"]))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain([
      min(donnees, (d) => d["VALEUR"]) - scaleDomain(donnees, "VALEUR"),
      max(donnees, (d) => d["VALEUR"]) + scaleDomain(donnees, "VALEUR"),
    ])
    .range([innerHeight, 0])
    .nice();

  const colors = setGraphColors(donnees);

  // const [showX, setShowX] = useState(null);

  // const uniqueColors = [...new Set(data.map((item) => item[color]))];
  // const colorsPick = [
  //   "#FF8C00",
  //   "#9932CC",
  //   "#8B0000",
  //   "#8FBC8F",
  //   "#483D8B",
  //   "#00CED1",
  // ];

  return (
    <svg height={height} width={width} className="graph">
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottomContinuous
          xScale={xScale}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          xVariable={"Année"}
        />
        <AxisLeftContinuous
          yScale={yScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          nameVar={"a remplacer var nom variable"}
        />
        {colors.map((cl) => (
          <g>
            <Dots
              data={donnees.filter((dt) => dt.CODGEO === cl.CODGEO)}
              xScale={xScale}
              yScale={yScale}
              radius={2.5}
              innerHeight={innerHeight}
              couleur={cl.COULEUR}
            />
            <Path
              data={donnees.filter((dt) => dt.CODGEO === cl.CODGEO)}
              xScale={xScale}
              yScale={yScale}
              couleur={cl.COULEUR}
            />
          </g>
        ))}
      </g>
    </svg>
  );
};

export default LineChart;

// <GraphLegend
//   territories={territories}
//   colorsPick={colorsPick}
//   innerHeight={innerHeight}
//   innerWidth={innerWidth}
//   showY={showY}
//   setShowY={setShowY}
// />

//     {donnees.map((col, i) => { */}
//  const show_y = col == showY;
//  return (
//  <>

// <GraphLegend
//   territories={territories}
//   colorsPick={colorsPick}
//   innerHeight={innerHeight}
//   innerWidth={innerWidth}
//   showY={showY}
//   setShowY={setShowY}
// />
