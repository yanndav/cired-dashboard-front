import "./ZoneModules.css";
import Module from "./Module.jsx";
import { useContext } from "react";

import { AppContext } from "../../../app/AppContext";
const ZoneModules = ({ selectedModules, geographies, center }) => {
  const { API_URL } = useContext(AppContext);

  return (
    <div className=" flx-column flx-gap-small">
      {geographies.length === 0 || selectedModules.length === 0
        ? `Sélectionnez ${geographies.length === 0 ? "un territoire" : ""} ${
            geographies.length === 0 && selectedModules.length === 0
              ? "et "
              : ""
          } ${
            selectedModules.length === 0 ? "un module" : ""
          } pour générer votre tableau de bord`
        : selectedModules.map((d) => (
            <Module
              moduleInfo={d}
              geographies={geographies}
              center={center}
              API_URL={API_URL}
            />
          ))}
    </div>
  );
};

export default ZoneModules;
