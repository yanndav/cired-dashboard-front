import { useEffect, useState } from "react";

import Map from "../graphHolder/graphs/Map";
import "./ZoneModules.css";

const updateData = async (API_URL, territoires, variable, nivgeo, setData) => {
  const response = await fetch(`${API_URL}/getModuleElement`, {
    body: JSON.stringify({
      territoires: territoires,
      variable: variable,
      nivgeo: nivgeo,
    }),
    method: "POST",
    headers: {
      // Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(territoires);

  console.log(variable);

  console.log(data);
  setData(data);
};

const Module = ({ module, zone, geographies, center, API_URL }) => {
  // Téléchargement des données
  const [data, setData] = useState(null);
  const graphType = module.REPRESENTATION.TYPE;

  useEffect(() => {
    console.log(module.DONNEES.NIVGEO);
    updateData(
      API_URL,
      zone.map((c) => c.CODGEO[0]),
      module.DONNEES.VARIABLE,
      module.DONNEES.NIVGEO,
      setData
    );

    // setData(temp);
  }, [module]);

  return (
    <div className="graph">
      {graphType === "CARTE" && (
        <Map
          module={module}
          data={data}
          geographies={geographies}
          center={center}
        />
      )}
    </div>
  );
};

export default Module;
