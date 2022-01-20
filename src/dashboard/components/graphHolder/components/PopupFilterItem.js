import { map } from "leaflet";
import React from "react";
import { TiDelete } from "react-icons/ti";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useState } from "react";

import Markdown from "marked-react";
import { act } from "react-dom/test-utils";

const addDefinition = (filter) => `
**Définition**:

"${filter.DEFINITION.replaceAll(
  "\n        ",
  `
  `
)}"

_[Voir la définition à la source 🔗](${filter.LIEN})_

`;

const addLineBreak = () => `
\n
\n


`;

const genererLegende = (layer) => addDefinition(layer) + addLineBreak();

const PopupFilterItem = ({
  vari,
  code,
  activatedFilters,
  setActivatedFilters,
  dt,
}) => {
  const [pop, setPop] = useState(false);

  return (
    <div className="btn-tv-color btn-small flx-column w-400p">
      <span>
        <input
          type="checkbox"
          checked={activatedFilters[code].includes(dt.CODE)}
          style={{ marginRight: "15px", marginLeft: "5px" }}
          onChange={() =>
            setActivatedFilters((prev) => ({
              ...prev,
              [vari]: {
                ...prev[vari],
                [code]: prev[vari][code].includes(dt.CODE)
                  ? prev[vari][code].length > 1
                    ? prev[vari][code].filter((ct) => ct != dt.CODE)
                    : prev[vari][code]
                  : [...prev[vari][code], dt.CODE],
              },
            }))
          }
        ></input>
        {dt.LIBELLE}
        <IoMdInformationCircleOutline
          className="info"
          style={{ color: pop && "#055768" }}
          onClick={() => setPop((prev) => !prev)}
          size={15}
        />
      </span>
      {pop && (
        <div className="pdg-20">
          <Markdown className="description" value={genererLegende(dt)} />
        </div>
      )}
    </div>
  );
};

export default PopupFilterItem;
