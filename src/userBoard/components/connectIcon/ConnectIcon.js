// -----------------------------------------------------------------------
// -- ICONE DE CONNEXION DU SITE
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------------------
// Styling
import "./ConnectIcon.css";

import { FaUserCircle } from "react-icons/fa";
import { useHistory } from "react-router";

// COMPOSANT --------------------------------

const ConnectIcon = () => {
  const history = useHistory();
  return (
    <FaUserCircle
      className="con-icon"
      size={20}
      onClick={() => history.push("/user-board")}
    />
  );
};

export default ConnectIcon;
