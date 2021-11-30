import "./ZoneModules.css";

import Module from "./Module";

import { useState, useEffect } from "react";

const ZoneModules = ({
  territories,
  selectedModules,
  geographies,
  center,
  API_URL,
}) => {
  const [zone, setZone] = useState(territories);
  const [modules, setModules] = useState(selectedModules);

  useEffect(() => {
    setZone(territories);
  }, [territories]);

  useEffect(() => {
    setModules(selectedModules);
  }, [selectedModules]);

  return (
    <div className="zone-modules">
      {zone.length === 0 || modules.length == 0
        ? `Sélectionnez ${zone.length == 0 ? "un territoire" : ""} ${
            zone.length === 0 && modules.length == 0 ? "et " : ""
          } ${
            modules.length == 0 ? "un module" : ""
          } pour générer votre tableau de bord`
        : modules.map((d) =>
            d.INSTRUCTIONS.map((c) => (
              <Module
                module={c}
                zone={zone}
                geographies={geographies}
                center={center}
                API_URL={API_URL}
              />
            ))
          )}
    </div>
  );
};

export default ZoneModules;
