import React from "react";
import { useState, useEffect } from "react";
import "./ModuleSelecteur.css";

import { MdKeyboardArrowUp } from "react-icons/md";

const auteurs = (auteurs) => {
  return (
    <p className="auteurs">
      par
      {" " + auteurs.map((d) => d.PRENOM + " " + d.NOM)}
    </p>
  );
};

const ModulesPanneau = ({ modules, setShowModules, setSelectedModules }) => {
  const [theme, setTheme] = useState("");
  const themes = [...new Set(modules.map((d) => d.THEME.map((c) => c)).flat())];
  const [modulesTheme, setModulesTheme] = useState([]);
  const [module, setModule] = useState(null);

  useEffect(() => {
    const list = modules.filter((d) => d.THEME.includes(theme));
    setModulesTheme(list);
  }, [theme]);

  return (
    <div className="module-select-container">
      <div className="selection">
        <div className="theme">
          <span className="titre">THÈMES</span>
          {themes.map((d, i) => (
            <span
              key={i}
              className="module-bouton"
              style={{
                color: d === theme && "white",
                backgroundColor: d === theme && "#0AAACB",
              }}
              onClick={() => setTheme(d)}
            >
              {d}
            </span>
          ))}
        </div>
        {theme !== "" && <div class="vl"></div>}
        {theme !== "" && (
          <div className="modules">
            <span className="titre">MODULES</span>
            {modulesTheme.map((d, i) => (
              <span
                key={i}
                style={{
                  color: module !== null && d.TITRE === module.TITRE && "white",
                  backgroundColor:
                    module !== null && d.TITRE === module.TITRE && "#0AAACB",
                }}
                className="module-bouton"
                onClick={() => setModule(d)}
              >
                {d.TITRE}
              </span>
            ))}
          </div>
        )}
        {module !== null && (
          <div className="module-description">
            <p className="titre">{module.TITRE}</p>
            {auteurs(module.AUTEUR)}
            <p className="description">{module.DESCRIPTION}</p>
            <p
              onClick={() => setSelectedModules((prev) => [...prev, module])}
              class="select-module"
            >
              Ajouter le module
            </p>
          </div>
        )}
      </div>
      <MdKeyboardArrowUp
        className="arrow-btn mrgRg"
        onClick={() => setShowModules((panel) => !panel)}
        size={25}
        //    style={{transform:`rotate(180deg)`}}
      />
    </div>
  );
};

export default ModulesPanneau;
