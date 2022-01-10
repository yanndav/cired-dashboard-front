import "./ZoneModules.css";

import Module from "./Module";

import { useState, useEffect } from "react";
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

const ZoneModules = ({ selectedModules, geographies, center, API_URL }) => {
  const [modules, setModules] = useState(selectedModules);
  const [geo, setGeo] = useState(geographies);

  useEffect(() => {
    setModules(selectedModules);
  }, [selectedModules]);

  useEffect(() => {
    setGeo(geographies);
  }, [geographies]);

  return (
    <div className=" flx-column flx-gap-small">
      {geographies.length === 0 || modules.length === 0
        ? `Sélectionnez ${geographies.length === 0 ? "un territoire" : ""} ${
            geographies.length === 0 && modules.length === 0 ? "et " : ""
          } ${
            modules.length === 0 ? "un module" : ""
          } pour générer votre tableau de bord`
        : modules.map((d) => {
            return (
              <>
                <rect className="sep-line" />
                <div className="mrg-5pc">
                  <h3 className="ft-2 ft-tv emphase mrg-tb-20">{d.TITRE}</h3>
                  <h4 className="mrg-tb-20">
                    Par{" " + auteurs(d) + " "}
                    le {d.DATE.toLowerCase()}
                  </h4>
                  <p className="description ">{d.DESCRIPTION}</p>
                  <div className="flx-column flx-center flx-row-gap-big">
                    {d.INSTRUCTIONS.map((c, i) => (
                      <Module
                        module={c}
                        geographies={geo}
                        center={center}
                        API_URL={API_URL}
                      />
                    ))}
                  </div>
                </div>
              </>
            );
          })}
    </div>
  );
};

export default ZoneModules;
