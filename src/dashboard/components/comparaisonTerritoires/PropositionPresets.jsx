import React from "react";
import styled from "styled-components";
import { colorsLight } from "../../../app/colorComponents";
import { TitreParametre, LegendeParametre } from "./StyledComparaison";

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
  border-radius: 8px;
  padding: 20px;
  min-width: 350px;
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

const PropositionPresets = ({ cartes }) => {
  return (
    <ContainerPreset>
      {cartes.map((carte) => (
        <CarteProposition>
          <TitreParametre>{carte.titre}</TitreParametre>
          <LegendeParametre>{carte.description}</LegendeParametre>
        </CarteProposition>
      ))}
    </ContainerPreset>
  );
};

export default PropositionPresets;
