// Styling
import "../Localisation.css";

import { FaSave } from "react-icons/fa";

const NomZonage = ({ editZonage, setEditZonage, nomZonage, setNomZonage }) => {
  {
    /* Nommer le découpage territorial */
  }
  return (
    <div className="btn-tv-bg-color pdg-box width-ctt">
      {!editZonage ? (
        <div onClick={() => setEditZonage(true)} className="hoverItalic">
          {nomZonage == "" ? "Nommer et sauvegarder ce zonage" : nomZonage}
        </div>
      ) : (
        <form
          onSubmit={() => setEditZonage(false)}
          className="flx-row flx-center"
        >
          <input
            type="text"
            className="italic inherit-all"
            style={{
              width:
                nomZonage.length < 36
                  ? "260px"
                  : (nomZonage.length + 1) * 8.5 + "px",
            }}
            placeholder="Nommer et sauvegarder ce zonage"
            value={nomZonage}
            onChange={(e) => setNomZonage(e.target.value)}
          ></input>
          <FaSave
            className="hoverCustom"
            size={15}
            onClick={() => setEditZonage(false)}
          />
        </form>
      )}
    </div>
  );
};

export default NomZonage;
