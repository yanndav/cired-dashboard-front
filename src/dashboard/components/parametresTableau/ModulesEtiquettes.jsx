import EtiquetteDeModule from "./EtiquetteDeModule";
import styled from "styled-components";

const ContainerEtiquette = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 40px;
`;
const ModulesEtiquettes = ({
  selectedModules,
  setSelectedModules,
  refModules,
}) => {
  return (
    <ContainerEtiquette>
      {selectedModules.map((d, i) => (
        <EtiquetteDeModule
          d={d}
          setSelectedModules={setSelectedModules}
          key={i * 100}
          refModules={refModules}
        />
      ))}
    </ContainerEtiquette>
  );
};

export default ModulesEtiquettes;
