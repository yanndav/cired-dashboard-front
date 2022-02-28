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
  ParametreItemCritere,
  ClosingButton,
} from "./StyledComparaison";

import {
  hasCritere,
  isOpen,
  addS,
  setKeyCondition,
} from "./fonctionsComparaison";
import ConditionCritereContinu from "./ConditionCritereContinu";
import BarreRecherche from "./BarreRecherche";
import ConditionCritereNominal from "./ConditionCritereNominal";

const CritereInclusion = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
}) => {
  const [tempoInclusion, setTempoInclusion] = useState({});
  const [tempoMeta, setTempoMeta] = useState([]);
  const inclusion = parametre === "inclusion";

  const addMetaCondition = async (API_URL, CODGEO, resultat, TYPE) => {
    setTempoMeta((prev) => [...prev, resultat]);
    const response = await fetch(`${API_URL}/getMetaVariableTerri`, {
      body: JSON.stringify({
        VARIABLE: resultat.CODE,
        TYPE: TYPE,
        CODGEO: CODGEO,
      }),
      method: "POST",
      headers: {
        // Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTempoMeta((prev) => [
      ...prev.filter((pre) => pre.CODE !== resultat.CODE),
      { ...resultat, ...data },
    ]);
    resultat.TYPE === "NOMINAL" &&
      setTempoInclusion((prev) => ({
        ...prev,
        CONDITIONS: [
          ...prev.CONDITIONS.filter((cond) => cond.CODE !== resultat.CODE),
          {
            ...prev.CONDITIONS.filter((cond) => cond.CODE === resultat.CODE)[0],
            OPTIONS: data.CHOIX,
          },
        ],
      }));
  };

  const getSubset = (tempoMeta, condition) =>
    tempoMeta.filter((meta) => meta.CODE === condition.CODE)[0];

  const showLibelle = (tempoMeta, condition) => {
    let subset = getSubset(tempoMeta, condition);
    return typeof subset !== "undefined" ? subset.LIBELLE : "";
  };

  const showType = (tempoMeta, condition) => {
    let subset = getSubset(tempoMeta, condition);
    return typeof subset !== "undefined" ? subset.TYPE : "";
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

  const handleModifyYear = (inclus, annee, meta) => {
    setTempoInclusion((prev) => {
      let toUpdate = prev.CONDITIONS.filter(
        (prevInclus) => prevInclus.CODE === inclus.CODE
      )[0];

      let exists = toUpdate.OPTIONS.map((cond) => cond.ANNEE).includes(annee);

      exists
        ? (toUpdate.OPTIONS = [
            ...toUpdate.OPTIONS.filter((cond) => cond.ANNEE !== annee),
          ])
        : (toUpdate.OPTIONS = [
            ...toUpdate.OPTIONS.filter((cond) => cond.ANNEE !== annee),
            ...meta.CHOIX.filter((cond) => cond.ANNEE === annee),
          ]);

      return {
        ...prev,
        CONDITIONS: [
          ...prev.CONDITIONS.filter(
            (prevInclus) => prevInclus.CODE !== inclus.CODE
          ),
          toUpdate,
        ],
      };
    });
  };

  const handleModifyModaliteYear = (inclus, condition) => {
    setTempoInclusion((prev) => {
      let toUpdate = prev.CONDITIONS.filter(
        (prevInclus) => prevInclus.CODE === inclus.CODE
      )[0];

      let exists = toUpdate.OPTIONS.map((cond) => cond.KEY).includes(
        condition.KEY
      );

      exists
        ? (toUpdate.OPTIONS = [
            ...toUpdate.OPTIONS.filter((cond) => !(cond.KEY === condition.KEY)),
          ])
        : (toUpdate.OPTIONS = [...toUpdate.OPTIONS, condition]);

      return {
        ...prev,
        CONDITIONS: [
          ...prev.CONDITIONS.filter(
            (prevInclus) => prevInclus.CODE !== inclus.CODE
          ),
          toUpdate,
        ],
      };
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
          <ZoneSelection>
            {/* EN-TÊTE */}
            {/* TITRE DU PANNEAU */}
            <TitreParametre>
              Condition{addS(criteres.inclusion)} d'inclusion des territoires
            </TitreParametre>
            {/* LEGENDE DU PANNEAU */}
            <LegendeParametre>
              Créez des conditions pour sélectionner un sous-ensemble de
              territoires dans votre périmètre géographique. Tous les
              territoires de votre périmètre géographique sont sélectionnés par
              défaut.
            </LegendeParametre>
            {/* Bouton ajout de périmètre */}
            <ItemCritere
              clickable
              onClick={() => {
                changeParametre("inclusion");
                setTempoInclusion({ KEY: setKeyCondition(), CONDITIONS: [] });
              }}
            >
              <AddButton />
              Ajouter une condition d'inclusion
            </ItemCritere>

            {/* MODIFICATION DE LA CONDITION SELECTIONNEE */}
            {inclusion && (
              <ZoneSelection>
                {/* Barre de recherche pour les variables */}
                <BarreRecherche
                  tempo={tempoInclusion}
                  setTempo={setTempoInclusion}
                  parametre="inclusion"
                  addMetaCondition={addMetaCondition}
                />

                <CarteSelection flex="column" background>
                  <TitreCarteSelection>
                    CONDITION{addS(tempoInclusion.CONDITIONS)} SÉLECTIONNÉE
                    {addS(tempoInclusion.CONDITIONS)} :
                  </TitreCarteSelection>
                  {tempoInclusion.CONDITIONS.length === 0 && (
                    <LegendeParametre>
                      Pas de condition. Ajoutez des conditions à partir de la
                      barre de recherche.
                    </LegendeParametre>
                  )}

                  {/* ZONE DE LISTE DES CONDITIONS */}
                  {hasCritere(tempoInclusion.CONDITIONS) && (
                    <>
                      {tempoInclusion.CONDITIONS.sort((a, b) =>
                        a.LIBELLE.localeCompare(b.LIBELLE)
                      ).map((condition) => (
                        // Chaque critère d'inclusion est contenu dans une carte
                        <CarteSelection>
                          {/* La colonne de gauche énumère des informations sur la variable */}
                          <Colonne>
                            {/* Son titre */}
                            <TitreCarteSelection>
                              {showLibelle(tempoMeta, condition)}
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
                                setTempoInclusion((prev) => ({
                                  ...prev,
                                  CONDITIONS: prev.CONDITIONS.filter(
                                    (prevInclus) =>
                                      prevInclus.CODE !== condition.CODE
                                  ),
                                }))
                              }
                            >
                              Supprimer ce critère
                            </Action>
                          </Colonne>
                          {/* La deuxième colonne permet de sélectionner les conditions */}
                          <SelectionModalite>
                            Conditions de l'inclusion :
                            {showType(tempoMeta, condition) === "NOMINAL" ? (
                              <ConditionCritereNominal
                                META={getSubset(tempoMeta, condition)}
                                inclus={condition}
                                handleModifyYear={handleModifyYear}
                                handleModifyModaliteYear={
                                  handleModifyModaliteYear
                                }
                              />
                            ) : (
                              <ConditionCritereContinu
                                META={
                                  tempoMeta.filter(
                                    (tempo) => tempo.CODE === condition.CODE
                                  )[0]
                                }
                                inclus={condition}
                                // setTempoInclusion={setTempoInclusion}
                              />
                            )}
                          </SelectionModalite>
                        </CarteSelection>
                      ))}
                    </>
                  )}

                  {/* ZONE DE VALIDATION DES CONDITIONS */}
                  <ZoneAction>
                    <Action
                      onClick={() => {
                        changeParametre("default");
                        setCriteres((prev) => ({
                          ...prev,
                          inclusion: [...prev.inclusion, tempoInclusion],
                        }));
                        setTempoInclusion({});
                        setTempoMeta([]);
                      }}
                      choix="VALIDER"
                    >
                      Valider
                    </Action>
                    <Action
                      onClick={() => {
                        changeParametre("default");
                        setTempoInclusion({});
                        setTempoMeta([]);
                      }}
                      choix="ANNULER"
                    >
                      Annuler
                    </Action>
                  </ZoneAction>
                </CarteSelection>
              </ZoneSelection>
            )}

            {/* LISTE DES CONDITIONS EXISTANTES EN FORMAT MINI*/}

            {hasCritere(criteres.inclusion) && (
              <ZoneParametres>
                {criteres.inclusion
                  .filter((inclusion) => inclusion.KEY !== tempoInclusion.KEY)
                  .map((incluElem, index) => (
                    <ParametreItemCritere>
                      <ItemCritere>Condition {index}</ItemCritere>
                      <ParameterButton
                        onClick={() => {
                          setTempoInclusion({ ...incluElem });
                          changeParametre("inclusion");
                        }}
                      />
                      <ClosingButton
                        onClick={() =>
                          setCriteres((prev) => ({
                            ...prev,
                            inclusion: prev.inclusion.filter(
                              (perim) => perim.KEY !== incluElem.KEY
                            ),
                          }))
                        }
                      ></ClosingButton>
                    </ParametreItemCritere>
                  ))}
              </ZoneParametres>
            )}
          </ZoneSelection>
        </BoiteParametre>
      )}
    </>
  );
};

export default CritereInclusion;
