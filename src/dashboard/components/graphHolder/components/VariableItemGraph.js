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

const VariableItem = ({ layer, setData, nbLayers }) => {
  const [pop, setPop] = useState(false);
  const texte = genererLegende(layer);

  return (
    <>
      <span className="ft-0-8 italic " key={"var-" + keyGen(layer)}>
        {nbLayers > 1 && (
          <input
            type="checkbox"
            defaultChecked={layer.SHOW}
            onChange={() =>
              setData((pre) =>
                pre.map((lay) =>
                  lay.LAYER === layer.LAYER
                    ? { ...lay, ["SHOW"]: !layer.SHOW }
                    : { ...lay, ["SHOW"]: layer.SHOW }
                )
              )
            }
          ></input>
        )}
        {layer.VARIABLE.LIBELLE}
        <IoMdInformationCircleOutline
          className="info"
          style={{ color: pop && "#0aaacb" }}
          onClick={() => setPop((prev) => !prev)}
          size={15}
        />
      </span>
      {pop && <PopupSource texte={texte} setPop={setPop} />}
    </>
  );
};

export default VariableItem;
