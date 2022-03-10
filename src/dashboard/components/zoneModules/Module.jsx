// External components
import React, { useEffect } from "react";
import Markdown from "marked-react";
import { useState, useRef } from "react";

// Internal components
import ElementModule from "./ElementModule";
import SwitchComparaison from "../parametresTableau/SwitchComparaison";
import ComparaisonContainer from "../parametresTableau/ComparaisonContainer";

import styled from "styled-components";

import {
  TitleSection,
  ParagraphSousTitre,
} from "../parametresTableau/StyledComparaison";
import { colorsLight } from "../../../app/colorComponents";

// Functions
const auteurs = (module) => {
  const nbAut = module.AUTEUR.length;
  let auteurs = "";
  for (let i = 0; i < module.AUTEUR.length; i++) {
    let auteur =
      module.AUTEUR[i].PRENOM + " " + module.AUTEUR[i].NOM.toUpperCase();
    let tr = i === nbAut ? "" : i + 2 === nbAut ? " et " : ", ";

    auteurs = auteurs + auteur + tr;
  }
  return auteurs;
};

const ModuleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuteursContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  /* margin-bottom: 20px; */
`;

const Auteur = styled.div`
  border-radius: 8px;
  padding: 8px;
  background: ${colorsLight.title};
  color: white;
`;

const ModuleElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
`;

const Module = ({ moduleInfo, geographies, center, setRefModules }) => {
  const [comparaison, setComparaison] = useState({
    activate: false,
    open: false,
  });
  const refMod = useRef(null);

  useEffect(() => {
    setRefModules((prev) => ({ ...prev, [moduleInfo.TITRE]: refMod }));
    return () => {
      setRefModules((prev) => ({ ...prev, [moduleInfo.TITRE]: undefined }));
    };
  }, [refMod]);

  return (
    <ModuleContainer ref={refMod}>
      <TitleSection>{moduleInfo.TITRE}</TitleSection>
      <AuteursContainer>
        {moduleInfo.AUTEUR.map((aut) => (
          <Auteur>
            {aut.PRENOM} {aut.NOM}
          </Auteur>
        ))}
      </AuteursContainer>
      <ParagraphSousTitre>
        Mise à jour, {moduleInfo.DATE.toLowerCase()}
      </ParagraphSousTitre>
      <SwitchComparaison
        comparaison={comparaison}
        setComparaison={setComparaison}
      />
      {comparaison.open && (
        <ComparaisonContainer
          setComparaison={setComparaison}
          titre={moduleInfo.TITRE}
        />
      )}

      <Markdown className="description " value={moduleInfo.DESCRIPTION} />
      <ModuleElementsContainer>
        {moduleInfo.INSTRUCTIONS.map((instruction) => (
          <ElementModule
            instruction={instruction}
            geographies={geographies}
            center={center}
          />
        ))}
      </ModuleElementsContainer>
    </ModuleContainer>
  );
};

export default Module;
