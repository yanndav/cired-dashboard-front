import "./ModuleSelecteur.css";
import { useState, useEffect } from "react";
import ModulesPanneau from "./ModulesPanneau";

const getModules = async (API_URL) => {
  const response = await fetch(`${API_URL}/getModules`, {
    // body: JSON.stringify({"lat":bounds.lat,"lng":bounds.lng,"zoom":zoom}),
    method: "POST",
    headers: {
      // Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

const ModuleSelecteur = ({ API_URL, setSelectedModules }) => {
  const [showModules, setShowModules] = useState(false);
  const [modulesOptions, setModulesOptions] = useState([]);

  useEffect(async () => {
    const modules_data = await getModules(API_URL);
    setModulesOptions(modules_data);
  }, [showModules]);

  return (
    <>
      {!showModules ? (
        <div
          onClick={() => setShowModules((prev) => !prev)}
          className="module-bouton"
        >
          <div className="icon-module">🎛️</div>
          <div className="legend-module-bouton">Ajouter un module</div>
        </div>
      ) : (
        <ModulesPanneau
          modules={modulesOptions}
          setShowModules={setShowModules}
          setSelectedModules={setSelectedModules}
        />
      )}
    </>
  );
};

export default ModuleSelecteur;
