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

// const updateData = (donnees, colors, shapes) => {
//   for (let dt of donnees) {
//     dt["COULEUR"] = colors.filter((cl) => cl.CODGEO === dt.CODGEO)[0][
//       "COULEUR"
//     ];
//   }
//   if (donnees[0] !== undefined && donnees[0].hasOwnProperty("FILTRES")) {
//     for (let dt of donnees) {
//       dt["LINETYPE"] = shapes.filter(
//         (cl) => JSON.stringify(cl.FILTRES) === JSON.stringify(dt.FILTRES)
//       )[0]["LINETYPE"];
//       dt["SHAPE"] = shapes.filter(
//         (cl) => JSON.stringify(cl.FILTRES) === JSON.stringify(dt.FILTRES)
//       )[0]["SHAPE"];
//     }
//   }
//   return donnees;
// };

// const sortColors = (showY, colors) => {
//   if (showY) {
//     let atTop = colors.filter((cl) => cl.CODGEO === showY)[0];
//     let colorsTemp = colors.filter((cl) => cl.CODGEO !== showY);
//     colorsTemp.push(atTop);
//     return colorsTemp;
//   } else {
//     return colors;
//   }
// };

// const colorToShow = (showY, cl) =>
//   showY === cl.CODGEO || showY === null ? cl.COULEUR : "#e0e0e0";

// const colorToShowFiltre = (showY, showFiltre, cl, sh) =>
//   (JSON.stringify(showFiltre) === JSON.stringify(sh.FILTRES) ||
//     showFiltre === null) &&
//   (showY === cl.CODGEO || showY === null)
//     ? cl.COULEUR
//     : "#e0e0e0";

const LineChart = ({ data, setData }) => {
  // Dimensions du graph:
  const width = 580;
  const height = 490;
  const margin = { top: 20, right: 40, bottom: 50, left: 60 };
  const innerWidth = +width - margin.right - margin.left;
  const innerHeight = +height - margin.top - margin.bottom;

  const [showY, setShowY] = useState(null);
  const [showXBar, setShowXBar] = useState(null);
  const [showFiltre, setShowFiltre] = useState(null);

  const colors = setGraphColors(data.DATA);
  console.log(colors);
  const hasFiltres = Object.keys(data).includes("FILTRES");
  // const shapes = data.hasOwnProperty("FILTRES")
  //   ? setGraphFiltres(data.DATA)
  //   : false;
  // console.log(shapes);
  // let donnees = updateData(data, colors, shapes);

  let xScale = scaleLinear()
    .domain(extent(data.DATA, (d) => d.ANNEE))
    .range([0, innerWidth])
    .nice();

  let yScale = scaleLinear()
    .domain([
      min(data.DATA, (d) => d.VALEUR) - scaleDomain(data.DATA, "VALEUR"),
      max(data.DATA, (d) => d.VALEUR) + scaleDomain(data.DATA, "VALEUR"),
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
            nameVar={data.LIBELLE}
          />

          {/* FAIT UN ZOOM COMPARATIF SUR UNE AXE VERTICAL */}
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

          {Object.entries(
            data.DATA.filter((dt) =>
              data.TERRITOIRES.includes(dt.CODGEO)
            ).reduce((r, a) => {
              r[a.CODGEO] = r[a.CODGEO] || [];
              r[a.CODGEO].push(a);
              return r;
            }, {})
          ).map(([groupGeo, dataGeo]) =>
            hasFiltres ? (
              data.FILTRES.filter((flt) =>
                data.CHOIX.map((ch) => JSON.stringify(ch)).includes(
                  JSON.stringify(flt.FILTRE)
                )
              ).map((flt) => (
                <g>
                  <Path
                    data={dataGeo.filter(
                      (dt) =>
                        JSON.stringify(dt.FILTRES) ===
                        JSON.stringify(flt.FILTRE)
                    )}
                    xScale={xScale}
                    yScale={yScale}
                    couleur={
                      colors.find((cl) => cl.CODGEO === groupGeo).COULEUR
                    }
                    group={groupGeo}
                    type={flt.TYPE}
                  />
                  <Dots
                    data={dataGeo.filter(
                      (dt) =>
                        JSON.stringify(dt.FILTRES) ===
                        JSON.stringify(flt.FILTRE)
                    )}
                    xScale={xScale}
                    yScale={yScale}
                    radius={2.5}
                    innerHeight={innerHeight}
                    couleur={
                      colors.find((cl) => cl.CODGEO === groupGeo).COULEUR
                    }
                    type={flt.SHAPE}
                    showXBar={showXBar}
                    setShowXBar={setShowXBar}
                    showY={showY}
                    setShowY={setShowY}
                  />
                </g>
              ))
            ) : (
              <g>
                <Path
                  data={dataGeo}
                  xScale={xScale}
                  yScale={yScale}
                  couleur={colors.find((cl) => cl.CODGEO === groupGeo).COULEUR}
                  group={groupGeo}
                />
                <Dots
                  data={dataGeo}
                  xScale={xScale}
                  yScale={yScale}
                  radius={2.5}
                  innerHeight={innerHeight}
                  couleur={colors.find((cl) => cl.CODGEO === groupGeo).COULEUR}
                  showXBar={showXBar}
                  setShowXBar={setShowXBar}
                  showY={showY}
                  setShowY={setShowY}
                />
              </g>
            )
          )}
        </g>
      </svg>
      <GraphLegend
        colors={colors}
        data={data}
        setData={setData}
        showY={showY}
        setShowY={setShowY}
      />
    </>
  );
};

export default LineChart;
