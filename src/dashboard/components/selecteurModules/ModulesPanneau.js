import React from "react";
import { useState, useEffect, useRef } from "react";
import "./ModuleSelecteur.css";

import { MdKeyboardArrowUp } from "react-icons/md";

const auteurs = (auteurs) => {
  return (
    <p className="italic ft-0-8">
      par
      {" " + auteurs.map((d) => d.PRENOM + " " + d.NOM)}
    </p>
  );
};

const ModulesPanneau = ({
  modules,
  setParam,
  setSelectedModules,
  selectedModules,
  useOutsideCloser,
}) => {
  const [theme, setTheme] = useState("");
  const themes = [...new Set(modules.map((d) => d.THEME.map((c) => c)).flat())];
  const [modulesTheme, setModulesTheme] = useState([]);
  const [module, setModule] = useState(null);

  const refMod = useRef(null);

  useEffect(() => {
    const list = modules.filter((d) => d.THEME.includes(theme));
    setModulesTheme(list);
  }, [theme]);

  useOutsideCloser(refMod, "modules");
  return (
    <div ref={refMod}>
      <div className="flx-row width-100 mrg-l-30 mrg-t-20 min-h-450p ">
        <div className="flx-col mrg-t-20">
          <span className="bolder mrg-tb-20">THÈMES</span>
          <div className="flx-col y-overflow flx-gap-small btn-big max-h-350p">
            {themes.map((d, i) => (
              <span
                key={i}
                className="flx-row hoverCustom-lighter box btn-big  flx-nowrap mrg-tb-20"
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
        </div>
        {theme !== "" && <div className="vl"></div>}
        {theme !== "" && (
          <div className="flx-col mrg-t-20">
            <span className="bolder mrg-tb-20">MODULES</span>
            <div className="flx-col y-overflow flx-gap-small btn-big max-h-350p">
              {modulesTheme.map((d, i) => (
                <span
                  key={i}
                  style={{
                    color:
                      module !== null && d.TITRE === module.TITRE && "white",
                    backgroundColor:
                      module !== null && d.TITRE === module.TITRE && "#0AAACB",
                  }}
                  className="flx-row hoverCustom-lighter box btn-big  flx-nowrap mrg-tb-20"
                  onClick={() => setModule(d)}
                >
                  {d.TITRE}
                </span>
              ))}
            </div>
          </div>
        )}
        {module !== null && (
          <div className="module-description h-400p">
            <p className="bolder">{module.TITRE}</p>
            {auteurs(module.AUTEUR)}
            <p className="ft-0-8 y-overflow max-h-200p h-200p">
              {module.DESCRIPTION}
            </p>
            {selectedModules.map((c) => c.TITRE).includes(module.TITRE) ? (
              <p className="select-module valid-color">
                Module déjà sélectionné
              </p>
            ) : (
              <p
                onClick={() => setSelectedModules((prev) => [...prev, module])}
                className="hoverCustom-white select-module"
              >
                Ajouter le module
              </p>
            )}
          </div>
        )}
      </div>
      <MdKeyboardArrowUp
        className="hoverCustom mrg-10 flt-r"
        onClick={() => setParam({ localisation: false, modules: false })}
        size={25}
        //    style={{transform:`rotate(180deg)`}}
      />
    </div>
  );
};

export default ModulesPanneau;
