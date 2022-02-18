// Import du style
import "./NameTableau.css";
import styled from "styled-components";

// Import react components
import { useState } from "react";

// Import navigation
import { NavLink } from "react-router-dom";

// Import icons
import { GoCheck } from "react-icons/go";

// Import own components
import ConnectIcon from "../../../userBoard/components/connectIcon/ConnectIcon.jsx";

const Logo = styled.img`
  width: 1.7em;
  margin-right: 10px;
  transition: 0.1s width, 0.1s margin, 0.1s filter;
  &:hover {
    width: 1.9em;
    margin-right: 7px;
    filter: drop-shadow(3px 3px 3px rgba(168, 168, 168, 0.801));
  }
`;

const NameTableau = () => {
  const [edit, setEdit] = useState(false); // Statut d'édition
  const [name, setName] = useState(""); // Nom du tableau

  return (
    <div className="tableau-container">
      <div className="flx-row container-name ">
        <NavLink to="/" exact>
          <Logo src="logo_comparater.svg" alt="Logo ComparaTer" />
        </NavLink>
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
      {/* <hr className="sep-line" /> */}
    </div>
  );
};

export default NameTableau;
