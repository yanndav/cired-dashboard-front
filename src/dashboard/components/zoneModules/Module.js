import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import Map from "../graphHolder/graphs/Map";
import LoaderMap from "./LoaderMap";
import "./ZoneModules.css";
import LegendeModule from "./legendeModule/LegendeModule";
import LoaderLegende from "./LoaderLegende";

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
    data["LAYER"] = instru.LAYER;
    results.push(data);
  }
  setData(results);
  setLoad(false);
};

const Module = ({ module, geographies, center, API_URL }) => {
  // Téléchargement des données
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(true); // while loading the data

  const graphType = module.REPRESENTATION.TYPE;
  const aLegende = module.hasOwnProperty("LEGENDES");

  useEffect(() => {
    updateData(
      API_URL,
      geographies.map((c) => {
        return { CODGEO: c.properties.CODGEO, NIVGEO: c.properties.TYPE };
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
        return { CODGEO: c.properties.CODGEO, NIVGEO: c.properties.TYPE };
      }),
      module.DONNEES,
      graphType,
      setData,
      setLoad
    );
  }, [geographies]);

  return (
    <div className className="width-ctt">
      <div className="ft-1-6 ft-tv bold mrg-0 mrg-t-40">{module.NOM}</div>
      <div className="flx-row flx-sb   flx-row-gap-big">
        {aLegende &&
          (load || data === null || data.length == 0 ? (
            <LoaderLegende />
          ) : (
            <LegendeModule module={module} layers={data} />
          ))}
        <div className="graph">
          {graphType === "CARTE" &&
            (load ? (
              <LoaderMap />
            ) : (
              <Map module={module} data={data} center={center} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Module;
