// IMPORTS

import FiltreLegend from "./FiltreLegend";
import Markdown from "marked-react";
import { useState } from "react";

// FUNCTIONS
// const widthLegend = (territories, i) => {
//   if (i !== 0) {
//     return (
//       territories
//         .slice(0, i)
//         .map((ti) => ti.LIBGEO)
//         .join("").length *
//         9 +
//       30 * (i - 1) +
//       30
//     );
//   } else {
//     return 0;
//   }
// };

const convertFiltres = (filtre, infos) =>
  Object.keys(filtre)
    .map(
      (key) =>
        infos.FILTRES[key].LIBELLE +
        " : " +
        infos.FILTRES[key].OPTIONS.filter((op) => op.CODE === filtre[key])[0]
          .LIBELLE
    )
    .join(", ");

const GraphLegend = ({
  colors,
  shapes,
  territoiresVar,
  showY,
  setShowY,
  infos,
  showFiltre,
  setShowFiltre,
}) => {
  const [click, setClick] = useState(null);
  const [clickF, setClickF] = useState(null);

  return (
    <div>
      <p>Territoire{territoiresVar.length > 1 && "s"} :</p>
      <div
        //   transform={`translate(0,${innerHeight + 70})`}
        className="flx-row flx-gap-small"
      >
        {territoiresVar
          .filter((dt) => dt.SHOW)
          .map((t, i) => {
            const show_y = showY == t.CODGEO;
            return (
              <span
                key={"legend" + t.CODGEO.toString()}
                onMouseOver={() => setShowY(t.CODGEO)}
                onMouseOut={() => click === null && setShowY(null)}
                onClick={() => {
                  if (click === null) {
                    setShowY(t.CODGEO);
                    setClick(t.CODGEO);
                  } else if (t.CODGEO !== click) {
                    setShowY(t.CODGEO);
                    setClick(t.CODGEO);
                  } else {
                    setShowY(null);
                    setClick(null);
                  }
                }}
                style={{
                  cursor: "pointer",
                  fill: colors.filter((cl) => cl.CODGEO === t.CODGEO)[0]
                    .COULEUR,
                  fontWeight: show_y ? 900 : 500,
                  // margin: "5px 15px 15px 0px",
                  whiteSpace: "nowrap",
                }}
              >
                <svg width={19} height={10}>
                  <rect
                    x={0}
                    width={15}
                    y={0}
                    height={10}
                    style={{
                      fill: colors.filter((cl) => cl.CODGEO === t.CODGEO)[0]
                        .COULEUR,
                      marginRight: "10px",
                    }}
                  />
                </svg>
                <span
                  style={{
                    fontWeight: t.CODGEO === showY && "bolder",
                  }}
                >
                  {t.LIBGEO}
                </span>
              </span>
            );
          })}
      </div>
      {shapes !== false && (
        <>
          <p> Filtres :</p>
          <div className="flx-row flx-gap-small">
            {shapes.map((sh) => (
              <span
                style={{
                  cursor: "pointer",
                  fontWeight:
                    JSON.stringify(showFiltre) === JSON.stringify(sh.FILTRES) &&
                    "bolder",
                }}
                onMouseOver={() => setShowFiltre(sh.FILTRES)}
                onMouseOut={() => clickF === null && setShowFiltre(null)}
                onClick={() => {
                  if (clickF === null) {
                    setShowFiltre(sh.FILTRES);
                    setClickF(sh.FILTRES);
                  } else if (
                    JSON.stringify(sh.FILTRES) !== JSON.stringify(clickF)
                  ) {
                    setShowFiltre(sh.FILTRES);
                    setClickF(sh.FILTRES);
                  } else {
                    setShowFiltre(null);
                    setClickF(null);
                  }
                }}
              >
                <FiltreLegend filtre={sh} /> {convertFiltres(sh.FILTRES, infos)}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GraphLegend;
