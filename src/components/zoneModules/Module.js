import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import Map from "../graphHolder/graphs/Map";
import "./ZoneModules.css";

const updateData = async (
  API_URL,
  territoires,
  instructions,
  graphType,
  setData,
  setLoad
) => {
  setData([]);
  let results = [];

  for (let instru of instructions) {
    const doc = {
      territoires: territoires,
      instructions: instru,
      graphType: graphType,
    };
    console.log(doc);
    const response = await fetch(`${API_URL}/getModuleElement`, {
      body: JSON.stringify(doc),
      method: "POST",
      headers: {
        // Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    results.push(data);
    // console.log(results);
  }
  setData(results);
  setLoad(false);
};

// const getGeo = async (API_URL, data, setGeo) => {
//   const responseGeo = await fetch(`${API_URL}/getLocationsShape`, {
//     body: JSON.stringify({
//       locations: data.DATA.map((c) => c.CODGEO),
//       nivgeo: data.DATA[0].NIVGEO,
//       annee: 2021,
//     }),
//     method: "POST",
//     headers: {
//       // Authorization: bearer,
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });

//   const res = await responseGeo.json();

//   setGeo(res);
// };

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
  // const [geo, setGeo] = useState(null);

  const graphType = module.REPRESENTATION.TYPE;

  useEffect(() => {
    updateData(
      API_URL,
      geographies.map((c) => {
        return { CODGEO: c.properties.CODGEO[0], NIVGEO: c.properties.TYPE };
      }),
      module.DONNEES,
      graphType,
      setData,
      setLoad
    );
  }, [module]);

  useEffect(() => {
    updateData(
      API_URL,
      geographies.map((c) => {
        return { CODGEO: c.properties.CODGEO[0], NIVGEO: c.properties.TYPE };
      }),
      module.DONNEES,
      graphType,
      setData,
      setLoad
    );
  }, [geographies]);

  return (
    <div className="graph">
      {load ? (
        <div className="spinner">
          <ClipLoader color={"#0AAACB"} style={style} />
        </div>
      ) : (
        graphType === "CARTE" && (
          <Map module={module} data={data} center={center} />
        )
      )}
    </div>
  );
};

export default Module;
