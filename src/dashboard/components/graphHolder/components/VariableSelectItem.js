import React from "react";
import { keyGen } from "./mapFunctions";

import { useState } from "react";
import PopupSource from "./PopupSource";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { listSubheaderClasses } from "@mui/material";

const addSources = (layer) =>
  `
  ## Sources des données:
  
  ` +
  layer.SOURCES.map(
    (c) => `- [${c.NOM}](${c.LIEN}), ${c.AUTEUR}  
      
  `
  ).join("");

const addTitle = (layer) => `# ${layer.VARIABLE.LIBELLE.toUpperCase()}  

`;

const addDefinition = (layer) => `
## Definition:

"${layer.VARIABLE.DEFINITION.replace(
  "\n  ",
  `
`
)}"

_[Voir la définition à la source 🔗](${layer.VARIABLE.LIEN})_

`;

const addLineBreak = () => `
\n
\n


`;
const genererLegende = (layer) =>
  addTitle(layer) +
  addDefinition(layer) +
  addLineBreak() +
  addLineBreak() +
  addSources(layer);

const VariableSelectItem = ({ show, layer, setShowLayers }) => {
  const [pop, setPop] = useState(false);
  const texte = genererLegende(layer);

  return (
    <>
      <span
        className="btn-tv-color btn-small ft-0-8 italic"
        key={"var-" + keyGen(layer)}
      >
        <input
          type="checkbox"
          defaultChecked={show["l" + layer.LAYER.toString()]}
          onChange={() =>
            setShowLayers({
              ...show,
              ["l" + layer.LAYER.toString()]:
                !show["l" + layer.LAYER.toString()],
            })
          }
        ></input>
        {layer.VARIABLE.LIBELLE}
        <IoMdInformationCircleOutline
          className="info"
          style={{ color: pop && "#0aaacb" }}
          onClick={() => setPop((prev) => !prev)}
          size={15}
        />
      </span>
      {pop && (
        <PopupSource texte={texte} lien={layer.VARIABLE.LIEN} setPop={setPop} />
      )}
    </>
  );
};

export default VariableSelectItem;
