// -----------------------------------------------------------------------
// -- PAGE CENTRALE DU TABLEAU DE BORD
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS -------------------------------------
// Styling
import "./Dashboard.css";
import "./../app/App.css";

// React components
import { useState, useEffect } from "react";
import styled from "styled-components";
import { colorsLight } from "../app/colorComponents";
import {
  LogoTerritoire,
  LogoModules,
} from "./components/parametresTableau/StyledComparaison";

// TV Components
import NameTableau from "./components/parametresTableau/NameTableau";
import Localisation from "./components/parametresTableau/LocalisationContainer";
import ModuleSelecteur from "./components/parametresTableau/ModuleSelecteur";
import ModulesEtiquettes from "./components/parametresTableau/ModulesEtiquettes";
import ZoneModules from "./components/zoneModules/ZoneModules";

const ContainerTableau = styled.div`
  padding: 20px 30px 0px 30px;
`;
const Modal = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 50px;
`;
const ContainerParametres = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  flex-wrap: wrap;
`;

const BoutonParametre = styled.div`
  white-space: nowrap;
  font-size: 1.1em;
  color: ${colorsLight.title};
  border-radius: 8px;
  background: ${colorsLight.background};
  display: flex;
  flex-direction: row;

  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background: ${colorsLight.topBackground};
  }
`;

const ContainerResultats = styled.div`
  background: ${colorsLight.background};
  padding: 20px 30px 0px 30px;
  margin: 20px -30px 0px -30px;
  min-height: 80vh;
`;
// COMPOSANT -------------------------------------

const Dashboard = () => {
  // const [territories, setTerritories] = useState([]); // Name of territories selected
  const [selectedModules, setSelectedModules] = useState([]); // Names of selected modules
  const [refModules, setRefModules] = useState({});
  const [geographies, setGeographies] = useState({
    perimetre: [],
    unite: [],
    groupAnalysis: [],
  }); // Geographies to be placed
  const [center, setCenter] = useState([46.8, 1.7]); // Center of the map (France)
  const [param, setParam] = useState({ localisation: false, modules: false }); // Parameters

  // Functions
  const openBox = (key) => {
    setParam((prev) => ({ ...prev, [key]: true }));
  };
  const closeBox = (key) => {
    setParam((prev) => ({ ...prev, [key]: false }));
  };

  const useOutsideCloser = (boxRef, key) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
          closeBox(key);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [boxRef, key]);
  };

  return (
    <>
      <NameTableau />
      {/* PARTIE STABLE DU TABLEAU */}
      <ContainerTableau>
        <ContainerParametres>
          <BoutonParametre onClick={() => openBox("localisation")}>
            <LogoTerritoire />
            Définir mon territoire
          </BoutonParametre>
          <BoutonParametre onClick={() => openBox("modules")}>
            <LogoModules />
            Ajouter des modules{" "}
          </BoutonParametre>
        </ContainerParametres>
        <ContainerResultats>
          <ModulesEtiquettes
            selectedModules={selectedModules}
            setSelectedModules={setSelectedModules}
            refModules={refModules}
          />

          <ZoneModules
            selectedModules={selectedModules}
            geographies={geographies}
            center={center}
            setRefModules={setRefModules}
          />
        </ContainerResultats>
      </ContainerTableau>
      {/* MODALS DE PARAMETRISATION */}
      {(param.localisation || param.modules) && (
        <Modal>
          {param.localisation && (
            <Localisation
              setParam={setParam}
              useOutsideCloser={useOutsideCloser}
              geographies={geographies}
              setGeographies={setGeographies}
            />
          )}
          {param.modules && (
            <ModuleSelecteur
              setSelectedModules={setSelectedModules}
              selectedModules={selectedModules}
              setParam={setParam}
              useOutsideCloser={useOutsideCloser}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
