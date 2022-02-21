// -----------------------------------------------------------------------
// -- PAGE PERSONNELLE DE L'UTILISATEUR
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------------
import Header from "../app/components/header/Header.jsx";
import Connection from "./components/connection/Connection";
import { useContext, useEffect } from "react";
import { AppContext } from "../app/AppContext.jsx";

// COMPOSANT ------------------------
const UserBoard = () => {
  const { user, setUser } = useContext(AppContext);

  return (
    <>
      <Header />
      {user.connected ? (
        <div>User infos</div>
      ) : (
        <div style={{ margin: "auto", marginTop: "100px" }}>
          <Connection />
        </div>
      )}
    </>
  );
};

export default UserBoard;
