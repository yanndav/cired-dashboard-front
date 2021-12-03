// Styling
import "./Dashboard.css";

// React components
import { useState } from "react";

// TV Components
import NameTableau from "../components/nameTableau/NameTableau";
import Localisation from "../components/localisation/Localisation";
import ModuleSelecteur from "../components/modules/ModuleSelecteur";
import ModulesEtiquettes from "../components/modules/ModulesEtiquettes";
import ZoneModules from "../components/zoneModules/ZoneModules";

const Dashboard = ({ API_URL }) => {
  const [territories, setTerritories] = useState([]); // Name of territories selected
  const [selectedModules, setSelectedModules] = useState([]); // Names of selected modules
  const [geographies, setGeographies] = useState([]); // Geographies to be placed
  const [center, setCenter] = useState([46.8, 1.7]); // Center of the map (France)
  const [param, setParam] = useState({ localisation: false, modules: false });
  return (
    <div className="tableau-container">
      <NameTableau />
      <div className="flx-row flx-gap-small pos-abs">
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
        <div>
          <ModuleSelecteur
            API_URL={API_URL}
            setSelectedModules={setSelectedModules}
            param={param}
            setParam={setParam}
          />
        </div>
      </div>
      <div className="modules-container">
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
  );
};

export default Dashboard;
