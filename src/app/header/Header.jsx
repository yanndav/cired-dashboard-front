// -----------------------------------------------------------------------
// -- HEADER DU SITE
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------------
// Styling
import styled from "styled-components";
import { colorsLight } from "../colorComponents";
import { Logo } from "../AppStyledComponents";
import { useContext } from "react";
import { AppContext } from "../AppContext";

// Modules
import { NavLink, useLocation } from "react-router-dom";

// COMPOSANT ------------------------
const Header = ({ sticky, showMenu, refInfo, refEquipe }) => {
  // const location = useLocation().pathname;
  const { width } = useContext(AppContext);
  return (
    <HeaderContainer sticky={sticky}>
      <TitreSite to="/">
        <Logo src="logo_comparater.svg" alt="Logo ComparaTer" />
        comparater
      </TitreSite>
      {/* CONNEXION A REACTIVER */}
      {/* <UserBoardLink active={location.includes("/user-board")}>
        <ConnectIcon />
      </UserBoardLink> */}
      {showMenu && width > 800 && (
        <MenuAccueil>
          <LinkToPage
            onClick={() => {
              refInfo.current.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Le projet
          </LinkToPage>
          <LinkToPage
            onClick={() => {
              refEquipe.current.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            L'équipe
          </LinkToPage>
        </MenuAccueil>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  position: ${(props) => props.sticky && "sticky"};
  top: ${(props) => props.sticky && "0px"};
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  z-index: 100;
`;

const TitreSite = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  font-size: 2em;
  color: black;
  align-items: center;

  &:hover {
    color: ${colorsLight.title2};
    img {
      width: 1.8em;
      filter: drop-shadow(3px 3px 3px rgba(168, 168, 168, 0.801));
      margin-top: -5px;
    }
  }
  &:active {
    color: black;
  }
`;

const MenuAccueil = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
`;
const LinkToPage = styled.div`
  color: black;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: ${colorsLight.title2};
  }
`;

const UserBoardLink = styled.div`
  & svg {
    fill: ${(props) => (!props.active ? "#000000" : colorsLight.title)};
  }
`;
export default Header;
