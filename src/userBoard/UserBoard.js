// -----------------------------------------------------------------------
// -- PAGE PERSONNELLE DE L'UTILISATEUR
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------------
import Header from "../app/components/header/Header";
import Connection from "./components/connection/Connection";
import { useState, useEffect } from "react";

// COMPOSANT ------------------------
const UserBoard = ({ user }) => {
  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

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
