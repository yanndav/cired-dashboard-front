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
## Définition:

"${layer.VARIABLE.DEFINITION.replaceAll(
  "\n        ",
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
  addTitle(layer) + addDefinition(layer) + addLineBreak() + addSources(layer);

const VariableItem = ({ show, layer, setShowVariable }) => {
  const [pop, setPop] = useState(false);
  const texte = genererLegende(layer);

  return (
    <>
      <span className="ft-0-8 italic " key={"var-" + keyGen(layer)}>
        <input
          type="checkbox"
          defaultChecked={show["l" + layer.LAYER]}
          onChange={() =>
            setShowVariable((pre) => {
              let temp = Object.assign({}, pre);
              temp["l" + layer.LAYER] = !pre["l" + layer.LAYER];
              return temp;
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

export default VariableItem;