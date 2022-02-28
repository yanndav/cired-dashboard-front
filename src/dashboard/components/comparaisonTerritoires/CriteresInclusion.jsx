import React, { useState } from "react";
import {
  BoiteParametre,
  TitreParametre,
  LegendeParametre,
  ZoneSelection,
  Action,
  ZoneAction,
  AddButton,
  ZoneParametres,
  ItemCritere,
  ParameterButton,
  CarteSelection,
  TitreCarteSelection,
  Colonne,
  PetitTexte,
  SelectionModalite,
  AddCondition,
  ConditionsContainer,
  // CheckBoxContainer,
  // CheckBox,
  // Checked,
} from "./StyledComparaison";

import { hasCritere, isOpen, addS } from "./fonctionsComparaison";
import ConditionCritereContinu from "./ConditionCritereContinu";
import BarreRecherche from "./BarreRecherche";
import ConditionCritereNominal from "./ConditionCritereNominal";

const CritereInclusion = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
}) => {
  const [tempoInclusion, setTempoInclusion] = useState([...criteres.inclusion]);
  const [tempoMeta, setTempoMeta] = useState([]);
  const inclusion = parametre === "inclusion";

  const addMetaCondition = async (API_URL, CODGEO, VARIABLE, TYPE) => {
    const response = await fetch(`${API_URL}/getMetaVariableTerri`, {
      body: JSON.stringify({ VARIABLE: VARIABLE, TYPE: TYPE, CODGEO: CODGEO }),
      method: "POST",
      headers: {
        // Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTempoMeta((prev) => [...prev, data]);
    setTempoInclusion((prev) => {
      let toUpdate = prev.filter(
        (prevInclus) => prevInclus.CODE === VARIABLE
      )[0];
      toUpdate.CONDITIONS = data.CHOIX;
      return [
        ...prev.filter((prevInclus) => prevInclus.CODE !== VARIABLE),
        toUpdate,
      ];
    });
  };

  const addCondition = (inclus) => {
    setTempoInclusion((prev) => {
      let toUpdate = prev.filter(
        (prevInclus) => prevInclus.CODE === inclus.CODE
      )[0];
      Object.keys(toUpdate).includes("CONDITIONS")
        ? toUpdate.CONDITIONS.push({ key: toUpdate.CONDITIONS.length })
        : (toUpdate.CONDITIONS = [{ key: 0 }]);
      return [
        ...prev.filter((prevInclus) => prevInclus.CODE !== inclus.CODE),
        toUpdate,
      ];
    });
  };

  const handleModifyYear = (inclus, annee) => {
    setTempoInclusion((prev) => {
      let toUpdate = prev.filter(
        (prevInclus) => prevInclus.CODE === inclus.CODE
      )[0];

      let modified = toUpdate.CONDITIONS.filter(
        (cond) => cond.ANNEE === annee
      ).map((cond) => ({ ...cond, SELECT: !cond.SELECT }));
      toUpdate.CONDITIONS = [
        ...toUpdate.CONDITIONS.filter((cond) => cond.ANNEE !== annee),
        ...modified,
      ];

      return [
        ...prev.filter((prevInclus) => prevInclus.CODE !== inclus.CODE),
        toUpdate,
      ];
    });
  };

  const handleModifyModaliteYear = (inclus, condition) => {
    setTempoInclusion((prev) => {
      let toUpdate = prev.filter(
        (prevInclus) => prevInclus.CODE === inclus.CODE
      )[0];

      let modified = toUpdate.CONDITIONS.filter(
        (cond) => cond.KEY === condition.KEY
      ).map((cond) => ({ ...cond, SELECT: !cond.SELECT }));
      toUpdate.CONDITIONS = [
        ...toUpdate.CONDITIONS.filter((cond) => !(cond.KEY === condition.KEY)),
        ...modified,
      ];

      return [
        ...prev.filter((prevInclus) => prevInclus.CODE !== inclus.CODE),
        toUpdate,
      ];
    });
  };

  const handleModifyCondition = (inclus, modalite) => {
    setTempoInclusion((prev) => {
      let toUpdate = prev.filter(
        (prevInclus) => prevInclus.CODE === inclus.CODE
      )[0];
      !Object.keys(toUpdate).includes("CONDITIONS") &&
        (toUpdate.CONDITIONS = []);

      toUpdate.CONDITIONS.includes(modalite.CODE)
        ? (toUpdate.CONDITIONS = toUpdate.CONDITIONS.filter(
            (cond) => cond !== modalite.CODE
          ))
        : toUpdate.CONDITIONS.push(modalite.CODE);

      return [
        ...prev.filter((prevInclus) => prevInclus.CODE !== inclus.CODE),
        toUpdate,
      ];
    });
  };

  return (
    <>
      {(parametre === "default" || inclusion) && (
        <BoiteParametre
          isOpen={isOpen(parametre)}
          hasCritere={hasCritere(criteres.inclusion)}
        >
          <ZoneSelection
            onClick={() =>
              !isOpen(parametre) &&
              !hasCritere(criteres.inclusion) &&
              changeParametre("inclusion")
            }
          >
            <TitreParametre>
              Condition{addS(criteres.inclusion)} d'inclusion des territoires
            </TitreParametre>
            {hasCritere(criteres.inclusion) && parametre === "default" ? (
              <ZoneParametres>
                {criteres.inclusion.map((inclusion) => (
                  <ItemCritere>{inclusion.LIBELLE}</ItemCritere>
                ))}
                <ItemCritere
                  clickable
                  onClick={() => changeParametre("inclusion")}
                >
                  <ParameterButton />
                  Modifier les conditions d'inclusion des territoires
                </ItemCritere>
              </ZoneParametres>
            ) : (
              <LegendeParametre>
                Créez des conditions pour sélectionner un sous-ensemble de
                territoires dans votre périmètre géographique. Tous les
                territoires de votre périmètre géographique sont sélectionnés
                par défaut.
              </LegendeParametre>
            )}
          </ZoneSelection>
          {/* Ne s'ouvre que si l'utilisateur est dans le menu de sélection des conditions */}
          {inclusion && (
            <ZoneSelection>
              {/* Barre de recherche pour les variables */}
              <BarreRecherche
                tempo={tempoInclusion}
                setTempo={setTempoInclusion}
                parametre="inclusion"
                addMetaCondition={addMetaCondition}
              />
              {/* Légende */}
              <LegendeParametre middle>
                Critère{addS(tempoInclusion)} sélectionné
                {addS(tempoInclusion)} :
              </LegendeParametre>
              {/* Si il y a des critères, ils sont répertoriés ci-dessous */}
              {hasCritere(tempoInclusion) && (
                <>
                  {tempoInclusion
                    .sort((a, b) => a.LIBELLE.localeCompare(b.LIBELLE))
                    .map((inclus) => (
                      // Chaque critère d'inclusion est contenu dans une carte
                      <CarteSelection>
                        {/* La colonne de gauche énumère des informations sur la variable */}
                        <Colonne>
                          {/* Son titre */}
                          <TitreCarteSelection>
                            {inclus.LIBELLE}
                          </TitreCarteSelection>
                          {/* Un accès à la définition */}
                          <PetitTexte clickable>
                            <AddButton />
                            Plus d'information
                          </PetitTexte>
                          {/* Un bouton pour supprimer ce critère */}
                          <Action
                            choix="ANNULER"
                            onClick={() =>
                              setTempoInclusion((prev) => [
                                ...prev.filter(
                                  (prevInclus) =>
                                    prevInclus.CODE !== inclus.CODE
                                ),
                              ])
                            }
                          >
                            Supprimer ce critère
                          </Action>
                        </Colonne>
                        {/* La deuxième colonne permet de sélectionner les conditions */}
                        <SelectionModalite>
                          Conditions de l'inclusion :
                          {inclus.TYPE === "NOMINAL" ? (
                            <ConditionCritereNominal
                              META={
                                tempoMeta.filter(
                                  (tempo) => tempo.CODE === inclus.CODE
                                )[0]
                              }
                              inclus={inclus}
                              handleModifyYear={handleModifyYear}
                              handleModifyModaliteYear={
                                handleModifyModaliteYear
                              }
                            />
                          ) : (
                            <ConditionCritereContinu
                              META={
                                tempoMeta.filter(
                                  (tempo) => tempo.CODE === inclus.CODE
                                )[0]
                              }
                              inclus={inclus}
                              // setTempoInclusion={setTempoInclusion}
                            />
                          )}
                        </SelectionModalite>
                      </CarteSelection>
                    ))}
                </>
              )}
              <ZoneAction>
                <Action
                  onClick={() => {
                    changeParametre("default");
                    setCriteres((prev) => ({
                      ...prev,
                      inclusion: tempoInclusion,
                    }));
                  }}
                  choix="VALIDER"
                >
                  Valider
                </Action>
                <Action
                  onClick={() => changeParametre("default")}
                  choix="ANNULER"
                >
                  Annuler
                </Action>
              </ZoneAction>
            </ZoneSelection>
          )}
        </BoiteParametre>
      )}
    </>
  );
};

export default CritereInclusion;
