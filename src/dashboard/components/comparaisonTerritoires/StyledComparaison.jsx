import styled from "styled-components";
import { CgClose } from "react-icons/cg";

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
  position: absolute;
  width: 1000px;
  max-width: 90%;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -40%);
  margin-left: ${(props) => props.width + "px"};
  padding: 30px;
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 1px 7px rgba(168, 168, 168, 0.438);
  border-radius: 8px;
`;

const HeaderModal = styled.div`
  margin-top: 10px;

  display: grid;
  grid-template-columns: 95% auto;
`;

const TitleModal = styled.div`
  font-size: 1.6em;
  font-weight: bolder;
`;
const ParagraphSousTitre = styled.p`
  margin-top: 10px;
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

const ZoneParametres = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ZoneSelection = styled.div`
  padding: 20px;
`;
const BoiteParametre = styled.div`
  background: #eeeeee;
  border-radius: 9px;
  width: min-content;
  min-width: 400px;
  margin: 4px;
  flex-grow: 4;
  flex-shrink: 4;
  /* padding: 20px; */
  ${(props) =>
    !props.isOpen &&
    ` &:hover {
    background: #80e1f7;
  }
  cursor: pointer;
`}
`;

const TitreParametre = styled.h2`
  font-size: 1.1em;
  font-weight: normal;
  font-style: italic;
  margin: 0px;
`;
const LegendeParametre = styled.div`
  font-size: 0.9em;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Validateur = styled.div`
  margin: 0px auto;
  width: fit-content;
  background-color: #e4e2e2;
  color: black;
  border-radius: 9px;
  padding: 8px;
  transition: 0.5s ease background-color, 0.5s color;
  &:hover {
    background-color: #0ed481;
    color: #ffffff;
  }
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
  HeaderModal,
  Validateur,
};
