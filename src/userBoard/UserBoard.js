import React from "react";
import Header from "../app/components/header/Header";
import Connection from "./components/connection/Connection";
import { useState, useEffect } from "react";

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
