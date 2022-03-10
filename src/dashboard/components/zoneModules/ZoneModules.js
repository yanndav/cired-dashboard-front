import "./ZoneModules.css";
import Module from "./Module.jsx";

import styled from "styled-components";

const ContainerModules = styled.div`
display:flex,
flex-direction:column;
`;

const ZoneModules = ({
  selectedModules,
  geographies,
  center,
  setRefModules,
}) => {
  return (
    <ContainerModules>
      {geographies.groupAnalysis.length === 0 || selectedModules.length === 0
        ? `Sélectionnez ${geographies.length === 0 ? "un territoire" : ""} ${
            geographies.length === 0 && selectedModules.length === 0
              ? "et "
              : ""
          } ${
            selectedModules.length === 0 ? "un module" : ""
          } pour générer votre tableau de bord`
        : selectedModules.map((d) => (
            <Module
              moduleInfo={d}
              geographies={geographies}
              center={center}
              setRefModules={setRefModules}
            />
          ))}
    </ContainerModules>
  );
};

export default ZoneModules;
