import React, { useState } from "react";
import styled from "styled-components";
import { GoQuote } from "react-icons/go";

import ReactMarkdown from "react-markdown";

import {
  ZoneFiltres,
  FiltreButton,
  InfoButton,
  ExternalImg,
  DbImg,
  OutImg,
} from "../../parametresTableau/StyledComparaison";
import { colorsLight } from "../../../../app/colorComponents";

const ModalDefinitionContainer = styled.div`
  position: absolute;
  top: 190px;
  width: 85%;
  height: 450px;
  background-color: white;
  border: 2px solid ${colorsLight.background};
  z-index: 1000;
  border-radius: 8px;
  padding: 20px;
`;

const ZoneTexte = styled.div`display: :flex;;
flex-direction:column;
gap:20px;
overflow-y:auto;
height:400px;
`;

const TitleVariable = styled.h2`
  color: ${colorsLight.title};
  font-size: 1.5em;
  margin-bottom: 40px;
`;

const ChapeauDefinition = styled.div`
  font-size: 1em;
  margin-bottom: 20px;
`;

const BoiteDefinition = styled.div`
  border-radius: 8px;
  background: ${colorsLight.background};
  position: relative;
`;

const Definition = styled(ReactMarkdown)`
  padding: 35px 20px;
  margin: 10px;
  white-space: wrap;
  font-size: 1em;
`;
const Guillemet = styled(GoQuote)`
  position: absolute;
  fill: ${colorsLight.topBackground};
  transform: scale(2) ${(props) => props.bottomRight && "rotate(0.5turn)"};
  top: ${(props) => props.topLeft && "15px"};
  left: ${(props) => props.topLeft && "15px"};
  right: ${(props) => props.bottomRight && "15px"};
  bottom: ${(props) => props.bottomRight && "15px"};
`;

const LienSource = styled.a`
  margin: 20px 0px;
  text-decoration: none;
  padding: 8px;
  border-radius: 8px;
  background: ${colorsLight.background};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  color: black;
  &:hover {
    background: ${colorsLight.topBackground};
  }
`;

const BoutonRetour = styled.div`
  width: fit-content;
  display: flex;
  gap: 10px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  padding: 10px;
  border-radius: 8px;
  color: white;
  background: ${colorsLight.title};
  cursor: pointer;
  &:hover {
    opacity: 80%;
  }
`;

const VariableSliderTopGraph = ({ data, setData }) => {
  const [definition, setDefinition] = useState({});

  return (
    <>
      <ZoneFiltres sliderMode>
        {data.map((layer) => (
          <FiltreButton
            isSelected={layer.SHOW}
            notClickable={data.length === 1}
            couleur={colorsLight.title}
          >
            {layer.LIBELLE}
            <InfoButton
              onClick={() =>
                Object.keys(definition).length === 0
                  ? setDefinition(layer)
                  : setDefinition({})
              }
            />
          </FiltreButton>
        ))}
      </ZoneFiltres>
      {Object.keys(definition).includes("DEFINITION") && (
        <ModalDefinitionContainer>
          <ZoneTexte>
            <TitleVariable> {definition.LIBELLE}</TitleVariable>
            <ChapeauDefinition>
              La définition proposée par l'INSEE est:
            </ChapeauDefinition>
            <BoiteDefinition>
              <Guillemet topLeft />
              <Definition
                children={definition.DEFINITION.replaceAll(
                  /(\s{4})/g,
                  " "
                ).replace(/((?<!^)\s{3})/g, "\n")}
              />
              <Guillemet bottomRight />
            </BoiteDefinition>
            <LienSource href={definition.LIEN} target="_blank">
              <ExternalImg />
              Voir la définition à la source
            </LienSource>
            <ChapeauDefinition>
              Accéder aux données à la source :{" "}
            </ChapeauDefinition>
            {definition.SOURCES.map((source) => (
              <LienSource href={source.LIEN} target="_blank">
                <DbImg />
                {source.NOM} - {source.AUTEUR}, {source.ANNEE[0]}
              </LienSource>
            ))}
          </ZoneTexte>
          <BoutonRetour onClick={() => setDefinition({})}>
            <OutImg />
            Revenir au graph
          </BoutonRetour>
        </ModalDefinitionContainer>
      )}
    </>
  );
};

export default VariableSliderTopGraph;
{
  /* <VariableItemGraph layer={layer} /> */
}
