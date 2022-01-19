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
import { setGraphColors, setGraphFiltres } from "../components/graphFunctions";

const updateData = (donnees, colors, shapes) => {
  for (let dt of donnees) {
    dt["COULEUR"] = colors.filter((cl) => cl.CODGEO === dt.CODGEO)[0][
      "COULEUR"
    ];
  }
  if (donnees[0] !== undefined && donnees[0].hasOwnProperty("FILTRES")) {
    for (let dt of donnees) {
      dt["LINETYPE"] = shapes.filter(
        (cl) => JSON.stringify(cl.FILTRES) === JSON.stringify(dt.FILTRES)
      )[0]["LINETYPE"];
      dt["SHAPE"] = shapes.filter(
        (cl) => JSON.stringify(cl.FILTRES) === JSON.stringify(dt.FILTRES)
      )[0]["SHAPE"];
    }
  }
  return donnees;
};

const LineChart = ({ module, layer }) => {
  // Dimensions:
  const width = 600;
  const height = 500;
  const margin = { top: 20, right: 40, bottom: 100, left: 60 };
  const innerWidth = +width - margin.right - margin.left;
  const innerHeight = +height - margin.top - margin.bottom;

  // Constantes
  // const [donnees, setDonnees] = useState(layer["DATA"]);

  // useEffect(() => {
  //   setDonnees(layer["DATA"]);
  // }, [layer]);

  // const [showX, setShowX] = useState(null);

  const colors = setGraphColors(layer.DATA);

  const shapes = layer.hasOwnProperty("FILTRES")
    ? setGraphFiltres(layer.DATA)
    : false;

  console.log(shapes);
  let donnees = updateData(layer.DATA, colors, shapes);

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
        {colors.map((cl) => {
          if (shapes !== false) {
            return shapes.map((sh) => (
              <g>
                <Dots
                  data={donnees.filter(
                    (dt) =>
                      dt.CODGEO === cl.CODGEO &&
                      JSON.stringify(dt.FILTRES) === JSON.stringify(sh.FILTRES)
                  )}
                  xScale={xScale}
                  yScale={yScale}
                  radius={2.5}
                  innerHeight={innerHeight}
                  couleur={cl.COULEUR}
                  type={sh.SHAPE}
                />
                <Path
                  data={donnees.filter(
                    (dt) =>
                      dt.CODGEO === cl.CODGEO &&
                      JSON.stringify(dt.FILTRES) === JSON.stringify(sh.FILTRES)
                  )}
                  xScale={xScale}
                  yScale={yScale}
                  couleur={cl.COULEUR}
                  type={sh.LINETYPE}
                />
              </g>
            ));
          } else {
            return (
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
            );
          }
        })}
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
