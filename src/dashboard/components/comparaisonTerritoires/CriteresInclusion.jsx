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
import ConditionCritere from "./ConditionCritere";
import BarreRecherche from "./BarreRecherche";

const CritereInclusion = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
}) => {
  const [tempoInclusion, setTempoInclusion] = useState([...criteres.inclusion]);

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
      {(parametre === "default" || parametre === "inclusion") && (
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
              Critère{addS(criteres.inclusion)} d'inclusion des territoires
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
                  Modifier les critères d'inclusion des territoires
                </ItemCritere>
              </ZoneParametres>
            ) : (
              <LegendeParametre>
                Sélectionnez les variables et les modalités qui définissent
                l'inclusion à la comparaison des territoires compris dans le
                périmètre géographique. Tous les territoires sont sélectionnés
                par défaut.
              </LegendeParametre>
            )}
          </ZoneSelection>

          {parametre === "inclusion" && (
            <ZoneSelection>
              <BarreRecherche
                tempo={tempoInclusion}
                setTempo={setTempoInclusion}
                parametre="inclusion"
              />
              <LegendeParametre middle>
                Critère{addS(tempoInclusion)} sélectionné
                {addS(tempoInclusion)} :
              </LegendeParametre>
              {hasCritere(tempoInclusion) && (
                <>
                  {tempoInclusion
                    .sort((a, b) => a.LIBELLE.localeCompare(b.LIBELLE))
                    .map((inclus) => (
                      <CarteSelection>
                        <Colonne>
                          <TitreCarteSelection>
                            {inclus.LIBELLE}
                          </TitreCarteSelection>
                          <PetitTexte clickable>
                            <AddButton />
                            Plus d'information
                          </PetitTexte>
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
                        <SelectionModalite>
                          Conditions de l'inclusion :
                          {inclus.TYPE === "NOMINAL" ? (
                            <ConditionsContainer>
                              {inclus.MODALITES.sort((a, b) =>
                                a.LIBELLE.localeCompare(b.LIBELLE)
                              ).map((modalite) => (
                                <AddCondition
                                  selectMode
                                  selected={
                                    Object.keys(inclus).includes(
                                      "CONDITIONS"
                                    ) &&
                                    inclus.CONDITIONS.includes(modalite.CODE)
                                  }
                                  onClick={() =>
                                    handleModifyCondition(inclus, modalite)
                                  }
                                >
                                  {modalite.LIBELLE}
                                </AddCondition>
                              ))}
                            </ConditionsContainer>
                          ) : (
                            <>
                              <AddCondition
                                onClick={() => addCondition(inclus)}
                                top
                              >
                                <AddButton /> Ajouter une condition
                              </AddCondition>
                              {Object.keys(inclus).includes("CONDITIONS") &&
                                inclus.CONDITIONS.map((condition) => (
                                  <ConditionCritere
                                    condition={condition}
                                    inclus={inclus}
                                    setTempoInclusion={setTempoInclusion}
                                  />
                                ))}
                            </>
                          )}
                          {/* {inclusion.MODALITES.sort((a, b) =>
                              a.LIBELLE.localeCompare(b.LIBELLE)
                            ).map((modalite) => (
                              <CheckBoxContainer>
                                <CheckBox
                                  onClick={() =>
                                    setTempoInclusion((prev) => {
                                      let toUpdate = prev.filter(
                                        (inclu) =>
                                          inclu.LIBELLE === inclusion.LIBELLE
                                      )[0];

                                      toUpdate.MODALITES = [
                                        ...toUpdate.MODALITES.filter(
                                          (mod) =>
                                            mod.LIBELLE !== modalite.LIBELLE
                                        ),
                                        {
                                          ...toUpdate.MODALITES.filter(
                                            (mod) =>
                                              mod.LIBELLE === modalite.LIBELLE
                                          )[0],
                                          SELECT: !toUpdate.MODALITES.filter(
                                            (mod) =>
                                              mod.LIBELLE === modalite.LIBELLE
                                          )[0].SELECT,
                                        },
                                      ];

                                      return [
                                        ...prev.filter(
                                          (inclu) =>
                                            inclu.LIBELLE !== inclusion.LIBELLE
                                        ),
                                        toUpdate,
                                      ];
                                    })
                                  }
                                >
                                  <Checked checked={modalite.SELECT} />
                                </CheckBox>
                                <span>{modalite.LIBELLE}</span>
                              </CheckBoxContainer>
                            ))} */}
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
