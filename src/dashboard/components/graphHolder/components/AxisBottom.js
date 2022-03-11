import { timeFormat } from "d3-time-format";
import styled from "styled-components";

const LegendeAxe = styled.text.attrs((props) => {
  return {
    x: props.innerWidth / 2,
    y: props.innerHeight + 50,
    textAnchor: "middle",
  };
})`
  /* text-align: center; */
  font-size: 1.2em;
  /* position: relative; */
`;

const AxisBottomCategorical = ({
  xScale,
  innerHeight,
  innerWidth,
  xVariable,
}) => (
  <div>
    {xScale.domain().map((tickValue) => (
      <g
        key={tickValue}
        transform={`translate(${xScale(tickValue) + xScale.bandwidth() / 2},${
          innerHeight + 10
        })`}
      >
        <text dy={"0.71em"} className="xLabel">
          {tickValue}
        </text>
      </g>
    ))}
    <LegendeAxe innerWidth={innerWidth} innerHeight={innerHeight}>
      {xVariable}
    </LegendeAxe>
  </div>
);

const AxisBottomContinuous = ({
  xScale,
  innerHeight,
  innerWidth,
  xVariable,
}) => (
  <>
    {xScale.ticks(8).map((tickValue) => (
      <g
        key={tickValue}
        transform={`translate(${xScale(tickValue)},${innerHeight + 10})`}
      >
        <line
          className="tick"
          y1={-innerHeight - 10}
          y2={-10}
          style={{ opacity: 0.25 }}
        />

        <text dy={"0.61em"} className="xLabel">
          {tickValue}
        </text>
      </g>
    ))}
    <LegendeAxe innerWidth={innerWidth} innerHeight={innerHeight}>
      {xVariable}
    </LegendeAxe>
  </>
);

const AxisBottomTime = ({ xScale, innerHeight, innerWidth, xVariable }) => (
  <>
    {xScale.ticks(10).map((tickValue) => (
      <g
        key={tickValue}
        transform={`translate(${xScale(tickValue)},${innerHeight + 10})`}
      >
        <line className="tick" y1={-innerHeight - 10} y2={-10} />

        <text dy={"0.71em"} className="xLabel">
          {timeFormat("%Y")(tickValue)}
        </text>
      </g>
    ))}
    <LegendeAxe innerWidth={innerWidth} innerHeight={innerHeight}>
      {xVariable}
    </LegendeAxe>
  </>
);

export { AxisBottomCategorical, AxisBottomContinuous, AxisBottomTime };
