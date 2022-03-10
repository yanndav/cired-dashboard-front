import styled from "styled-components";
import { colorsLight } from "../../../app/colorComponents";
import {
  ClosingButton,
  TitreCarteSelection,
  ZoneSelection,
} from "./StyledComparaison";
const Etiquette = styled.div`
  background: ${colorsLight.topBackground};
  padding-right: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const EtiquetteDeModule = ({ d, setSelectedModules, keyI, refModules }) => {
  console.log(refModules);
  return (
    <Etiquette key={keyI}>
      <ZoneSelection
        clickable
        onClick={() =>
          refModules && refModules[d.TITRE].current.scrollIntoView()
        }
      >
        <TitreCarteSelection>{d.TITRE}</TitreCarteSelection>
      </ZoneSelection>

      <ClosingButton
        onClick={() =>
          setSelectedModules((prev) => prev.filter((m) => m.TITRE !== d.TITRE))
        }
      />
    </Etiquette>
  );
};

export default EtiquetteDeModule;
