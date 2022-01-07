// Styling
import "../Localisation.css";

//Icons
import { TiDelete } from "react-icons/ti";

// Import hooks
import { useState, useEffect } from "react";

// Functions
import {
  namingLocation,
  removerTerritoryFromAnalysis,
} from "../LocalisationFunctions";

const ListeTerritoiresSelectionnes = ({
  territories,
  setTerritories,
  setGeographies,
}) => {
  const [selection, setSelection] = useState(territories);
  useEffect(() => {
    setSelection(territories);
  }, [territories]);
  return (
    <div className="flx-row flx-left y-overflow territoires-container mrg-b-20">
      {selection.length > 0
        ? selection.map((t, i) => {
            // addShape(t,2021,API_URL,setGeographies,map)
            return (
              <span
                key={i}
                className="ft-0-8 no-wrap mrg-2 btn-small btn-tv-color"
              >
                {namingLocation(t, true, selection)}
                <TiDelete
                  className="hover-darker"
                  onClick={(e) =>
                    removerTerritoryFromAnalysis(
                      e,
                      t,
                      setTerritories,
                      setGeographies
                    )
                  }
                />
              </span>
            );
          })
        : "Ajoutez un territoire à votre périmètre"}
    </div>
  );
};
export default ListeTerritoiresSelectionnes;
