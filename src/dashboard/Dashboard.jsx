// -----------------------------------------------------------------------
// -- PAGE CENTRALE DU TABLEAU DE BORD
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS -------------------------------------
// Styling
import "./Dashboard.css";
import "./../app/App.css";

// React components
import { useState, useRef, useEffect } from "react";

// TV Components
import NameTableau from "./components/nameTableau/NameTableau";
import Localisation from "./components/localisation/Localisation";
import ModuleSelecteur from "./components/selecteurModules/ModuleSelecteur";
import ModulesEtiquettes from "./components/selecteurModules/ModulesEtiquettes";
import ZoneModules from "./components/zoneModules/ZoneModules";

// COMPOSANT -------------------------------------

const Dashboard = ({ API_URL }) => {
  const [territories, setTerritories] = useState([]); // Name of territories selected
  const [selectedModules, setSelectedModules] = useState([]); // Names of selected modules
  const [geographies, setGeographies] = useState([]); // Geographies to be placed
  const [center, setCenter] = useState([46.8, 1.7]); // Center of the map (France)
  const [param, setParam] = useState({ localisation: false, modules: false }); // Parameters
  const refParam = useRef(null);

  // Functions
  const closeBox = (key) => {
    setParam((prev) => ({ ...prev, [key]: false }));
  };

  const useOutsideCloser = (boxRef, key) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
          closeBox(key);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [boxRef, key]);
  };

  return (
    <div ref={refParam}>
      <NameTableau />
      <div className="tableau-container">
        <div
          className={`flx-row flx-gap-small pos-abs flx-shrink  max-95 ${
            !param.modules && !param.localisation && "flx-nowrap"
          }`}
        >
          <Localisation
            API_URL={API_URL}
            territories={territories}
            setTerritories={setTerritories}
            geographies={geographies}
            setGeographies={setGeographies}
            center={center}
            setCenter={setCenter}
            param={param}
            setParam={setParam}
            useOutsideCloser={useOutsideCloser}
          />
          <ModuleSelecteur
            API_URL={API_URL}
            setSelectedModules={setSelectedModules}
            selectedModules={selectedModules}
            param={param}
            setParam={setParam}
            refParam={refParam}
            useOutsideCloser={useOutsideCloser}
          />
        </div>
        <div className="tableau-modules bck-color tableau-container">
          <ModulesEtiquettes
            selectedModules={selectedModules}
            setSelectedModules={setSelectedModules}
          />

          <ZoneModules
            selectedModules={selectedModules}
            geographies={geographies}
            center={center}
            API_URL={API_URL}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
