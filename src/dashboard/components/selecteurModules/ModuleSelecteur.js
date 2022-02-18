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

const ModuleSelecteur = ({
  API_URL,
  setSelectedModules,
  selectedModules,
  param,
  setParam,
  refParam,
  useOutsideCloser,
}) => {
  const [modulesOptions, setModulesOptions] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const searchModules = async () => {
      if (param.modules) {
        const modules_data = await getModules(API_URL);
        setModulesOptions(modules_data);
      }
    };
    searchModules();
  }, [param.modules, API_URL]);

  useEffect(() => {
    if (refParam) {
      refParam.current.clientWidth > 750 && setShow(true);
    }
  }, [refParam]);

  return (
    <div
      className={` box  max-95  tr-width ${
        param.modules ? "spacing-large module-select-container" : ""
      }  ${param.localisation ? "spacing-small" : ""} ${
        !param.localisation && !param.modules ? "norm-bouton" : ""
      }`}
    >
      {!param.modules ? (
        <div
          onClick={() => setParam({ localisation: false, modules: true })}
          className="flx-row hoverCustom-lighter btn-big inherit-form flx-nowrap "
        >
          <div className="icon-module">🎛️</div>
          {show && <div className="mrg-l-10">Ajouter un module</div>}
        </div>
      ) : (
        <ModulesPanneau
          modules={modulesOptions}
          setParam={setParam}
          setSelectedModules={setSelectedModules}
          selectedModules={selectedModules}
          useOutsideCloser={useOutsideCloser}
        />
      )}
    </div>
  );
};

export default ModuleSelecteur;
