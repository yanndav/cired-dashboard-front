import React from "react";
import styled from "styled-components";
import { colorsLight } from "../../../app/colorComponents";
import {
  TitreParametre,
  LegendeParametre,
  TitleSection,
} from "./StyledComparaison";

const ContainerPreset = styled.div`
  display: flex;
  flex-direction: row;
  /* flex-wrap: nowrap; */
  overflow-x: scroll;
  flex-shrink: 0;
  gap: 10px;
  margin-bottom: 60px;
  padding-bottom: 10px;
`;

const CarteProposition = styled.div`
  background-color: ${colorsLight.background};
  padding: 15px;
  border-radius: 8px;
  width: 250px;
  min-height: 100px;
  cursor: pointer;
  transition: 0.2s background-color;
  &:hover {
    background-color: ${colorsLight.background2};
    color: white;
    & h3 {
      color: white;
      font-style: normal;
    }
  }
`;

const PropositionPresets = ({ cartes, changeParametre }) => {
  return (
    <>
      <CarteProposition onClick={() => changeParametre("default")}>
        <TitreParametre>
          Créez vos propres critères de comparaison
        </TitreParametre>
      </CarteProposition>
      <TitleSection>
        Personnalisez des critères de comparaison recommandés avec ce module
      </TitleSection>
      <ContainerPreset>
        {cartes.map((carte) => (
          <CarteProposition>
            <TitreParametre>{carte.titre}</TitreParametre>
            <LegendeParametre>{carte.description}</LegendeParametre>
          </CarteProposition>
        ))}
      </ContainerPreset>
    </>
  );
};

export default PropositionPresets;
