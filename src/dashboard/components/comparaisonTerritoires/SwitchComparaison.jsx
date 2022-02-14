import styled from "styled-components";
import { GrCompare } from "react-icons/gr";
import { useState } from "react";

const ActivationButton = styled.div`
  width: fit-content;
  padding: 5px 10px;
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
  margin-left: 20px;
  border-radius: 8px;
  background: #b3b3b3;
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
  ${(props) => (props.active ? "color: #1796af" : "color: #000000")};
  font-weight: bolder;
  font-size: 0.8em;
`;

const Toggle = styled.div`
  position: absolute;
  transition: 0.2s left, 0.2s ease background;
  top: 2px;
  width: 25px;
  height: 21px;
  border-radius: 9px;
  ${(props) =>
    props.active
      ? `left:30px;
    background: #18a4c0;
        `
      : `left:2px;
      background: #000000;`};
`;

const SwitchComparaison = ({ comparaison, setComparaison }) => {
  //   const [comparison, setComparison] = useState(false);
  const switchComparison = () =>
    setComparaison((prev) => ({ ...prev, activate: !prev.activate }));
  return (
    <ActivationButton>
      <ActivationArea>
        <span>Analyse comparative</span>
        <CompareIcon />
      </ActivationArea>
      <Switch onClick={switchComparison}>
        <SwitchChoice active={comparaison.activate}>ON</SwitchChoice>
        <SwitchChoice active={comparaison.activate}>OFF</SwitchChoice>
        <Toggle active={comparaison.activate} />
      </Switch>
    </ActivationButton>
  );
};

export default SwitchComparaison;
