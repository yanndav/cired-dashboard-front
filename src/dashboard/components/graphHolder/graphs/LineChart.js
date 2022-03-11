// React Components
import { useState, useContext } from "react";
import styled from "styled-components";
// D3 components
import { scaleLinear } from "d3-scale";
import { min, max, extent } from "d3-array";
import scaleDomain from "../components/ScaleDomain";
import { colorsLight } from "../../../../app/colorComponents";

import { AppContext } from "../../../../app/AppContext";
// Import bar components
import { AxisLeftContinuous } from "../components/AxisLeft";
import { AxisBottomContinuous } from "../components/AxisBottom";
import { Dots } from "../components/Dots";
import { Path } from "../components/Path";
import GraphLegend from "../components/GraphLegend";

// Imports
import { setGraphColors } from "../components/graphFunctions";

// LES STYLED COMPONENTS
const GraphContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const GraphSVG = styled.svg`
  width: 100%;
  border-radius: 4px;
  padding: 1px;
`;

const Group = styled.g`
  position: relative;
`;
const ToolTip = styled.div`
  text-align: center;
  pointer-events: none;
  width: fit-content;
  padding: 8px;
  border-radius: 8px;
  background-color: white;
  border: 2px solid ${colorsLight.background};

  position: absolute;
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + "px"};
`;

// LE COMPOSANT REACT

const LineChart = ({ data, setData }) => {
  const { width } = useContext(AppContext);
  const [tooltips, setTooltips] = useState([]);

  // MISE A JOUR DES DONNEES --------------------------
  //  Y A T IL DES POTENTIELS FILTRES ?
  const hasFiltres = Object.keys(data).includes("FILTRES");
  // CHARGEMENT DES DONNEES
  const donneesGraph = hasFiltres
    ? data.DATA.filter((dt) => data.TERRITOIRES.includes(dt.CODGEO)).filter(
        (dt) =>
          data.CHOIX.map((ch) => JSON.stringify(ch)).includes(
            JSON.stringify(dt.FILTRES)
          )
      )
    : data.DATA.filter((dt) => data.TERRITOIRES.includes(dt.CODGEO));

  // Creation d'une fonction de largeur de marge Y adaptative données
  const MarginLeft = (donneesGraph) => {
    const nChar = Math.max(
      ...donneesGraph.map((dt) => dt.VALEUR.toLocaleString("fr-FR").length)
    );
    return nChar * 4 + 15 + 40;
  };

  // DIMENSIONS INTERACTIVES DU GRAPH ----------------------
  const maxWidth = 550;
  const widthGraph = width < maxWidth ? width - 100 : maxWidth;
  const heightGraph = width < maxWidth ? width - 100 : maxWidth;
  const margin = {
    top: 20,
    right: 10,
    bottom: 50,
    left: MarginLeft(donneesGraph),
  };
  const innerWidth = +widthGraph - margin.right - margin.left;
  const innerHeight = +heightGraph - margin.top - margin.bottom;

  // CHARGEMENT DES PARAMETRES DU GRAPH ---------------
  // Les couleurs
  const colors = setGraphColors(data.DATA);
  // Les échelles
  let xScale = scaleLinear()
    .domain(extent(donneesGraph, (d) => d.ANNEE))
    .range([0, innerWidth])
    .nice();

  let yScale = scaleLinear()
    .domain([
      min(donneesGraph, (d) => d.VALEUR) - scaleDomain(donneesGraph, "VALEUR"),
      max(donneesGraph, (d) => d.VALEUR) + scaleDomain(donneesGraph, "VALEUR"),
    ])
    .range([innerHeight, 0])
    .nice();

  // const tooltips = [{ VALEUR: 3000, Y: 3000, X: 2015 }];

  const leftTooltip = (tool) =>
    xScale(tool.X) +
    margin.left -
    (tool.VALEUR.toLocaleString("fr-FR").length * 4 +
      tool.X.toLocaleString("fr-FR").length * 4);

  return (
    <GraphContainer>
      {tooltips.length > 0 &&
        tooltips.map((tool) => (
          <ToolTip top={yScale(tool.Y) - 25} left={leftTooltip(tool)}>
            {tool.X} : {tool.VALEUR}
          </ToolTip>
        ))}

      <GraphSVG height={heightGraph} width={widthGraph}>
        <Group transform={`translate(${margin.left},${margin.top})`}>
          {/* Les AXES */}
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
            marginLeft={margin.left}
            nameVar={data.LIBELLE}
          />

          {/* LA VISUALISATION */}
          {Object.entries(
            donneesGraph.reduce((r, a) => {
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
                <Group>
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
                    setTooltips={setTooltips}
                  />
                </Group>
              ))
            ) : (
              <Group>
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
                  setTooltips={setTooltips}
                />
              </Group>
            )
          )}
        </Group>
      </GraphSVG>
      <GraphLegend colors={colors} data={data} setData={setData} />
    </GraphContainer>
  );
};

export default LineChart;
