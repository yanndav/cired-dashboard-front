// Styling
import "./Localisation.css";

// React modules
import { useState, useEffect, useRef, useContext } from "react";

// Import map function
import { AppContext } from "../../../app/AppContext";

import TerritoriesSelected from "./components/TerritoriesSelected";
import SearchBarTerritoires from "./components/SearchBarTerritoires";
import SuggestionsDrop from "./components/SuggestionsDrop";
import NomZonage from "./components/NomZonage";
import ListeTerritoiresSelectionnes from "./components/ListeTerritoiresSelectionnes";
import LocalisationMap from "./components/LocalisationMap";
// Icons
import { MdKeyboardArrowUp } from "react-icons/md";

// Import fonctions
import {
  apiRecommendation,
  removerTerritoryFromAnalysis,
} from "./LocalisationFunctions";

const Localisation = ({
  territories,
  setTerritories,
  geographies,
  setGeographies,
  center,
  setCenter,
  param,
  setParam,
  useOutsideCloser,
}) => {
  // State variables
  const [query, setQuery] = useState(""); // La recherche de l'utilisateur
  const [suggestions, setSuggestions] = useState([]); //suggestions de villes
  const [nomZonage, setNomZonage] = useState(""); //Nom du zonage
  const [editZonage, setEditZonage] = useState(false); //ouvre/ferme edition zonage
  const [remove, setRemove] = useState([]); //geo to remove
  const [map, setMap] = useState(null); // map reference
  const refLoc = useRef(null);
  const { API_URL } = useContext(AppContext);

  // Effects
  // Lance les recherches de territoires
  useEffect(() => {
    // recherche tous les deux charactères
    if ((query.length % 2 === 0) & (query !== "")) {
      apiRecommendation(query, API_URL, setSuggestions);
    }
  }, [query, API_URL]);

  useEffect(() => {
    if ((remove.length > 0) & map) {
      removerTerritoryFromAnalysis(
        null,
        remove[0],
        setTerritories,
        territories,
        geographies,
        setGeographies,
        map
      );
      setRemove([]);
    }
  }, [remove, geographies, map, setGeographies, setTerritories, territories]);

  useOutsideCloser(refLoc, "localisation");

  return (
    <div
      ref={refLoc}
      className={`box module-localisation ${
        param.localisation ? "spacing-large" : ""
      }  ${param.modules ? "spacing-small" : ""} ${
        !param.modules && !param.localisation ? "localisation-norm" : ""
      }`}
    >
      {territories.length > 0 && !param.localisation ? (
        <TerritoriesSelected
          territories={territories}
          nomZonage={nomZonage}
          setParam={setParam}
        />
      ) : (
        <SearchBarTerritoires
          query={query}
          API_URL={API_URL}
          setSuggestions={setSuggestions}
          param={param}
          setParam={setParam}
          setQuery={setQuery}
        />
      )}

      {/* Ouverture de la boîte de paramètres territoriaux */}
      {param.localisation && <hr className="separation" />}

      {/* Drop down of suggestions */}
      {suggestions.length > 0 && param.localisation && (
        <SuggestionsDrop
          suggestions={suggestions}
          setTerritories={setTerritories}
          setSuggestions={setSuggestions}
          setQuery={setQuery}
          query={query}
          territories={territories}
          setGeographies={setGeographies}
          API_URL={API_URL}
          map={map}
          setRemove={setRemove}
        />
      )}

      {param.localisation && (
        <>
          <div className="mrg-20 flx-column">
            {/* Nommer le découpage territorial */}
            {territories.length > 1 && (
              <NomZonage
                editZonage={editZonage}
                setEditZonage={setEditZonage}
                nomZonage={nomZonage}
                setNomZonage={setNomZonage}
              />
            )}

            {/* Liste des territoires sélectionnés */}
            <p className="bolder">
              📍 Territoires sélectionnés{" "}
              {territories.length > 0 && (
                <span className="btn-tv-color btn-tiny">
                  {territories.length}
                </span>
              )}
              :
            </p>
            <div className="flx-col">
              <ListeTerritoiresSelectionnes
                territories={territories}
                setTerritories={setTerritories}
                setGeographies={setGeographies}
              />

              <LocalisationMap
                geographies={geographies}
                setMap={setMap}
                map={map}
                API_URL={API_URL}
                setTerritories={setTerritories}
                setGeographies={setGeographies}
                territories={territories}
                center={center}
                setCenter={setCenter}
              />
            </div>
          </div>
          <MdKeyboardArrowUp
            className="hoverCustom mrg-10 flt-r "
            onClick={() =>
              setParam({ ...param, localisation: !param.localisation })
            }
            size={25}
          />
        </>
      )}
    </div>
  );
};

export default Localisation;
