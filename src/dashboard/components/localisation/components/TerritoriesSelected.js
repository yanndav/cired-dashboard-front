// Styling
import "../Localisation.css";
import { useEffect, useState } from "react";

import { namingLocation } from "../LocalisationFunctions";

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
      className="search-form no-overflow cursor pd-l-10"
      onClick={() => setParam({ localisation: true, modules: false })}
    >
      <div className="x-overflow flx-row flx-nowrap gradient-border">
        📍{" "}
        {titre === "" ? (
          selection.map((t, i) => {
            return (
              <span
                key={i}
                className="ft-0-8 no-wrap btn-small mrg-2 btn-tv-color"
              >
                {namingLocation(t, false, selection)}
              </span>
            );
          })
        ) : (
          <span className="pd-l-10 bolder">{titre}</span>
        )}
      </div>

      <MdKeyboardArrowUp
        className="hoverCustom mrg-10"
        size={25}
        style={{ transform: `rotate(180deg)` }}
      />
    </div>
  );
};
export default TerritoriesSelected;
