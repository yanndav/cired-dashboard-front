// Styling
import "../Localisation.css";

import { handleSearch } from "../LocalisationFunctions";
import { MdKeyboardArrowUp } from "react-icons/md";

const SearchBarTerritoires = ({
  query,
  API_URL,
  setSuggestions,
  param,
  setParam,
  setQuery,
}) => {
  /* Search bar strictly speaking */

  return (
    <form
      onSubmit={(e) => handleSearch(e, query, API_URL, setSuggestions)}
      onClick={() => setParam({ localisation: true, modules: false })}
      className="search-form"
    >
      <input
        className="search-value"
        type="input"
        onChange={(dta) => setQuery(dta.target.value)}
        value={query}
        placeholder="🔍️  Cherchez et ajoutez des territoires à votre tableau de bord (nom de commune, code postal..)"
      />
      {!param.localisation && (
        <MdKeyboardArrowUp
          className="hoverCustom mrg-10"
          onClick={() =>
            setParam({
              localisation: true,
              modules: false,
            })
          }
          size={25}
          style={{ transform: `rotate(180deg)` }}
        />
      )}
    </form>
  );
};

export default SearchBarTerritoires;
