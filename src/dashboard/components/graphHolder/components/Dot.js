import styled from "styled-components";

const HoverPart = styled.circle`
  r: 10px;
  fill: transparent;
  cursor: pointer;
`;
const Circle = styled.circle`
  pointer-events: none;
  r: 4px;
  fill: ${(props) => props.color};
`;

const Polygon = styled.polygon`
  fill: ${(props) => props.color};
  pointer-events: none;
`;

const Dot = ({ d, xScale, yScale, color, type, setTooltips }) => {
  const size = 6;
  return (
    <>
      <HoverPart
        key={"dot-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
        cy={yScale(d.VALEUR)}
        cx={xScale(d.ANNEE)}
        color={color}
        onPointerOver={() =>
          setTooltips([
            {
              VALEUR: d.VALEUR.toLocaleString("fr-FR"),
              Y: d.VALEUR,
              X: d.ANNEE,
            },
          ])
        }
        onMouseLeave={() => setTooltips([])}
      />
      {type === "dot" && (
        <Circle
          key={"dot-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          cy={yScale(d.VALEUR)}
          cx={xScale(d.ANNEE)}
          color={color}
        />
      )}
      {type === "square" && (
        <Polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE) - size},${yScale(d.VALEUR) - size} ` + // TOP LEFT
            `${xScale(d.ANNEE) - size},${yScale(d.VALEUR) + size} ` + // BOTTOM LEFT
            `${xScale(d.ANNEE) + size},${yScale(d.VALEUR) + size} ` + // BOTTOM RIGHT
            `${xScale(d.ANNEE) + size},${yScale(d.VALEUR) - size}` // TOP RIGHT
          } // BOTTOM LEFT
          color={color}
        />
      )}

      {type === "triangle" && (
        <Polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) - 6} ` + //TOP
            `${xScale(d.ANNEE) - 6},${yScale(d.VALEUR) + 6} ` + // LEFT
            `${xScale(d.ANNEE) + 6},${yScale(d.VALEUR) + 6}`
          } // RIGHT
          color={color}
        />
      )}

      {type === "5f" && (
        <Polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) - size} ` + //TOP
            `${xScale(d.ANNEE) + size},${yScale(d.VALEUR)} ` + // MIDDLE RIGHT
            `${xScale(d.ANNEE) + size / 1.5},${yScale(d.VALEUR) + size} ` + // BOTTOM RIGHT
            `${xScale(d.ANNEE) - size / 1.5},${yScale(d.VALEUR) + size} ` + // BOTTOM LEFT
            `${xScale(d.ANNEE) - size},${yScale(d.VALEUR)} ` // MIDDLE LEFT
          }
          color={color}
        />
      )}
      {type === "etoile" && (
        <Polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) - size} ` + //TOP
            `${xScale(d.ANNEE) + size / 4},${yScale(d.VALEUR) - size / 4} ` + // MIDDLE RIGHT
            `${xScale(d.ANNEE) + size},${yScale(d.VALEUR) - size / 4} ` + // MIDDLE RIGHT
            `${xScale(d.ANNEE) + size / 3},${yScale(d.VALEUR) + size / 4} ` + // MIDDLE RIGHT
            `${xScale(d.ANNEE) + size / 1.5},${yScale(d.VALEUR) + size} ` + // BOTTOM RIGHT
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) + size / 3} ` + // BOTTOM RIGHT
            `${xScale(d.ANNEE) - size / 1.5},${yScale(d.VALEUR) + size} ` + // BOTTOM LEFT
            `${xScale(d.ANNEE) - size / 3},${yScale(d.VALEUR) + size / 4} ` + // BOTTOM LEFT
            `${xScale(d.ANNEE) - size},${yScale(d.VALEUR) - size / 4} ` + // MIDDLE LEFT
            `${xScale(d.ANNEE) - size / 4},${yScale(d.VALEUR) - size / 4} ` // MIDDLE LEFT
          }
          color={color}
        />
      )}
      {type === "6f" && (
        <Polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) - size} ` + //TOP
            `${xScale(d.ANNEE) + size / (7 / 8)},${
              yScale(d.VALEUR) - size / 3
            } ` + // MIDDLE UP RIGHT
            `${xScale(d.ANNEE) + size / (7 / 8)},${
              yScale(d.VALEUR) + size / 3
            } ` + // MIDDLE DOWN RIGHT
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) + size} ` + // BOTTOM
            `${xScale(d.ANNEE) - size / (7 / 8)},${
              yScale(d.VALEUR) + size / 3
            } ` + // MIDDLE DOWN LEFT
            `${xScale(d.ANNEE) - size / (7 / 8)},${
              yScale(d.VALEUR) - size / 3
            } ` // MIDDLE UP LEFT
          }
          color={color}
        />
      )}
      {type === "7f" && (
        <Polygon
          key={"poly-" + xScale(d.ANNEE).toString() + "-" + d.CODGEO.toString()}
          points={
            `${xScale(d.ANNEE)},${yScale(d.VALEUR) - size} ` + //TOP
            `${xScale(d.ANNEE) + size / (7 / 8)},${
              yScale(d.VALEUR) - size / 3
            } ` + // MIDDLE TOP RIGHT
            `${xScale(d.ANNEE) + size / (7 / 8)},${
              yScale(d.VALEUR) + size / 3
            } ` + // MIDDLE RIGHT
            `${xScale(d.ANNEE) + size / 2},${yScale(d.VALEUR) + size} ` + // BOTTOM RIGHT
            `${xScale(d.ANNEE) - size / 2},${yScale(d.VALEUR) + size} ` + // BOTTOM LEFT
            `${xScale(d.ANNEE) - size / (7 / 8)},${
              yScale(d.VALEUR) + size / 3
            } ` + // MIDDLE LEFT
            `${xScale(d.ANNEE) - size / (7 / 8)},${
              yScale(d.VALEUR) - size / 3
            } ` // MIDDLE LEFT
          }
          Polygon={color}
        />
      )}
    </>
  );
};
export default Dot;
