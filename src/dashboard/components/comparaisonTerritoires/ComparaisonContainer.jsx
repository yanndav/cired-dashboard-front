import React, { useState } from "react";
import { useRef, useEffect } from "react";
import {
  Back,
  ModalBox,
  HeaderModal,
  TitleModal,
  TitleSection,
  ClosingButton,
  ParagraphSousTitre,
  ZoneParametres,
  Action,
  ZoneAction,
} from "./StyledComparaison";
// Components
import PerimetreGeographique from "./PerimetreGeographique";
import CritereInclusion from "./CriteresInclusion";
import UniteComparaison from "./UniteComparaison";
import PropositionPresets from "./PropositionPresets";

// Variables de test
const cartes = [
  {
    titre: "Une comparaison avec les autres EPCI du département",
    description:
      "Comparez les résultats de votre territoire à ceux des autres EPCI de votre département",
  },
  {
    titre: "Comparer les bassins de vie de la région",
    description: "Comparez les différents bassins de vie de votre région.",
  },
  {
    titre: "Comparer les aires d'attraction des villes de la région",
    description:
      "Comparez les différentes aires d'attraction des villes de votre région.",
  },
];

const pretAComparer = (criteres) =>
  !["unite", "inclusion", "perimetre"]
    .map((key) => Object.keys(criteres).includes(key))
    .includes(false) &&
  typeof criteres.unite.libelle !== "undefined" &&
  typeof criteres.perimetre !== "undefined" &&
  criteres.perimetre.length > 0 &&
  typeof criteres.inclusion !== "undefined" &&
  criteres.inclusion.length > 0;

//  COMPOSANT
const ComparaisonContainer = ({ setComparaison, titre }) => {
  // Variables
  const boxRef = useRef(null);
  const [parametre, setParametre] = useState("default");
  const [criteres, setCriteres] = useState({
    perimetre: [{ libelle: "Drôme" }],
    inclusion: [
      {
        code: "TAAV2020",
        libelle: "Tranche d’aire d’attraction des villes 2020",
        modalites: [
          { libelle: "Commune hors attraction des villes", select: false },
          { libelle: "Aire de moins de 50 000 habitants", select: false },
          {
            libelle: "Aire de 50 000 à moins de 200 000 habitants",
            select: false,
          },
        ],
      },
    ],
    unite: { type: "GEO", nom: "EPCI", libelle: "EPCI" },
  });

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
  console.log("comparaison", pretAComparer(criteres));
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
        {/* SI AUCUN CRITÈRE N'EST SELECTIONNÉ */}
        {Object.keys(criteres).length === 0 && criteres.constructor === Object && (
          <>
            <TitleSection>
              Personnalisez des critères de comparaison parmi ceux recommandés
              avec ce module
            </TitleSection>
            <PropositionPresets cartes={cartes} />
          </>
        )}

        <TitleSection>Créez vos propres critères de comparaison</TitleSection>
        <ZoneParametres>
          <PerimetreGeographique
            parametre={parametre}
            changeParametre={changeParametre}
            criteres={criteres}
            setCriteres={setCriteres}
          />
          <CritereInclusion
            parametre={parametre}
            changeParametre={changeParametre}
            criteres={criteres}
            setCriteres={setCriteres}
          />
          <UniteComparaison
            parametre={parametre}
            changeParametre={changeParametre}
            criteres={criteres}
            setCriteres={setCriteres}
          />
        </ZoneParametres>
        {pretAComparer(criteres) && parametre === "default" && (
          <ZoneAction>
            <Action choix="VALIDER">Lancer cette comparaison</Action>
            <Action choix="ANNULER">Annuler</Action>
          </ZoneAction>
        )}
      </ModalBox>
    </Back>
  );
};

export default ComparaisonContainer;
