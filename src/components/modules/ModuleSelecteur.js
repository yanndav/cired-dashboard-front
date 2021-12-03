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

const ModuleSelecteur = ({ API_URL, setSelectedModules, param, setParam }) => {
  const [modulesOptions, setModulesOptions] = useState([]);

  useEffect(async () => {
    if (param.modules) {
      const modules_data = await getModules(API_URL);
      setModulesOptions(modules_data);
    }
  }, [param.modules]);

  return (
    <div
      className={` box btn-big tr-width ${
        param.modules ? "spacing-large" : ""
      }  ${param.localisation ? "spacing-small" : ""} ${
        !param.localisation && !param.modules ? "norm-bouton" : ""
      }`}
    >
      {!param.modules ? (
        <div
          onClick={() => setParam({ localisation: false, modules: true })}
          className="module-bouton"
        >
          <div className="icon-module">🎛️</div>
          <div className="legend-module-bouton">Ajouter un module</div>
        </div>
      ) : (
        <ModulesPanneau
          modules={modulesOptions}
          setParam={setParam}
          setSelectedModules={setSelectedModules}
        />
      )}
    </div>
  );
};

export default ModuleSelecteur;
