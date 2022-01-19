import { timeFormat } from "d3-time-format";

const AxisBottomCategorical = ({
  xScale,
  innerHeight,
  innerWidth,
  xVariable,
}) => (
  <>
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
    <text x={innerWidth / 2} y={innerHeight + 45} className="xTitle">
      {xVariable}
    </text>
  </>
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
        <line className="tick" y1={-innerHeight - 10} y2={-10} />

        <text dy={"0.61em"} className="xLabel">
          {tickValue}
        </text>
      </g>
    ))}
    <text x={innerWidth / 2} y={innerHeight + 45} className="xTitle">
      {xVariable}
    </text>
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
    <text x={innerWidth / 2} y={innerHeight + 45} className="xTitle">
      {xVariable}
    </text>
  </>
);

export { AxisBottomCategorical, AxisBottomContinuous, AxisBottomTime };
