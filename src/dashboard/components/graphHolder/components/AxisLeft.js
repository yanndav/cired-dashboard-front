const AxisLeftContinuous = ({ yScale, innerWidth, innerHeight, nameVar }) => (
  <>
    {yScale.ticks(10).map((tickValue) => (
      <g key={tickValue} transform={`translate(0, ${+yScale(tickValue)})`}>
        <line className="tick" x2={+innerWidth} />
        <text dy={"0.31em"} dx={-10} className="yLabel">
          {tickValue}
        </text>
      </g>
    ))}
    <text
      className="yTitle"
      transform={`translate(${-35}, ${innerHeight / 2}) rotate(-90)`}
    >
      {nameVar}
    </text>
  </>
);

export { AxisLeftContinuous };
