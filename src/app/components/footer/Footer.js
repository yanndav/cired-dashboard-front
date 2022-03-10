// -----------------------------------------------------------------------
// -- FOOTER DU SITE
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------
import React from "react";
import "./Footer.css";

// COMPOSANT ------------------
const Footer = () => {
  return (
    <div className="footer-container">
      <a
        className="footer-logo"
        href="https://www.centre-cired.fr/"
        target="_blank"
        rel="noreferrer"
      >
        <img src="logo-cired.jpeg" alt="CIRED" width="55px" />
      </a>
      <a
        className="footer-logo"
        href="https://www.ecoledesponts.fr/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="footer-logo"
          src="logo-enpc.png"
          alt="ENPC"
          width="40px"
        />
      </a>

      <p>Comparater - Version Alpha 3 - Comparo - CIRED-ENPC 2022</p>
    </div>
  );
};

export default Footer;
