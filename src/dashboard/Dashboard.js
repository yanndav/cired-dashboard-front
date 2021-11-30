// Styling
import "./Dashboard.css";

// React components
import { useState, useEffect } from "react";

// Components
import NameTableau from "../components/nameTableau/NameTableau";
import Localisation from "../components/localisation/Localisation";
// import GraphsHolder from "../components/graphHolder/GraphsHolder";
// import Legend from "../components/legend/Legend";
// import VariablesPicker from "../components/variablesPicker/VariablesPicker";
import ModuleSelecteur from "../components/modules/ModuleSelecteur";
import ModulesEtiquettes from "../components/modules/ModulesEtiquettes";
import ZoneModules from "../components/zoneModules/ZoneModules";
// Modules

const updateData = async (API_URL, territories, selectedVariables, setData) => {
  const response = await fetch(`${API_URL}/getData`, {
    body: JSON.stringify({
      locations: territories.map((t) => t.CODGEO[0]),
      variables: selectedVariables.map((vari) => {
        return { base: vari.BASE, variable: vari.VARIABLE };
      }),
    }),
    method: "POST",
    headers: {
      // Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  setData(res);
  console.log(res);
};

const Dashboard = ({ API_URL }) => {
  const [territories, setTerritories] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [geographies, setGeographies] = useState([]); // Geographies to be placed
  const [center, setCenter] = useState([46.8, 1.7]);

  return (
    <>
      <NameTableau />
      <div className="parameter-box">
        <Localisation
          API_URL={API_URL}
          territories={territories}
          setTerritories={setTerritories}
          geographies={geographies}
          setGeographies={setGeographies}
          center={center}
          setCenter={setCenter}
        />
        <div className="modules-container">
          <ModuleSelecteur
            API_URL={API_URL}
            setSelectedModules={setSelectedModules}
          />
          <ModulesEtiquettes
            selectedModules={selectedModules}
            setSelectedModules={setSelectedModules}
          />
        </div>
      </div>
      <ZoneModules
        territories={territories}
        selectedModules={selectedModules}
        geographies={geographies}
        center={center}
        API_URL={API_URL}
      />
    </>
  );
};

export default Dashboard;
