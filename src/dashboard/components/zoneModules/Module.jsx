// External components
import React from "react";
import Markdown from "marked-react";
import { useState } from "react";

// Internal components
import ElementModule from "./ElementModule";
import SwitchComparaison from "../comparaisonTerritoires/SwitchComparaison";

// Functions
const auteurs = (module) => {
  const nbAut = module.AUTEUR.length;
  let auteurs = "";
  for (let i = 0; i < module.AUTEUR.length; i++) {
    let auteur =
      module.AUTEUR[i].PRENOM + " " + module.AUTEUR[i].NOM.toUpperCase();
    let tr = i === nbAut ? "" : i + 2 === nbAut ? " et " : ", ";

    auteurs = auteurs + auteur + tr;
  }
  return auteurs;
};

const Module = ({ moduleInfo, geographies, center, API_URL }) => {
  const [comparaison, setComparaison] = useState({ activate: false });
  return (
    <>
      <rect className="sep-line" />
      <div className="mrg-5pc">
        <h3 className="ft-2 ft-tv emphase mrg-tb-20">{moduleInfo.TITRE}</h3>
        <SwitchComparaison
          comparaison={comparaison}
          setComparaison={setComparaison}
        />
        <h4 className="mrg-tb-20">
          Par{" " + auteurs(moduleInfo) + " "}
          le {moduleInfo.DATE.toLowerCase()}
        </h4>
        <Markdown className="description " value={moduleInfo.DESCRIPTION} />
        <div className="flx-column flx-center flx-row-gap-big flx-invert">
          {moduleInfo.INSTRUCTIONS.map((c, i) => (
            <ElementModule
              module={c}
              geographies={geographies}
              center={center}
              API_URL={API_URL}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Module;
