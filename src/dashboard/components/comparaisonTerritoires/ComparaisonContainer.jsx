import React, { useState } from "react";
import { useRef, useEffect } from "react";

import {
  Back,
  ModalBox,
  HeaderModal,
  TitleModal,
  ClosingButton,
  ParagraphSousTitre,
  ZoneParametres,
} from "./StyledComparaison";
// Components
import PerimetreGeographique from "./PerimetreGeographique";
import CritereComparaison from "./CritereSelection";
import EchelleComparaison from "./EchelleComparaison";

// Styled components

//  COMPOSANT
const ComparaisonContainer = ({ setComparaison, titre }) => {
  // Variables
  const boxRef = useRef(null);
  const [parametre, setParametre] = useState("default");

  // Hook
  const useOutsideCloser = (boxRef) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
          closeComparaison();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [boxRef]);
  };

  // Functions
  const closeComparaison = () => {
    setComparaison((prev) => ({ ...prev, open: false }));
  };

  const changeParametre = (nom) => setParametre(nom);
  // Exécution de la fonction de fermeture de la boîte
  useOutsideCloser(boxRef);
  return (
    <Back>
      <ModalBox ref={boxRef}>
        <HeaderModal>
          <TitleModal>Analyse comparative, {titre.toLowerCase()}</TitleModal>
          <ClosingButton onClick={closeComparaison}></ClosingButton>
        </HeaderModal>
        <ParagraphSousTitre>
          L'analyse comparative permet de comparer les données de votre
          territoire à d'autres.
          <br />
          Vous pouvez personnaliser le périmètre géographique, les critères de
          sélection des territoires, ainsi que l'échelle d'analyse.
        </ParagraphSousTitre>
        <ZoneParametres>
          <PerimetreGeographique
            parametre={parametre}
            changeParametre={changeParametre}
          />
          <CritereComparaison
            parametre={parametre}
            changeParametre={changeParametre}
          />
          <EchelleComparaison
            parametre={parametre}
            changeParametre={changeParametre}
          />
        </ZoneParametres>
      </ModalBox>
    </Back>
  );
};

export default ComparaisonContainer;
