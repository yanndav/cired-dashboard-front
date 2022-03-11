import { line } from "d3-shape";

import styled from "styled-components";

const Line = styled.path`
  stroke: ${(props) => props.couleur};
  stroke-dasharray: ${(props) => props.type};
  stroke-width: 4px;
  stroke-linejoin: round;
  stroke-linecap: round;
  fill: none;
`;

const Path = ({ data, xScale, yScale, couleur, type = "1,0" }) => {
  return (
    <Line
      d={line()
        .x((d) => xScale(d.ANNEE))
        .y((d) => yScale(d.VALEUR))(data)}
      couleur={couleur}
      type={type}
    />
  );
};

export { Path };
