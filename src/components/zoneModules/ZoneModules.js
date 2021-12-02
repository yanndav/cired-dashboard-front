import "./ZoneModules.css";

import Module from "./Module";

import { useState, useEffect } from "react";

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
    <div className="zone-modules">
      {geographies.length === 0 || modules.length == 0
        ? `Sélectionnez ${geographies.length == 0 ? "un territoire" : ""} ${
            geographies.length === 0 && modules.length == 0 ? "et " : ""
          } ${
            modules.length == 0 ? "un module" : ""
          } pour générer votre tableau de bord`
        : modules.map((d) => {
            return (
              <>
                <rect className="sep-line" />
                <h3 className="titre-module">{d.TITRE}</h3>
                <h4 className="auteur-module">
                  Par {d.AUTEUR[0].PRENOM + " " + d.AUTEUR[0].NOM.toUpperCase()}{" "}
                  le {d.DATE.toLowerCase()}
                </h4>
                <p className="description">{d.DESCRIPTION}</p>
                <div className="zone-elements-modules">
                  {d.INSTRUCTIONS.map((c) => (
                    <Module
                      module={c}
                      geographies={geo}
                      center={center}
                      API_URL={API_URL}
                    />
                  ))}
                </div>
              </>
            );
          })}
    </div>
  );
};

export default ZoneModules;
