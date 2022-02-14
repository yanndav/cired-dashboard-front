import styled from "styled-components";
import { GrCompare } from "react-icons/gr";

const ActivationButton = styled.div`
  width: fit-content;
  /* padding: 0px 10px; */
  height: 35px;
  background-color: #dadada;
  border-radius: 7px;
  color: black;
  &:hover {
    background-color: #e6e6e6;
    color: #126c7e;
  }
  &:hover path {
    stroke: #15afce;
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
  /* background: red; */
  padding: 5px 15px 5px 8px;
  margin: 0px;
`;

const CompareIcon = styled(GrCompare)`
  /* position: relative; */
  margin: auto 10px;
  width: 30px;
  height: 30px;
  path {
    margin: auto;
    stroke: #128aa1;
  }
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
        ? "color: #ebebeb"
        : "color: #f7f7f7"
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
    background: #18a4c0;
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
      <ActivationArea onClick={openComparaison}>
        <span>Analyse comparative</span>
        <CompareIcon />
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
