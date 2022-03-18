import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { colorsLight } from "../../../app/colorComponents";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsFillGearFill, BsFillLayersFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import {
  FaSave,
  FaCropAlt,
  FaPlusCircle,
  FaMap,
  FaExternalLinkSquareAlt,
  FaDatabase,
} from "react-icons/fa";

import { MdInfo } from "react-icons/md";
import { ReactComponent as Territory } from "../../Territory.svg";
import { ReactComponent as Modules } from "../../Modules.svg";

const Back = styled.div`
  background: #cacaca6e;
  position: fixed;
  filter: blur(5px);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
`;
const ModalBox = styled.div`
  position: fixed;

  width: 95%;
  height: 90vh;
  top: 5px;
  left: 50%;
  transform: translate(-50%, 0%);
  margin-left: ${(props) => props.width + "px"};
  padding: 30px;
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 1px 7px rgba(168, 168, 168, 0.438);
  border-radius: 8px;
  overflow-y: auto;
  z-index: 1000;
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
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TitleSection = styled.div`
  font-size: 1.4em;
  margin: 20px 0px;
  white-space: wrap;
`;
const ParagraphSousTitre = styled.p`
  margin-top: 10px;
  margin-bottom: 50px;
  color: inherit;
  font-size: 1em;
  & br {
    margin: 5px;
  }
`;

const ZoneFiltres = styled.div`
margin-top:${(props) => (props.notTop ? "0px" : "20px")};
transition:width 0.3s,
height:0.3s;
width:95%;
display:flex;
flex-direction:row;
flex-wrap: ${(props) => (props.sliderMode ? "nowrap" : "wrap")};
align-items:center;
gap:15px;
border-radius:8px;
max-height:${(props) => props.height && props.height};
overflow-y:auto;
overflow-x:${(props) => props.sliderMode && "auto"};
`;

const FiltreButton = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  background: ${(props) =>
    props.isGeo
      ? props.isSelected
        ? colorsLight[props.code]
        : colorsLight.topBackground
      : props.isSelected
      ? props.couleur
        ? props.couleur
        : colorsLight.background2
      : colorsLight.topBackground};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  border: 1px solid
    ${(props) => (props.isGeo ? colorsLight[props.code] : "none")};
  cursor: ${(props) => !props.notClickable && "pointer"};
  &:hover {
    background: ${(props) =>
      !props.notClickable &&
      (props.isSelected
        ? colorsLight.cancel
        : props.isGeo
        ? colorsLight[props.code]
        : colorsLight.light)};
    color: ${(props) => !props.notClickable && "white"};
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

const AddButton = styled(FaPlusCircle)`
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

const InfoButton = styled(MdInfo)`
  cursor: pointer;
  fill: white;
  transform: scale(135%);
  &:hover {
    fill: ${colorsLight.topBackground};
  }
  filter: drop-shadow(1px 1px 1px rgba(190, 190, 190, 0.7));
  margin-left: 10px;
  size: 1.3em;
`;

const ExternalImg = styled(FaExternalLinkSquareAlt)`
  margin-right: 15px;
  padding-right: 10px;
  fill: ${colorsLight.title}!important;
`;

const DbImg = styled(FaDatabase)`
  margin-right: 15px;
  padding-right: 10px;
  fill: ${colorsLight.title}!important;
`;
const OutImg = styled(IoMdArrowRoundBack)`
  /* padding: 0px 10px 0px 5px; */
  fill: ${colorsLight.white};
  transform: scale(1.5);
`;

const MapImg = styled(FaMap)`
  margin-right: 15px;
  padding-right: 10px;
  fill: ${colorsLight.title}!important;
`;
const CropImg = styled(FaCropAlt)`
  margin-right: 10px;
  color: ${colorsLight.title};
`;

const LayerImg = styled(BsFillLayersFill)`
  margin-right: 10px;
  color: ${colorsLight.title};
`;
const ZoneParametres = styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-shrink: 100;
  gap: 20px;
`;
const ZoneSelection = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: ${(props) => props.clickable && "pointer"};
`;
const BoiteParametre = styled.div`
  background: ${(props) =>
    props.lighter ? colorsLight.backgroundlight : colorsLight.background};
  border-radius: 9px;
  /* margin: 4px; */
  flex-shrink:15;
  flex-grow:15;
  flex-basis:400px;
  }
`;

const TitreParametre = styled.h3`
  /* margin: 0px; */
  font-weight: bolder;
  font-size: 1.2em;
  color: ${colorsLight.title};
`;

const LegendeParametre = styled.div`
  font-size: 1.1em;
  white-space: wrap;
  color: ${(props) => props.color && props.color};
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
  /* width: fit-content; */
`;

const ItemCritere = styled.div`
  color: white;
  width: fit-content;
  text-align: center;
  background-color: ${colorsLight.interaction};
  border-radius: 8px;
  padding: 10px;
  margin: 20px 0px;
  svg {
    fill: white;
    margin-right: 10px;
  }
  &:hover {
    cursor: ${(props) => props.clickable && "pointer"};
    opacity: ${(props) => props.clickable && 0.8};
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
  display: flex;
  flex-direction: ${(props) => props.flex};
  padding: 20px;
  border-radius: 8px;
  color: white;
  svg {
    transition: 0.2s transform;
    fill: white;
    margin-right: 5px;
  }
  margin: 20px 0px;

  gap: 20px 40px;
  /* max-height: 300px; */
`;

const TitreCarteSelection = styled.div`
  font-size: 1.1em;
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
      props.choix === "VALIDER" ? colorsLight.background2 : colorsLight.cancel};
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
  font-size: 1.4em;
  svg {
    font-size: 0.7em;
  }
  border: none;
  background: ${(props) =>
    props.isEmpty ? colorsLight.cancel : colorsLight.topBackground};
  border-radius: 8px;
  padding: 10px;
  width: fit-content;
  &:hover {
    color: ${(props) => !props.isEditing && colorsLight.background};
    svg {
      fill: ${(props) => !props.isEditing && colorsLight.background3};
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

const LogoTerritoire = styled(Territory)`
  width: 45px;
  height: 45px;
  padding: 0px;
  margin-right: 10px;
`;

const LogoModules = styled(Modules)`
  width: 45px;
  height: 45px;
  padding: 0px;
  margin-right: 10px;
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
  LogoTerritoire,
  LogoModules,
  CropImg,
  LayerImg,
  MapImg,
  FiltreButton,
  ZoneFiltres,
  InfoButton,
  ExternalImg,
  DbImg,
  OutImg,
};
