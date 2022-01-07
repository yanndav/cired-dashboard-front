// Styling
import "./Dashboard.css";

// React components
import { useState, useRef } from "react";

// TV Components
import NameTableau from "./components/nameTableau/NameTableau";
import Localisation from "./components/localisation/Localisation";
import ModuleSelecteur from "./components/modules/ModuleSelecteur";
import ModulesEtiquettes from "./components/modules/ModulesEtiquettes";
import ZoneModules from "./components/zoneModules/ZoneModules";

const Dashboard = ({ API_URL }) => {
  const [territories, setTerritories] = useState([]); // Name of territories selected
  const [selectedModules, setSelectedModules] = useState([]); // Names of selected modules
  const [geographies, setGeographies] = useState([]); // Geographies to be placed
  const [center, setCenter] = useState([46.8, 1.7]); // Center of the map (France)
  const [param, setParam] = useState({ localisation: false, modules: false }); // Parameters
  const refParam = useRef(null);
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
          />
          <ModuleSelecteur
            API_URL={API_URL}
            setSelectedModules={setSelectedModules}
            selectedModules={selectedModules}
            param={param}
            setParam={setParam}
            refParam={refParam}
          />
        </div>
        {/* <hr
          className="sep-line"
          style={{ marginTop: "100px", color: "transparent }}
        /> */}
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
