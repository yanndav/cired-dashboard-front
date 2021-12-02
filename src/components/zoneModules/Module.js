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

const getGeo = async (API_URL, data, setGeo) => {
  const responseGeo = await fetch(`${API_URL}/getLocationsShape`, {
    body: JSON.stringify({
      locations: data.DATA.map((c) => c.CODGEO),
      nivgeo: data.DATA[0].NIVGEO,
      annee: 2021,
    }),
    method: "POST",
    headers: {
      // Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const res = await responseGeo.json();

  setGeo(res);
};

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  //   transform: "translate(-50%, -50%)",
};

const Module = ({ module, geographies, center, API_URL }) => {
  // Téléchargement des données
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(true); // while loading the data
  const [geo, setGeo] = useState(null);

  const graphType = module.REPRESENTATION.TYPE;

  useEffect(() => {
    updateData(
      API_URL,
      geographies.map((c) => {
        return { CODGEO: c.properties.CODGEO[0], NIVGEO: c.properties.TYPE };
      }),
      module.DONNEES.VARIABLE,
      module.DONNEES.NIVGEO,
      setData
    );

    // setData(temp);
  }, [module]);

  useEffect(() => {
    updateData(
      API_URL,
      geographies.map((c) => {
        return { CODGEO: c.properties.CODGEO[0], NIVGEO: c.properties.TYPE };
      }),
      module.DONNEES.VARIABLE,
      module.DONNEES.NIVGEO,
      setData
    );

    // setData(temp);
  }, [geographies]);

  useEffect(() => {
    data && geo && setLoad(false);
    data && getGeo(API_URL, data, setGeo);
  }, [data]);

  useEffect(() => {
    data && geo && setLoad(false);
  }, [geo]);
  return (
    <div className="graph">
      {load ? (
        <div className="spinner">
          <ClipLoader color={"#0AAACB"} style={style} />
        </div>
      ) : (
        graphType === "CARTE" && (
          <Map module={module} data={data} geographies={geo} center={center} />
        )
      )}
    </div>
  );
};

export default Module;
