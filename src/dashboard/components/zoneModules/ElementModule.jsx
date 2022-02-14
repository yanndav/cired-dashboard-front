import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import Map from "../graphHolder/graphs/Map";
import LoaderMap from "./LoaderMap";
import Graph from "../graphHolder/Graph";
import "./ZoneModules.css";
import LegendeModule from "./legendeModule/LegendeModule";
import LoaderLegende from "./LoaderLegende";

const initMeta = async (
  instructions,
  setActivatedFilters,
  API_URL,
  setTerritoiresVar,
  territoires
) => {
  let results = {};
  let terriFin = {};
  for (let instru of instructions) {
    let doc = {
      variable: instru.VARIABLE,
    };
    let response = await fetch(`${API_URL}/getVariableMeta`, {
      body: JSON.stringify(doc),
      method: "POST",
      headers: {
        // Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    let download = await response.json();
    results[instru.VARIABLE] = getFilterActivated(download, instru);

    let response2 = await fetch(`${API_URL}/getTerritoiresVariable`, {
      body: JSON.stringify({
        variable: instru.VARIABLE,
        territoires: territoires,
      }),
      method: "POST",
      headers: {
        // Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    let download2 = await response2.json();
    console.log(download2);
    terriFin[instru.VARIABLE] = download2;
  }

  setActivatedFilters(results);
  setTerritoiresVar(terriFin);
};

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
    let doc = {
      territoires: territoires,
      instructions: instru,
      graphType: graphType,
    };
    let response = await fetch(`${API_URL}/getModuleElement`, {
      body: JSON.stringify(doc),
      method: "POST",
      headers: {
        // Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    let download = await response.json();
    download["LAYER"] = instru.LAYER;
    download["SHOW"] = download["LAYER"] === 1 ? true : false;
    results.push(download);
  }
  setData(results);
};

const getFilterActivated = (layer, instru) => {
  if (layer.hasOwnProperty("FILTRES")) {
    let filter = {};
    if (instru.hasOwnProperty("FILTRES")) {
      for (let elem of instru.FILTRES) {
        for (let key of Object.keys(elem)) {
          if (filter[key] === undefined) {
            filter[key] = [];
          }

          filter[key].push(elem[key]);
        }
      }
    } else {
      const categ = Array.from(new Set(Object.keys(layer.FILTRES).flat()));
      for (let cat of categ) {
        let options = layer.FILTRES[cat].OPTIONS.map((opt) => opt.CODE);
        filter[cat] = options.includes("TOUT") ? ["TOUT"] : [options[0]];
      }
    }
    return filter;
  } else {
    return false;
  }
};

const combinations = (variants) => {
  return (function recurse(keys) {
    if (!keys.length) return [{}];
    let result = recurse(keys.slice(1));
    return variants[keys[0]].reduce(
      (acc, value) =>
        acc.concat(
          result.map((item) => Object.assign({}, item, { [keys[0]]: value }))
        ),
      []
    );
  })(Object.keys(variants));
};

const ElementModule = ({ module, geographies, center, API_URL }) => {
  const [init, setInit] = useState(true);
  // Téléchargement des données
  const [data, setData] = useState(null);
  const [activatedFilters, setActivatedFilters] = useState({});
  const [territoiresVar, setTerritoiresVar] = useState({});
  const [load, setLoad] = useState(false); // while loading the data
  const [instructions, setInstructions] = useState(module.DONNEES);

  const graphType = module.REPRESENTATION.TYPE;
  const aLegende = module.hasOwnProperty("LEGENDES");

  useEffect(() => {
    // INITIALISATION DU MODULE
    setLoad(true);
    // INITIALISATION DES CLASSES DE FILTRES
    initMeta(
      instructions,
      setActivatedFilters,
      API_URL,
      setTerritoiresVar,
      geographies.map((c) => {
        return { CODGEO: c.properties.CODGEO, NIVGEO: c.properties.TYPE };
      })
    );
    // CHARGEMENT DES DONNEES
    updateData(
      API_URL,
      geographies.map((c) => {
        return { CODGEO: c.properties.CODGEO, NIVGEO: c.properties.TYPE };
      }),
      instructions,
      graphType,
      setData,
      setLoad
    );
    setInit(false);
    setLoad(false);
  }, []);

  useEffect(() => {
    // INITIALISATION DU MODULE quand changement de geo
    setLoad(true);
    // INITIALISATION DES CLASSES DE FILTRES
    initMeta(
      instructions,
      setActivatedFilters,
      API_URL,
      setTerritoiresVar,
      geographies.map((c) => {
        return { CODGEO: c.properties.CODGEO, NIVGEO: c.properties.TYPE };
      })
    );
    // CHARGEMENT DES DONNEES
    updateData(
      API_URL,
      geographies.map((c) => {
        return { CODGEO: c.properties.CODGEO, NIVGEO: c.properties.TYPE };
      }),
      instructions,
      graphType,
      setData,
      setLoad
    );
    setInit(false);
    setLoad(false);
  }, [geographies]);

  useEffect(() => {
    // MISE A JOUR DES DONNEES QUAND LE COMPOSANT EST DEJA INITIALISÉ
    if (init === false) {
      updateData(
        API_URL,
        geographies.map((c) => {
          return { CODGEO: c.properties.CODGEO, NIVGEO: c.properties.TYPE };
        }),
        instructions,
        graphType,
        setData
      );
    }
  }, [module, instructions]);

  useEffect(() => {
    // MISE A JOUR DES INSTRUCTIONS UNE FOIS L'INITIALISATION FINIE
    if (init === false && activatedFilters !== false) {
      setInstructions((prev) => {
        let oldInstru = [...prev];
        for (let id in oldInstru) {
          let key = oldInstru[id].VARIABLE;
          if (activatedFilters[key] !== false) {
            let comb = combinations(activatedFilters[key]);
            oldInstru[id]["FILTRES"] = comb;
          }
        }

        return oldInstru;
      });
    }
  }, [activatedFilters]);

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
            (load || data === null || data.length == 0 ? (
              <LoaderMap />
            ) : (
              <Map module={module} data={data} center={center} />
            ))}
          {graphType === "LINECHART" &&
            (load || data === null || data.length == 0 ? (
              <LoaderMap />
            ) : (
              <Graph
                module={module}
                data={data}
                territoiresVar={territoiresVar}
                setTerritoiresVar={setTerritoiresVar}
                setData={setData}
                activatedFilters={activatedFilters}
                setActivatedFilters={setActivatedFilters}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ElementModule;
