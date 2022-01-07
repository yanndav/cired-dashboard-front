// Styling
import "../Localisation.css";

import {
  addTerritoryToAnalysis,
  namingLocation,
} from "../LocalisationFunctions";

const SuggestionsDrop = ({
  suggestions,
  setTerritories,
  setSuggestions,
  setQuery,
  query,
  territories,
  setGeographies,
  API_URL,
  map,
  setRemove,
}) => {
  // Ensemble des suggestions
  return (
    <div className="width-100 flex-row x-overflow pdg-box gradient-border pdg-l-10 mrg-10">
      {query !== "" &&
        suggestions.map((t, i) => {
          return (
            <span
              key={i}
              onClick={(e) =>
                addTerritoryToAnalysis(
                  e,
                  t,
                  territories,
                  setTerritories,
                  setSuggestions,
                  setQuery,
                  suggestions,
                  2021,
                  API_URL,
                  setGeographies
                )
              }
              className="ft-0-8 no-wrap mrg-2 btn-small btn-tv-color hoverCustom-lighter"
            >
              {namingLocation(t, false, territories)}
            </span>
          );
        })}
    </div>
  );
};
export default SuggestionsDrop;
