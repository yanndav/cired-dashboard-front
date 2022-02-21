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
  CheckBoxContainer,
  CheckBox,
  Checked,
} from "./StyledComparaison";

import { hasCritere, isOpen, addS } from "./fonctionsComparaison";

import BarreRecherche from "./BarreRecherche";

const CritereInclusion = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
}) => {
  const [tempoInclusion, setTempoInclusion] = useState([...criteres.inclusion]);

  return (
    <>
      {(parametre === "default" || parametre === "inclusion") && (
        <BoiteParametre
          isOpen={isOpen(parametre)}
          hasCritere={hasCritere(tempoInclusion)}
        >
          <ZoneSelection
            onClick={() =>
              !isOpen(parametre) &&
              !hasCritere(tempoInclusion) &&
              changeParametre("inclusion")
            }
          >
            <TitreParametre>
              Critère{addS(tempoInclusion)} d'inclusion des territoires
            </TitreParametre>
            {hasCritere(tempoInclusion) && parametre === "default" ? (
              <ZoneParametres>
                {tempoInclusion.map((inclusion) => (
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
              <LegendeParametre>
                Critère{addS(tempoInclusion)} sélectionné
                {addS(tempoInclusion)} :
              </LegendeParametre>
              {hasCritere(tempoInclusion) && (
                <>
                  {tempoInclusion
                    .sort((a, b) => a.LIBELLE.localeCompare(b.LIBELLE))
                    .map((inclusion) => (
                      <CarteSelection>
                        <Colonne>
                          <TitreCarteSelection>
                            {inclusion.LIBELLE}
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
                                  (inclu) => inclu.LIBELLE !== inclusion.LIBELLE
                                ),
                              ])
                            }
                          >
                            Supprimer ce critère
                          </Action>
                        </Colonne>
                        <div>
                          Modalités:
                          <SelectionModalite>
                            {inclusion.MODALITES.sort((a, b) =>
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
                            ))}
                          </SelectionModalite>
                        </div>
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
