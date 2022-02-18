// -----------------------------------------------------------------------
// -- HEADER DU SITE
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------------
// Styling
import styled from "styled-components";
import { colorsLight } from "../../colorComponents";

// Modules
import { NavLink, useLocation } from "react-router-dom";
import ConnectIcon from "../../../userBoard/components/connectIcon/ConnectIcon.jsx";

const HeaderContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitreSite = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  font-size: 2.2em;
  color: ${colorsLight.title};

  &:hover {
    color: ${colorsLight.interaction};
    img {
      width: 1.2em;
      margin-top: -5px;
      filter: drop-shadow(3px 3px 3px rgba(168, 168, 168, 0.801));
    }
  }
`;

const Logo = styled.img`
  width: 1em;
  margin-right: 10px;
  transition: 0.1s width, 0.1s margin, 0.1s filter;
`;

const UserBoardLink = styled.div`
  & svg {
    fill: ${(props) => (!props.active ? "#000000" : colorsLight.title)};
  }
`;

// COMPOSANT ------------------------
const Header = () => {
  const location = useLocation().pathname;

  return (
    <HeaderContainer>
      <TitreSite to="/">
        <Logo src="logo_comparater.svg" alt="Logo ComparaTer" />
        ComparaTer
      </TitreSite>
      <UserBoardLink active={location.includes("/user-board")}>
        <ConnectIcon />
      </UserBoardLink>
    </HeaderContainer>
  );
};

export default Header;
