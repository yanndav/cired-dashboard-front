// React Components
import { useState } from "react";

// D3 components
import { scaleLinear, scaleTime } from "d3-scale";
import { min, max, extent } from "d3-array";
import scaleDomain from "../components/ScaleDomain";

// Import bar components
import { AxisLeftContinuous } from "../components/AxisLeft";
import { AxisBottomContinuous } from "../components/AxisBottom";
import { Dots } from "../components/Dots";
import { Path } from "../components/Path";
import Title from "../components/Title";
import GraphLegend from "../components/GraphLegend";

// Import legend functions
import {
  legendLocation,
  getTimes,
  legendTime,
} from "../../legend/LegendFunctions";
// import { namingLocation } from '../../searchBar/SearchFunctions';

const TitleCreator = (nameVar, territories, data) => {
  const title =
    nameVar +
    " à " +
    legendLocation(territories) +
    " entre " +
    legendTime(getTimes(data));
  const lines = title.match(/.{1,64}(\s|$)/g);
  return lines;
};

const LineChart = ({
  data,
  xVariable,
  yVariable,
  color,
  nameVar,
  width,
  height,
  territories,
}) => {
  const title = TitleCreator(nameVar, territories, data);
  const top = 35 + title.length * 10;

  const margin = { top: top, right: 20, bottom: 100, left: 70 };

  const innerWidth = +width - margin.right - margin.left;
  const innerHeight = +height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, (d) => d[xVariable]))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain([
      min(data, (d) => d[yVariable]) - scaleDomain(data, yVariable),
      max(data, (d) => d[yVariable]) + scaleDomain(data, yVariable),
    ])
    .range([innerHeight, 0])
    .nice();

  const [showX, setShowX] = useState(null);
  const [showY, setShowY] = useState(null);

  const uniqueColors = [...new Set(data.map((item) => item[color]))];
  const colorsPick = [
    "#FF8C00",
    "#9932CC",
    "#8B0000",
    "#8FBC8F",
    "#483D8B",
    "#00CED1",
  ];

  return (
    <svg height={height} width={width} className="graph">
      <g transform={`translate(${margin.left},${margin.top})`}>
        <Title title={title} top={top} />
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
          nameVar={nameVar}
        />

        {uniqueColors.map((col, i) => {
          const show_y = col == showY;
          return (
            <>
              <Path
                data={data.filter((item) => item[color] === col)}
                xScale={xScale}
                yScale={yScale}
                xVariable={xVariable}
                yVariable={yVariable}
                color={colorsPick[i]}
                showY={show_y}
                setShowY={setShowY}
                group={col}
              />

              <Dots
                data={data.filter((item) => item[color] === col)}
                xScale={xScale}
                yScale={yScale}
                xVariable={xVariable}
                yVariable={yVariable}
                radius={2.5}
                color={colorsPick[i]}
                innerHeight={innerHeight}
                showX={showX}
                setShowX={setShowX}
                showY={show_y}
              />

              <GraphLegend
                territories={territories}
                colorsPick={colorsPick}
                innerHeight={innerHeight}
                innerWidth={innerWidth}
                showY={showY}
                setShowY={setShowY}
              />
            </>
          );
        })}
      </g>
    </svg>
  );
};

export default LineChart;
