// Styling
import "../Localisation.css";
import { useEffect, useState } from "react";

import {
  namingLocation,
  removerTerritoryFromAnalysis,
} from "../LocalisationFunctions";

import { MdKeyboardArrowUp } from "react-icons/md";

const TerritoriesSelected = ({ territories, nomZonage, setParam }) => {
  const [selection, setSelection] = useState(territories);
  const [titre, setTitre] = useState(nomZonage);

  useEffect(() => {
    setSelection(territories);
  }, [territories]);

  useEffect(() => {
    setTitre(nomZonage);
  }, [nomZonage]);

  return (
    <div
      className="search-form barre"
      onClick={() => setParam({ localisation: true, modules: false })}
    >
      <div className="over">
        📍{" "}
        {titre === "" ? (
          selection.map((t, i) => {
            // addShape(t,2021,API_URL,setGeographies,map)
            return (
              <span key={i} className="selected">
                {namingLocation(t, false, selection)}
              </span>
            );
          })
        ) : (
          <p className="zonage">{titre}</p>
        )}
      </div>

      <MdKeyboardArrowUp
        className="arrow-btn"
        //    onClick={()=> setPanelTerritories((panel)=>!panel) }
        size={25}
        style={{ transform: `rotate(180deg)` }}
      />
    </div>
  );
};
export default TerritoriesSelected;
