// -----------------------------------------------------------------------
// -- HEADER DU SITE
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------------
// Styling
import { useState } from "react";
import styled from "styled-components";
import { colorsLight } from "../colorComponents";
import { StyledLogoEcolo } from "../AppStyledComponents";
import { useContext } from "react";
import { AppContext } from "../AppContext";
// Modules
import { NavLink } from "react-router-dom";
// import ConnectIcon from "../../userBoard/components/connectIcon/ConnectIcon.jsx";

// COMPOSANT ------------------------
const Header = ({ sticky, small, showMenu, refInfo, refMarche }) => {
  // const location = useLocation().pathname;
  const { width } = useContext(AppContext);
  const [hoverLogo, setHoverLogo] = useState(false);

  return (
    <HeaderContainer sticky={sticky}>
      <TitreSite
        to="/"
        small={small}
        onMouseEnter={() => setHoverLogo(true)}
        onMouseLeave={() => setHoverLogo(false)}
        hover={hoverLogo}
      >
        <StyledLogoEcolo hoverLogo={hoverLogo} />
        <span>
          ecolo<span id="metrics">metrics</span>
        </span>
      </TitreSite>
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
  z-index: 10000000;
`;

const TitreSite = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  font-size: ${(props) => (props.small ? "1em" : "2em")};
  color: black;
  align-items: center;
  span {
    transition: transform 0.5s ease;
    transform: ${(props) =>
      props.hover ? "scale(1.1) translateX(10px)" : "scale(1)"};
  }
  #metrics {
    transition: color 0.5s ease;
    color: ${(props) => props.hover && colorsLight.metrics};
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
    color: ${colorsLight.background2};
  }
`;

// const UserBoardLink = styled.div`
//   & svg {
//     fill: ${(props) => (!props.active ? "#000000" : colorsLight.title)};
//   }
// `;
export default Header;
