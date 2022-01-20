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
import { lineHeight } from "@mui/system";
import { setColorsLegend } from "../components/mapFunctions";

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

const sortColors = (showY, colors) => {
  if (showY) {
    let atTop = colors.filter((cl) => cl.CODGEO === showY)[0];
    let colorsTemp = colors.filter((cl) => cl.CODGEO !== showY);
    colorsTemp.push(atTop);
    return colorsTemp;
  } else {
    return colors;
  }
};

const colorToShow = (showY, cl) =>
  showY === cl.CODGEO || showY === null ? cl.COULEUR : "#e0e0e0";

const colorToShowFiltre = (showY, showFiltre, cl, sh) =>
  (JSON.stringify(showFiltre) === JSON.stringify(sh.FILTRES) ||
    showFiltre === null) &&
  (showY === cl.CODGEO || showY === null)
    ? cl.COULEUR
    : "#e0e0e0";

const LineChart = ({ data, infos, territoiresVar }) => {
  // Dimensions:
  const width = 600;
  const height = 500;
  const margin = { top: 20, right: 40, bottom: 50, left: 60 };
  const innerWidth = +width - margin.right - margin.left;
  const innerHeight = +height - margin.top - margin.bottom;

  const [showY, setShowY] = useState(null);
  const [showXBar, setShowXBar] = useState(null);
  const [showFiltre, setShowFiltre] = useState(null);

  let colors = setGraphColors(data);
  let shapes = infos.hasOwnProperty("FILTRES") ? setGraphFiltres(data) : false;
  console.log(infos);
  let donnees = updateData(data, colors, shapes);

  let xScale = scaleLinear()
    .domain(extent(donnees, (d) => d["ANNEE"]))
    .range([0, innerWidth])
    .nice();

  let yScale = scaleLinear()
    .domain([
      min(donnees, (d) => d["VALEUR"]) - scaleDomain(donnees, "VALEUR"),
      max(donnees, (d) => d["VALEUR"]) + scaleDomain(donnees, "VALEUR"),
    ])
    .range([innerHeight, 0])
    .nice();

  return (
    <>
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
            nameVar={infos.VARIABLE.LIBELLE}
          />

          <text
            className="tooltip"
            key={xScale(showXBar) + "head"}
            y={lineHeight}
            x={xScale(showXBar)}
            dy={-1}
            style={{ fill: "#0aaacb", fontWeight: "bolder" }}
          >
            {showXBar}
          </text>

          {sortColors(showY, colors).map((cl) => {
            if (shapes !== false) {
              return shapes.map((sh) => (
                <g>
                  <Path
                    data={donnees.filter(
                      (dt) =>
                        dt.CODGEO === cl.CODGEO &&
                        JSON.stringify(dt.FILTRES) ===
                          JSON.stringify(sh.FILTRES)
                    )}
                    xScale={xScale}
                    yScale={yScale}
                    couleur={colorToShowFiltre(showY, showFiltre, cl, sh)}
                    type={sh.LINETYPE}
                    setShowY={setShowY}
                    group={cl.CODGEO}
                  />
                </g>
              ));
            } else {
              return (
                <g>
                  <Path
                    data={donnees.filter((dt) => dt.CODGEO === cl.CODGEO)}
                    xScale={xScale}
                    yScale={yScale}
                    couleur={colorToShow(showY, cl)}
                    setShowY={setShowY}
                    group={cl.CODGEO}
                  />
                </g>
              );
            }
          })}
          {sortColors(showY, colors).map((cl) => {
            if (shapes !== false) {
              return shapes.map((sh) => (
                <g>
                  <Dots
                    data={donnees.filter(
                      (dt) =>
                        dt.CODGEO === cl.CODGEO &&
                        JSON.stringify(dt.FILTRES) ===
                          JSON.stringify(sh.FILTRES)
                    )}
                    xScale={xScale}
                    yScale={yScale}
                    radius={2.5}
                    innerHeight={innerHeight}
                    couleur={colorToShowFiltre(showY, showFiltre, cl, sh)}
                    type={sh.SHAPE}
                    showXBar={showXBar}
                    setShowXBar={setShowXBar}
                    showY={showY}
                    setShowY={setShowY}
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
                    couleur={colorToShow(showY, cl)}
                    showXBar={showXBar}
                    setShowXBar={setShowXBar}
                    showY={showY}
                    setShowY={setShowY}
                  />
                </g>
              );
            }
          })}
        </g>
      </svg>
      {
        <GraphLegend
          colors={setGraphColors(data)}
          shapes={
            infos.hasOwnProperty("FILTRES") ? setGraphFiltres(data) : false
          }
          territoiresVar={territoiresVar[infos.VARIABLE.CODE]}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          showY={showY}
          setShowY={setShowY}
          infos={infos}
          showFiltre={showFiltre}
          setShowFiltre={setShowFiltre}
        />
      }
    </>
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
