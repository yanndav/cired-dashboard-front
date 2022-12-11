import React from "react";
import Header from "../header/Header";
import styled from "styled-components";
import { colorsLight } from "../colorComponents";

const Mentions = () => {
  console.log("Mentions");
  return (
    <>
      <Header sticky={true} showMenu={false} />
      <BodyContainerMention>
        <MentionsContainer>
          <MentionsTitle>Mentions légales</MentionsTitle>
          <MentionsTexte>
            Le site est édité par Yann David, chargé d’études à l’Ecole des
            Ponts Paristech (ENPC) et rattaché au Centre international de
            recherche sur l’environnement et le développement (CIRED). Il assure
            la direction de la publication d’ecolometrics.fr.
          </MentionsTexte>
          <MentionsTexte>
            Ecolometrics.fr est hébergé chez Github pages, un service de la
            société GitHub, 88 Colin P. Kelly Jr. St., San Francisco, CA 94107,
            USA.
          </MentionsTexte>
          <MentionsTexte>
            Votre adresse IP est enregistrée automatiquement sur le serveur
            githubpages. Ces données ne sont jamais transmises à des tiers et
            servent uniquement à diagnostiquer d’éventuels problèmes. Elles sont
            automatiquement supprimées.
          </MentionsTexte>
        </MentionsContainer>
      </BodyContainerMention>
    </>
  );
};

export default Mentions;

const BodyContainerMention = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 250px);
  background-color: ${colorsLight.background};
  align-items: center;
  margin: 0px;
`;

const MentionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  max-width: 1000px;
  padding: 90px;
  gap: 50px;
`;

const MentionsTitle = styled.h1`
  text-align: center;
  margin: 0px;
`;
const MentionsTexte = styled.p`
  margin: 0px;
`;
