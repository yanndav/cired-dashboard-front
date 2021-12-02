// Import du style
import "./NameTableau.css";

// Import react components
import { useState } from "react";

// Import navigation
import { NavLink } from "react-router-dom";

// Import icons
import { GoCheck } from "react-icons/go";

// Import own components
import ConnectIcon from "../../userBoard/components/connectIcon/ConnectIcon";

const NameTableau = () => {
  const [edit, setEdit] = useState(false); // Statut d'édition
  const [name, setName] = useState(""); // Nom du tableau

  return (
    <div>
      <div className="flx-row container-name ">
        <div className="logo-link">
          <NavLink to="/" exact>
            <img
              className="logo-min"
              src="Transitions ViewerLogo-TV.svg"
              alt="Transitions"
              width="30em"
            />
          </NavLink>
        </div>
        {!edit ? (
          <div className="name-solid" onClick={() => setEdit(!edit)}>
            {name === "" ? "Tableau sans titre" : name}
          </div>
        ) : (
          <form onSubmit={() => setEdit(!edit)}>
            <input
              type="text"
              className="name-edit"
              style={{
                width:
                  name.length < 36 ? "300px" : (name.length + 1) * 8.5 + "px",
              }}
              placeholder="Tableau sans titre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <GoCheck
              className="hoverCustom"
              size={20}
              onClick={() => setEdit(!edit)}
            />
          </form>
        )}
      </div>
      <div className="top-log">
        <ConnectIcon />
      </div>
      <hr className="sep-line" />
    </div>
  );
};

export default NameTableau;
