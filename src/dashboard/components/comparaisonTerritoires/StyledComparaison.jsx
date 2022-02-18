import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { colorsLight } from "../../../app/colorComponents";
import { BsFillGearFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
const Back = styled.div`
  background: #f3f2f26f;
  position: fixed;
  /* filter: blur(10px) */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10000;
`;
const ModalBox = styled.div`
  position: relative;
  width: 1000px;
  max-width: 90%;
  max-height: 90%;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0%);
  margin-left: ${(props) => props.width + "px"};
  padding: 30px;
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 1px 7px rgba(168, 168, 168, 0.438);
  border-radius: 8px;
  overflow-y: auto;
`;

const HeaderModal = styled.div`
  margin-top: 10px;

  display: grid;
  grid-template-columns: 95% auto;
`;

const TitleModal = styled.div`
  font-size: 1.6em;
  font-weight: bolder;
  margin: 10px 0px;
  color: ${colorsLight.title};
`;
const TitleSection = styled.div`
  font-size: 1.4em;
  margin: 20px 0px;
`;
const ParagraphSousTitre = styled.p`
  margin-top: 10px;
  margin-bottom: 50px;
  color: #252525;
  font-size: 1em;
  & br {
    margin: 5px;
  }
`;

const ClosingButton = styled(CgClose)`
  cursor: pointer;
  color: black;
  &:hover {
    color: red;
  }
  filter: drop-shadow(1px 1px 1px rgba(190, 190, 190, 0.7));
`;
const ParameterButton = styled(BsFillGearFill)`
  cursor: pointer;
  color: black;
  &:hover {
    color: ${colorsLight.interaction};
  }
  filter: drop-shadow(1px 1px 1px rgba(190, 190, 190, 0.7));
`;

const AddButton = styled(FaPlus)`
  cursor: pointer;
  color: black;
  &:hover {
    color: ${colorsLight.interaction};
  }
  filter: drop-shadow(1px 1px 1px rgba(190, 190, 190, 0.7));
`;

const ZoneParametres = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;
const ZoneSelection = styled.div`
  padding: 20px;
`;
const BoiteParametre = styled.div`
  background: ${colorsLight.background};
  border-radius: 9px;
  width: min-content;
  min-width: 400px;
  margin: 4px;
  flex-grow: 4;
  flex-shrink: 4;
  transition: 0.2s background-color, 0.2s color, 0.5s width, 0.5s height;

  &:hover {
    background-color: ${(props) =>
      !props.isOpen && !props.hasCritere && colorsLight.background2};
    color: ${(props) => !props.isOpen && !props.hasCritere && "white"};
    cursor: ${(props) => !props.isOpen && !props.hasCritere && "pointer"};
    & h3 {
      color: ${(props) => !props.isOpen && !props.hasCritere && "white"};
      font-style: ${(props) => !props.isOpen && !props.hasCritere && "normal"};
    }
  }
`;

const TitreParametre = styled.h3`
  margin: 0px;
  font-weight: normal;
  font-size: 1.2em;
  font-style: italic;
  color: ${colorsLight.title};
`;

const LegendeParametre = styled.div`
  margin-top: 20px;
  font-size: 1.1em;
`;

const ParametreItemCritere = styled.div`
  background-color: ${colorsLight.topBackground};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  align-items: center;
  padding: 0px 8px;
`;

const ItemCritere = styled.div`
  color: white;
  width: fit-content;
  background-color: ${colorsLight.title};
  border-radius: 8px;
  padding: 10px;
  svg {
    fill: white;
    padding-right: 5px;
  }
  &:hover {
    cursor: ${(props) => props.clickable && "pointer"};
    background-color: ${(props) => props.clickable && colorsLight.interaction};
    svg {
      filter: drop-shadow(1px 1px 1px rgba(190, 190, 190, 0.7));
    }
  }
`;

const ZoneAction = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
const CarteSelection = styled.div`
  background-color: ${colorsLight.title};
  padding: 20px;
  border-radius: 8px;
  color: white;
  svg {
    transition: 0.2s transform;
    fill: white;
    margin-right: 5px;
  }
  margin: 20px 0px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  max-height: 100px;
`;

const TitreCarteSelection = styled.div`
  font-size: 1.3em;
`;

const PetitTexte = styled.div`
  font-size: 0.8em;
  cursor: pointer;
  transition: 0.2s font-style;
  width: fit-content;
  &:hover {
    font-style: italic;
    svg {
      transform: translate(5px);
    }
  }
`;

const SelectionModalite = styled.div`
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 10px;
  max-height: 80%;
`;

const Colonne = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  gap: 20px;
`;

const Action = styled.div`
  margin: 0px 10px;
  width: fit-content;
  background-color: ${colorsLight.topBackground};
  color: black;
  border-radius: 9px;
  padding: 8px;
  transition: 0.2s ease background-color, 0.2s color;
  &:hover {
    background-color: ${(props) =>
      props.choix === "VALIDER" ? colorsLight.interaction : colorsLight.cancel};
    color: #ffffff;
  }
  cursor: pointer;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const CheckBox = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
`;

const Checked = styled.div`
  position: relative;
  transition: 0.2s opacity;
  opacity: ${(props) => (props.checked ? "1" : "0")};
  &:hover {
    opacity: ${(props) => (props.checked ? "0" : "50%")};
  }
  top: 3px;
  left: 3px;
  width: 14px;
  height: 14px;
  background-color: ${colorsLight.light};
  border-radius: 50%;
  cursor: pointer;
`;

export {
  BoiteParametre,
  TitreParametre,
  LegendeParametre,
  Back,
  ModalBox,
  ZoneSelection,
  ZoneParametres,
  ClosingButton,
  ParagraphSousTitre,
  TitleModal,
  TitleSection,
  HeaderModal,
  Action,
  ZoneAction,
  ParametreItemCritere,
  ItemCritere,
  ParameterButton,
  AddButton,
  CarteSelection,
  TitreCarteSelection,
  Colonne,
  PetitTexte,
  SelectionModalite,
  CheckBoxContainer,
  CheckBox,
  Checked,
};
