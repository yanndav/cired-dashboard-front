// -----------------------------------------------------------------------
// -- FOOTER DU SITE
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------
import React from "react";
import styled from "styled-components";
import { colorsLight } from "../colorComponents";
import { NavLink } from "react-router-dom";
import { StyledLogoEcolo } from "../AppStyledComponents";

import "./Footer.css";

// COMPOSANT ------------------
const Footer = () => {
  return (
    <FooterContainer>
      <ContactButton href="mailto:yann.david@enpc.fr" target="_blank">
        Nous contacter
      </ContactButton>
      <WebsiteLink to="/">
        <StyledLogoEcolo />
        <span>ecolo</span>
        <span className="metrics">metrics</span>
        <span>.fr</span>
      </WebsiteLink>
      <LinkToMentions to="mentions-legales">mentions légales</LinkToMentions>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  row-gap: 50px;
  column-gap: 200px;
  width: calc(100% - 100px);
  padding: 50px;
  flex-wrap: wrap;
`;

const ContactButton = styled.a`
  border: 1px solid black;
  border-radius: 8px;
  padding: 20px;
  font-size: 1.2rem;
  font-weight: 900;
  color: black;
  cursor: pointer;
  text-decoration: none;
  transition: border 0.2s ease-in-out, background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  &:hover {
    background-color: ${colorsLight.backgroundlight};
    border: 1px solid ${colorsLight.background2};
    color: ${colorsLight.background2};
  }
  &:active {
    color: black;
    text-decoration: none;
  }
  &:visited {
    color: black;
    text-decoration: none;
  }
`;

const WebsiteLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .metrics {
    color: ${colorsLight.background2};
  }
`;

// const LogoEcolo = styled(Logo)`
//   width: 50px;
//   height: 50px;
//   padding: 0px;
//   border-radius: 15px;
//   transition: transform 0.5s ease-in-out;
//   transform: scale(1)
//     ${(props) => (props.hoverLogo ? "  translateY(10px)" : "  translateY(5px)")};
//   g {
//     filter: none;
//   }
//   #layer1 {
//     transition: transform 0.5s ease-in-out;
//     transform: ${(props) =>
//       props.hoverLogo && "rotate(-25deg) translate(-550px,210px)"};
//   }
//   #layer3 {
//     transition: transform 0.5s ease-in-out;
//     transform: ${(props) =>
//       props.hoverLogo && "rotate(25deg) translate(240px, -450px)"};
//   }
// `;

const LinkToMentions = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: black;
  align-items: center;
`;
