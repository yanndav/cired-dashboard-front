// Styling
import "./Localisation.css";

// React modules
import { useState, useRef, useContext } from "react";

// Import map function
import { AppContext } from "../../../app/AppContext";

import PerimetreGeographique from "./PerimetreGeographique";
import UniteComparaison from "./UniteComparaison";
import LocalisationMap from "./LocalisationMap";

import { hasCritere, setKeyCondition } from "./fonctionsComparaison";

// Import components
import {
  Back,
  ModalBox,
  HeaderModal,
  TitleModal,
  ClosingButton,
  ParagraphSousTitre,
  LogoTerritoire,
  ZoneParametres,
  ZoneAction,
  Action,
} from "./StyledComparaison";
import { useEffect } from "react";

const Localisation = ({
  setParam,
  useOutsideCloser,
  geographies,
  setGeographies,
}) => {
  const refLoc = useRef(null);
  // State variables
  const [parametre, setParametre] = useState("default");
  const [tempoGeographies, setTempoGeographies] = useState(geographies);
  const { API_URL } = useContext(AppContext);
  const [countUnite, setCountUnite] = useState(tempoGeographies.unite.length);

  useEffect(() => {
    const getMeta = async (variable) => {
      const response = await fetch(`${API_URL}/getVariableMeta`, {
        body: JSON.stringify({ variable: variable }),
        method: "POST",
        headers: {
          // Authorization: bearer,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTempoGeographies((prev) => ({
        ...prev,
        unite: data,
      }));
    };

    const getAnalysisGroups = async (tempoGeographies) => {
      console.log("triggered");

      const response = await fetch(`${API_URL}/getGroupingVarTerriYear`, {
        body: JSON.stringify({
          territoires: tempoGeographies.perimetre[0].TERRITOIRES,
          unite: tempoGeographies.unite,
        }),
        method: "POST",
        headers: {
          // Authorization: bearer,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTempoGeographies((prev) => ({
        ...prev,
        groupAnalysis: data,
      }));
    };

    tempoGeographies.perimetre.length > 0 &&
      tempoGeographies.unite.length === 0 &&
      getMeta(
        Array.from(
          new Set(
            tempoGeographies.perimetre[0].TERRITOIRES.map((geo) => geo.TYPE)
          )
        )
      );

    if (
      tempoGeographies.perimetre.length > 0 &&
      tempoGeographies.unite.length !== countUnite
    ) {
      setCountUnite(tempoGeographies.unite.length);
      getAnalysisGroups(tempoGeographies);
    }
  }, [tempoGeographies]);

  const closeLocalisation = () => {
    setParam((prev) => ({ ...prev, localisation: false }));
  };

  const validerLocalisation = () => {
    setGeographies(tempoGeographies);
    closeLocalisation();
  };

  const changeParametre = (nom) => setParametre(nom);

  const pretAComparer = (criteres) =>
    !["unite", "perimetre"]
      .map((key) => Object.keys(criteres).includes(key))
      .includes(false) &&
    hasCritere(criteres.unite) &&
    hasCritere(criteres.perimetre);

  useOutsideCloser(refLoc, "localisation");

  return (
    <>
      <Back />
      <ModalBox ref={refLoc}>
        <HeaderModal>
          <TitleModal>
            <LogoTerritoire />
            Définition du territoire d'analyse
          </TitleModal>
          <ClosingButton onClick={closeLocalisation}></ClosingButton>
        </HeaderModal>
        <ParagraphSousTitre>
          Pour commencer, vous devez définir le territoire sur lequel vous
          souhaitez réaliser votre analyse.
        </ParagraphSousTitre>
        <ZoneParametres>
          <PerimetreGeographique
            parametre={parametre}
            changeParametre={changeParametre}
            criteres={tempoGeographies}
            setCriteres={setTempoGeographies}
            isComparaison={false}
          />
          <UniteComparaison
            parametre={parametre}
            changeParametre={changeParametre}
            criteres={tempoGeographies}
            setCriteres={setTempoGeographies}
            isComparaison={false}
          />
        </ZoneParametres>
        {pretAComparer(tempoGeographies) && parametre === "default" && (
          <ZoneAction>
            <Action choix="VALIDER" onClick={() => validerLocalisation()}>
              Valider le périmètre et les échelles d'analyse
            </Action>
            <Action choix="ANNULER" onClick={() => closeLocalisation()}>
              Annuler
            </Action>
          </ZoneAction>
        )}
        {/* Carte qui montre les résultats */}
        {tempoGeographies.perimetre.length > 0 &&
          parametre === "default" &&
          (typeof tempoGeographies.groupAnalysis === "undefined" ||
            tempoGeographies.groupAnalysis.length === 0) && (
            <LocalisationMap
              perimetre={tempoGeographies.perimetre[0].TERRITOIRES}
              setCriteres={setTempoGeographies}
            />
          )}
        {typeof tempoGeographies.groupAnalysis !== "undefined" &&
          tempoGeographies.groupAnalysis.length > 0 &&
          tempoGeographies.groupAnalysis.map((group) => (
            <LocalisationMap
              key={"map-" + group.KEY}
              perimetre={group.TERRITOIRES}
              isGeographies
              title={group.LIBELLE}
            />
          ))}
      </ModalBox>
    </>
  );
};

export default Localisation;
