// IMPORTS

import FiltreLegend from "./FiltreLegend";
import Markdown from "marked-react";
import { useState } from "react";
import {
  ZoneFiltres,
  FiltreButton,
} from "../../parametresTableau/StyledComparaison";

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

// const convertFiltres = (filtre, infos) =>
//   Object.keys(filtre)
//     .map(
//       (key) =>
//         infos.FILTRES[key].LIBELLE +
//         " : " +
//         infos.FILTRES[key].OPTIONS.filter((op) => op.CODE === filtre[key])[0]
//           .LIBELLE
//     )
//     .join(", ");

const GraphLegend = ({ colors, data, setData, showY, setShowY }) => {
  const [click, setClick] = useState(null);
  const [clickF, setClickF] = useState(null);

  const territories = [...new Set(data.DATA.map((dt) => dt.CODGEO))];
  const hasFiltres = Object.keys(data).includes("FILTRES");

  return (
    <div>
      <p>Territoire{territories.length > 1 && "s"} :</p>

      <ZoneFiltres>
        {territories.map((t, i) => (
          <FiltreButton
            key={"legend" + t.toString()}
            isSelected={data.TERRITOIRES.includes(t)}
            couleur={colors.find((cl) => cl.CODGEO === t).COULEUR}
            onClick={() =>
              data.TERRITOIRES.includes(t)
                ? setData((prev) => [
                    ...prev.filter((prevElem) => prevElem.CODE !== data.CODE),
                    {
                      ...prev.find((prevElem) => prevElem.CODE === data.CODE),
                      TERRITOIRES: prev
                        .find((prevElem) => prevElem.CODE === data.CODE)
                        .TERRITOIRES.filter((ter) => ter !== t),
                    },
                  ])
                : setData((prev) => [
                    ...prev.filter((prevElem) => prevElem.CODE !== data.CODE),
                    {
                      ...prev.find((prevElem) => prevElem.CODE === data.CODE),
                      TERRITOIRES: [
                        ...prev.find((prevElem) => prevElem.CODE === data.CODE)
                          .TERRITOIRES,
                        t,
                      ],
                    },
                  ])
            }
            onMouseOver={() => setShowY(t.CODGEO)}
            onMouseOut={() => click === null && setShowY(null)}
            // onClick={() => {
            //   if (click === null) {
            //     setShowY(t.CODGEO);
            //     setClick(t.CODGEO);
            //   } else if (t.CODGEO !== click) {
            //     setShowY(t.CODGEO);
            //     setClick(t.CODGEO);
            //   } else {
            //     setShowY(null);
            //     setClick(null);
            //   }
            // }}
          >
            {t}
          </FiltreButton>
        ))}
      </ZoneFiltres>
      {hasFiltres && (
        <>
          <p> Filtres :</p>
          <ZoneFiltres>
            {data.FILTRES.map((flt) => (
              <FiltreButton
                isSelected={data.CHOIX.map((ch) => JSON.stringify(ch)).includes(
                  JSON.stringify(flt.FILTRE)
                )}
                onClick={() =>
                  data.CHOIX.map((ch) => JSON.stringify(ch)).includes(
                    JSON.stringify(flt.FILTRE)
                  )
                    ? setData((prev) => [
                        ...prev.filter(
                          (prevElem) => prevElem.CODE !== data.CODE
                        ),
                        {
                          ...prev.find(
                            (prevElem) => prevElem.CODE === data.CODE
                          ),
                          CHOIX: prev
                            .find((prevElem) => prevElem.CODE === data.CODE)
                            .CHOIX.filter(
                              (ch) =>
                                JSON.stringify(ch) !==
                                JSON.stringify(flt.FILTRE)
                            ),
                        },
                      ])
                    : setData((prev) => [
                        ...prev.filter(
                          (prevElem) => prevElem.CODE !== data.CODE
                        ),
                        {
                          ...prev.find(
                            (prevElem) => prevElem.CODE === data.CODE
                          ),
                          CHOIX: [
                            ...prev.find(
                              (prevElem) => prevElem.CODE === data.CODE
                            ).CHOIX,
                            flt.FILTRE,
                          ],
                        },
                      ])
                }

                // onMouseOver={() => setShowFiltre(sh.FILTRES)}
                // onMouseOut={() => clickF === null && setShowFiltre(null)}
                // onClick={() => {
                //   if (clickF === null) {
                //     setShowFiltre(sh.FILTRES);
                //     setClickF(sh.FILTRES);
                //   } else if (
                //     JSON.stringify(sh.FILTRES) !== JSON.stringify(clickF)
                //   ) {
                //     setShowFiltre(sh.FILTRES);
                //     setClickF(sh.FILTRES);
                //   } else {
                //     setShowFiltre(null);
                //     setClickF(null);
                //   }
                // }}
              >
                <FiltreLegend filtre={flt} />
                {flt.LIBELLE}
              </FiltreButton>
            ))}
          </ZoneFiltres>
        </>
      )}
    </div>
  );
};

export default GraphLegend;
