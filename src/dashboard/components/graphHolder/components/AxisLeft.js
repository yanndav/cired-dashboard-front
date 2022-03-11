import styled from "styled-components";

const LegendeAxe = styled.text.attrs((props) => {
  return {
    transform:
      "translate(-" +
      (props.marginLeft - 20) +
      ", " +
      props.innerHeight / 2 +
      ") rotate(-90)",
    textAnchor: "middle",
  };
})`
  font-size: 1.2em;
`;

const AxeText = styled.text`
  font-size: 0.7em;
  text-anchor: end;
`;
const AxisLeftContinuous = ({
  yScale,
  innerWidth,
  innerHeight,
  nameVar,
  marginLeft,
}) => (
  <>
    {yScale.ticks(10).map((tickValue) => (
      <g key={tickValue} transform={`translate(-5, ${+yScale(tickValue)})`}>
        <line className="tick" x2={+innerWidth} style={{ opacity: 0.25 }} />
        <AxeText dy={"0.31em"}>{tickValue.toLocaleString("fr-FR")}</AxeText>
      </g>
    ))}
    <LegendeAxe innerHeight={innerHeight} marginLeft={marginLeft}>
      {nameVar}
    </LegendeAxe>
  </>
);

export { AxisLeftContinuous };
