import styled from "styled-components";
import { colorsLight } from "../../../app/colorComponents";
import { ReactComponent as Compare } from "../../../app/comparaison.svg";

const ActivationButton = styled.div`
  width: fit-content;
  /* padding: 0px 10px; */
  height: 50px;
  background-color: #eeeeee;
  border-radius: 7px;
  color: black;
  &:hover {
    background-color: #e6e6e6;
  }
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ActivationArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 5px 15px 5px 15px;
  margin: 0px;
  color: ${(props) => (props.active ? colorsLight.title : "black")};
  svg path {
    transition: 0.2s transform;
  }

  &:hover {
    color: ${colorsLight.interaction};
    path {
      stroke: ${colorsLight.interaction};
    }
    .left path {
      transform: translate(-35px, 0px);
    }
    .right path {
      transform: translate(35px, 0px);
    }
  }
`;

const Comparaison = styled(Compare)`
  width: 2.4em;
  margin-right: 20px;
`;
const Switch = styled.div`
  margin-right: 5px;
  border-radius: 8px;
  background: #f8f8f8;
  padding: 0px 4px;
  width: 50px;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const SwitchChoice = styled.div`
  ${(props) =>
    props.choice === "ON"
      ? props.active
        ? "color: #f7f7f7"
        : "color: #ebebeb"
      : props.active
      ? "color: #ebebeb"
      : "color: #f7f7f7"};
  font-weight: bolder;
  font-size: 0.8em;
  z-index: 5;
`;

const Toggle = styled.div`
  position: absolute;
  transition: 0.2s left, 0.2s ease background;
  top: -1px;
  width: 29px;
  height: 27px;
  border-radius: 9px;

  ${(props) =>
    props.active
      ? `left:0px;
    background: ${colorsLight.title};
        `
      : `left:28px;
      background: #585858;`};
`;

const SwitchComparaison = ({ comparaison, setComparaison }) => {
  // Functions
  const switchComparaison = () =>
    setComparaison((prev) => ({ ...prev, activate: !prev.activate }));

  const openComparaison = () => {
    setComparaison((prev) => ({ ...prev, open: true }));
  };

  return (
    <ActivationButton>
      <ActivationArea onClick={openComparaison} active={comparaison.activate}>
        {/* <CompareIcon /> */}
        <Comparaison />
        Analyse comparative
      </ActivationArea>
      <Switch onClick={switchComparaison}>
        <SwitchChoice active={comparaison.activate} choice="ON">
          ON
        </SwitchChoice>
        <SwitchChoice active={comparaison.activate} choice="OFF">
          OFF
        </SwitchChoice>
        <Toggle active={comparaison.activate} />
      </Switch>
    </ActivationButton>
  );
};

export default SwitchComparaison;
