import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

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

  setData(data);
};

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  //   transform: "translate(-50%, -50%)",
};

const Module = ({ module, zone, geographies, center, API_URL }) => {
  // Téléchargement des données
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(true); // while loading the data

  const graphType = module.REPRESENTATION.TYPE;

  useEffect(() => {
    updateData(
      API_URL,
      zone.map((c) => c.CODGEO[0]),
      module.DONNEES.VARIABLE,
      module.DONNEES.NIVGEO,
      setData
    );

    // setData(temp);
  }, [module]);

  useEffect(() => {
    updateData(
      API_URL,
      zone.map((c) => c.CODGEO[0]),
      module.DONNEES.VARIABLE,
      module.DONNEES.NIVGEO,
      setData
    );

    // setData(temp);
  }, [geographies]);

  useEffect(() => {
    data && setLoad(false);
  }, [data]);

  return (
    <div className="graph">
      {load ? (
        <div className="spinner">
          <ClipLoader color={"#0AAACB"} style={style} />
        </div>
      ) : (
        graphType === "CARTE" && (
          <Map
            module={module}
            data={data}
            geographies={geographies}
            center={center}
          />
        )
      )}
    </div>
  );
};

export default Module;
