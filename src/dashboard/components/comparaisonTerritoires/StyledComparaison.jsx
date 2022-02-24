import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { colorsLight } from "../../../app/colorComponents";
import { BsFillGearFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
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
  color: ${colorsLight.title2};
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

const EditButton = styled(FiEdit2)`
  cursor: pointer;
  color: black;
  transform: scale(-1, 1);
  &:hover {
    color: ${colorsLight.background};
  }
  margin-right: 5px;
`;

const SaveButton = styled(FaSave)`
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
  color: ${colorsLight.title2};
`;

const LegendeParametre = styled.div`
  margin-top: ${(props) => (props.middle ? "70px" : "20px")};
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
  background-color: ${colorsLight.interaction};
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
  background-color: ${colorsLight.title2};
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
  /* max-height: 300px; */
`;

const TitreCarteSelection = styled.div`
  font-size: 1.3em;
`;

const PetitTexte = styled.div`
  font-size: 0.8em;
  cursor: ${(props) => (props.clickable ? "pointer" : "normal")};
  transition: 0.2s font-style;
  width: fit-content;
  &:hover {
    font-style: ${(props) => (props.clickable ? "italic" : "normal")};
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
  max-width: 70%;
  /* max-height: 450px; */
`;

const Colonne = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
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
const MaxHeightContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-shrink: 0;
`;
const NomPerimetre = styled.form`
  margin: 20px 0px;
  border: none;
  background: ${(props) =>
    props.isEmpty ? colorsLight.cancel : colorsLight.topBackground};
  border-radius: 8px;
  padding: 10px;
  width: fit-content;
  &:hover {
    color: ${(props) => !props.isEditing && colorsLight.background};
    svg {
      stroke: ${(props) => !props.isEditing && colorsLight.background};
      fill: ${(props) => !props.isEditing && colorsLight.background};
    }
  }
`;
const InputNomPerimetre = styled.input`
  font-size: 1em;
  border: none;
  background: none;
`;

const TerritoiresSelectionnes = styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  max-height: 300px;
  overflow-y: scroll;
`;

const ConditionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  /* overflow-y: auto; */
  background: ${(props) => props.background && colorsLight.background};
  border-radius: ${(props) => props.background && "8px"};
  padding: ${(props) => props.background && "20px"};
  margin-right: 5px;
`;

const TitleCondition = styled.div`
  color: black;
  width: 100%;
`;
const AddCondition = styled.div`
  background: ${(props) =>
    props.selected ? colorsLight.background2 : colorsLight.topBackground};
  color: black;
  width: fit-content;

  border-radius: 8px;
  padding: 10px;
  cursor: ${(props) => (props.open ? "normal" : "pointer")};
  & svg {
    fill: black;
  }
  &:hover {
    border: ${(props) =>
      props.selectMode &&
      `solid 8px ${
        props.selected ? colorsLight.cancel : colorsLight.background2
      }`};
    border-radius: ${(props) => props.selectMode && `10px`};
    padding: ${(props) => props.selectMode && "2px"};
    color: ${(props) =>
      !props.open
        ? props.top
          ? colorsLight.background2
          : colorsLight.title2
        : "black"};
    svg {
      fill: ${(props) =>
        !props.open && props.top
          ? colorsLight.background2
          : colorsLight.title2};
    }
  }
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
  MaxHeightContainer,
  Colonne,
  PetitTexte,
  SelectionModalite,
  CheckBoxContainer,
  CheckBox,
  Checked,
  NomPerimetre,
  InputNomPerimetre,
  EditButton,
  SaveButton,
  TerritoiresSelectionnes,
  AddCondition,
  ConditionsContainer,
  TitleCondition,
};
