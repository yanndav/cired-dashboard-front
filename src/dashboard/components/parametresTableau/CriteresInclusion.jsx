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
import ContainerConditionsContinu from "./ConditionCritereContinu";
import BarreRecherche from "./BarreRecherche";
import ConditionCritereNominal from "./ConditionCritereNominal";

const CritereInclusion = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
}) => {
  const [tempoInclusion, setTempoInclusion] = useState({});
  const inclusion = parametre === "inclusion";

  const addMetaCondition = async (API_URL, CODGEO, resultat, TYPE) => {
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
    console.log({
      VARIABLE: resultat.CODE,
      TYPE: TYPE,
      CODGEO: CODGEO,
    });
    const data = await response.json();
    resultat.TYPE === "NOMINAL"
      ? setTempoInclusion((prev) => ({
          ...prev,
          CONDITIONS: [
            ...prev.CONDITIONS.filter((cond) => cond.KEY !== resultat.KEY),
            {
              ...prev.CONDITIONS.filter((cond) => cond.KEY === resultat.KEY)[0],
              ...data,
              CHOIX: data.OPTIONS,
            },
          ],
        }))
      : setTempoInclusion((prev) => ({
          ...prev,
          CONDITIONS: [
            ...prev.CONDITIONS.filter((cond) => cond.KEY !== resultat.KEY),
            {
              ...prev.CONDITIONS.filter((cond) => cond.KEY === resultat.KEY)[0],
              ...data,
            },
          ],
        }));
  };

  const handleModifyYear = (inclus, annee) => {
    setTempoInclusion((prev) => {
      let toUpdate = prev.CONDITIONS.filter(
        (prevInclus) => prevInclus.KEY === inclus.KEY
      )[0];

      let exists = toUpdate.CHOIX.map((cond) => cond.ANNEE).includes(annee);

      exists
        ? (toUpdate.CHOIX = [
            ...toUpdate.CHOIX.filter((cond) => cond.ANNEE !== annee),
          ])
        : (toUpdate.CHOIX = [
            ...toUpdate.CHOIX.filter((cond) => cond.ANNEE !== annee),
            ...toUpdate.OPTIONS.filter((cond) => cond.ANNEE === annee),
          ]);

      return {
        ...prev,
        CONDITIONS: [
          ...prev.CONDITIONS.filter(
            (prevInclus) => prevInclus.KEY !== inclus.KEY
          ),
          toUpdate,
        ],
      };
    });
  };

  const handleModifyModaliteYear = (inclus, condition) => {
    setTempoInclusion((prev) => {
      let toUpdate = prev.CONDITIONS.filter(
        (prevInclus) => prevInclus.KEY === inclus.KEY
      )[0];

      let exists = toUpdate.CHOIX.map((cond) => cond.KEY).includes(
        condition.KEY
      );

      exists
        ? (toUpdate.CHOIX = [
            ...toUpdate.CHOIX.filter((cond) => !(cond.KEY === condition.KEY)),
          ])
        : (toUpdate.CHOIX = [...toUpdate.CHOIX, condition]);

      return {
        ...prev,
        CONDITIONS: [
          ...prev.CONDITIONS.filter(
            (prevInclus) => prevInclus.KEY !== inclus.KEY
          ),
          toUpdate,
        ],
      };
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
                    Variable{addS(tempoInclusion.CONDITIONS)} sélectionnée
                    {addS(tempoInclusion.CONDITIONS)} dans cette condition de
                    l'inclusion :
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
                      ).map(
                        (condition, indx) =>
                          condition.LIBELLE && (
                            // Chaque critère d'inclusion est contenu dans une carte
                            <CarteSelection>
                              {/* La colonne de gauche énumère des informations sur la variable */}
                              <Colonne>
                                {/* SI PLUS DE UNE VARIABLE => ET */}
                                {indx >= 1 && (
                                  <TitreCarteSelection>ET</TitreCarteSelection>
                                )}
                                {/* Son titre */}
                                <TitreCarteSelection>
                                  {condition.LIBELLE.toUpperCase()}
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
                                          prevInclus.KEY !== condition.KEY
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
                                {condition.TYPE === "NOMINAL" ? (
                                  <ConditionCritereNominal
                                    condition={condition}
                                    handleModifyYear={handleModifyYear}
                                    handleModifyModaliteYear={
                                      handleModifyModaliteYear
                                    }
                                  />
                                ) : (
                                  <ContainerConditionsContinu
                                    condition={condition}
                                    setTempoInclusion={setTempoInclusion}
                                    // handleModifyModaliteYear={
                                    //   handleModifyModaliteYear
                                    // }
                                    //   handleModifyFiltre
                                  />
                                )}
                              </SelectionModalite>
                            </CarteSelection>
                          )
                      )}
                    </>
                  )}

                  {/* ZONE DE VALIDATION DES CONDITIONS */}
                  <ZoneAction>
                    <Action
                      onClick={() => {
                        changeParametre("default");
                        setCriteres((prev) => ({
                          ...prev,
                          inclusion: [
                            ...prev.inclusion.filter(
                              (prevElem) => prevElem.KEY !== tempoInclusion.KEY
                            ),
                            tempoInclusion,
                          ],
                        }));
                        setTempoInclusion({});
                      }}
                      choix="VALIDER"
                    >
                      Valider
                    </Action>
                    <Action
                      onClick={() => {
                        changeParametre("default");
                        setTempoInclusion({});
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
                      <ItemCritere>Condition {index + 1}</ItemCritere>
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
