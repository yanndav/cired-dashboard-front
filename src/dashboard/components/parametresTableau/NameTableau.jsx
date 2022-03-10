// Import du style
// import "./NameTableau.css";
import styled from "styled-components";
import { colorsLight } from "../../../app/colorComponents";
// Import react components
import { useState } from "react";

// Import navigation
import { NavLink } from "react-router-dom";

// Import icons
import { FaCheckSquare } from "react-icons/fa";

// Import own components
import ConnectIcon from "../../../userBoard/components/connectIcon/ConnectIcon.jsx";
import { Logo } from "../../../app/AppStyledComponents";

// const Logo = styled.img`
//   width: 1.7em;
//   margin-right: 10px;
//   transition: 0.1s width, 0.1s margin, 0.1s filter;
//   &:hover {
//     width: 1.9em;
//     margin-right: 7px;
//     filter: drop-shadow(3px 3px 3px rgba(168, 168, 168, 0.801));
//   }
// `;

const ContainerTop = styled.div`
  padding: 20px 30px 0px 30px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContainerNameEdit = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoLink = styled(NavLink)`
  cursor: pointer;
  &:hover {
    img {
      width: 2.3em;
      margin-top: -5px;
      filter: drop-shadow(3px 3px 3px rgba(168, 168, 168, 0.801));
    }
  }
`;

const NameFixed = styled.div`
  font-size: 1.5em;
  color: ${colorsLight.title};
  padding: 0px 10px;
  min-width: 300px;

  &:hover {
    border-radius: 3px;
    border: grey solid 1px;
    font-style: italic;
    padding: 0px 10px;
  }
`;

const NameEditing = styled.input`
  font-size: 1.5em;
  color: ${colorsLight.title};
  padding: 0px 10px;
  min-width: 300px;
  width: ${(props) =>
    props.name.length < 36 ? "300px" : (props.name.length + 1) * 8.5 + "px"};
  border-radius: 3px;
  border: grey solid 1px;
  font-style: italic;
`;

const Valider = styled(FaCheckSquare)`
  fill: ${colorsLight.title};

  margin-left: 10px;
  cursor: pointer;
  transform: scale(1.2);
  &:hover {
    fill: ${colorsLight.title2};
  }
`;

const NameTableau = () => {
  const [edit, setEdit] = useState(false); // Statut d'édition
  const [name, setName] = useState(""); // Nom du tableau

  return (
    <ContainerTop>
      <ContainerNameEdit>
        <LogoLink to="/" exact>
          <Logo size={2} src="logo_comparater.svg" alt="Logo ComparaTer" />
        </LogoLink>
        {!edit ? (
          <NameFixed onClick={() => setEdit(!edit)}>
            {name === "" ? "Tableau sans titre" : name}
          </NameFixed>
        ) : (
          <>
            <NameEditing
              type="text"
              placeholder="Tableau sans titre"
              value={name}
              name={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && setEdit(!edit)}
            ></NameEditing>
            <Valider onClick={() => setEdit(!edit)} />
          </>
        )}
      </ContainerNameEdit>
      <ConnectIcon />
    </ContainerTop>
  );
};

export default NameTableau;
