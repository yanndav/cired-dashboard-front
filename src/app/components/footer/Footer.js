// -----------------------------------------------------------------------
// -- FOOTER DU SITE
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------
import React from "react";
import "./Footer.css";

import styled from "styled-components";

const ContainerFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const ContainerLogo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
`;
// COMPOSANT ------------------
const Footer = () => {
  return (
    <ContainerFooter>
      <ContainerLogo>
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
      </ContainerLogo>

      <p>Comparater - Version pré-sortie - CIRED-ENPC 2022</p>
    </ContainerFooter>
  );
};

export default Footer;
