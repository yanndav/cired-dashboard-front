// -----------------------------------------------------------------------
// -- ICONE DE CONNEXION DU SITE
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------------------
// Styling
import styled from "styled-components";
import { colorsLight } from "../../../app/colorComponents";

import { FaUserCircle } from "react-icons/fa";
import { useHistory } from "react-router";

const IconUser = styled(FaUserCircle)`
  transition: 0.2s height, 0.2s width, 0.2s filter;

  &:hover {
    fill: ${colorsLight.interaction};
    cursor: pointer;
    size: 30px;
    width: 1.2em;
    height: 1.2em;

    filter: drop-shadow(3px 3px 3px rgba(168, 168, 168, 0.801));
  }
`;

// COMPOSANT --------------------------------

const ConnectIcon = () => {
  const history = useHistory();
  return <IconUser onClick={() => history.push("/user-board")} />;
};

export default ConnectIcon;
