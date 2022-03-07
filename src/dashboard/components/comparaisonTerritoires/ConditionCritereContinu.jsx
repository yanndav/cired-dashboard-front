import React, { useState, useEffect } from "react";

import SliderValues from "./Slider.jsx";

import {
  AddCondition,
  ConditionsContainer,
  TitleCondition,
} from "./StyledComparaison";

const getMinMax = (CHOIX) => {
  let min = Math.min(...CHOIX.map((choix) => choix.MIN));
  let max = Math.min(...CHOIX.map((choix) => choix.MAX));

  console.log(min);
  console.log(max);
  return { MIN: min, MAX: max };
};

const getMinMaxSet = (CHOIX) => {
  let min = Math.min(...CHOIX.map((choix) => choix.MIN_SET));
  let max = Math.min(...CHOIX.map((choix) => choix.MAX_SET));

  console.log(min);
  console.log(max);
  return { MIN: min, MAX: max };
};

const getFiltres = (condition) =>
  Object.keys(condition).includes("FILTRES")
    ? [
        ...new Set(condition.CHOIX.map((cond) => JSON.stringify(cond.FILTRES))),
      ].map((cond) => JSON.parse(cond))
    : null;

const getAnnees = (condition) => [
  ...new Set(condition.CHOIX.map((cond) => cond.ANNEE)),
];

const ConditionCritereContinu = ({ condition, setTempoInclusion }) => {
  const [filtres, setFiltres] = useState(
    condition.CHOIX.length > 0
      ? { FILTRES: getFiltres(condition), ANNEES: getAnnees(condition) }
      : { FILTRES: [], ANNEES: [] }
  );

  useEffect(() => {
    // S'il y a au moins un filtre et une année, on peut charger les données
    if (
      filtres.FILTRES &&
      filtres.FILTRES.length >= 1 &&
      filtres.ANNEES.length >= 1
    ) {
      // ModificationsS
      setTempoInclusion((prev) => {
        let toUpdate = prev.CONDITIONS.filter(
          (prevInclus) => prevInclus.KEY === condition.KEY
        )[0];

        toUpdate.CHOIX = condition.OPTIONS.filter((opt) =>
          filtres.ANNEES.includes(opt.ANNEE)
        ).filter((opt) =>
          filtres.FILTRES.map((flt) => JSON.stringify(flt)).includes(
            JSON.stringify(opt.FILTRES)
          )
        );

        return {
          ...prev,
          CONDITIONS: [
            ...prev.CONDITIONS.filter(
              (prevInclus) => prevInclus.KEY !== condition.KEY
            ),
            toUpdate,
          ],
        };
      });
    } else {
      setTempoInclusion((prev) => {
        let toUpdate = prev.CONDITIONS.filter(
          (prevInclus) => prevInclus.KEY === condition.KEY
        )[0];

        toUpdate.CHOIX = [];

        return {
          ...prev,
          CONDITIONS: [
            ...prev.CONDITIONS.filter(
              (prevInclus) => prevInclus.KEY !== condition.KEY
            ),
            toUpdate,
          ],
        };
      });
    }
  }, [filtres]);

  return (
    <>
      {condition && condition.OPTIONS ? (
        <>
          <ConditionsContainer background>
            {/* ON VERIFIER S'IL Y A DES FILTRES */}
            {condition && condition.FILTRES && (
              <>
                <TitleCondition>Filtres :</TitleCondition>
                <ConditionsContainer>
                  {condition.FILTRES.sort((a, b) =>
                    a.LIBELLE.localeCompare(b.LIBELLE)
                  ).map((flt) => (
                    <AddCondition
                      selectMode
                      selected={filtres.FILTRES.map((flt) =>
                        JSON.stringify(flt)
                      ).includes(JSON.stringify(flt.FILTRE))}
                      onClick={() =>
                        !filtres.FILTRES.map((filt) =>
                          JSON.stringify(filt)
                        ).includes(JSON.stringify(flt.FILTRE))
                          ? setFiltres((prev) => ({
                              ...prev,
                              FILTRES: [...prev.FILTRES, flt.FILTRE],
                            }))
                          : setFiltres((prev) => ({
                              ...prev,
                              FILTRES: [
                                ...prev.FILTRES.filter(
                                  (filt) =>
                                    JSON.stringify(filt) !==
                                    JSON.stringify(flt.FILTRE)
                                ),
                              ],
                            }))
                      }
                    >
                      {flt.LIBELLE}
                    </AddCondition>
                  ))}
                </ConditionsContainer>
              </>
            )}

            {/* SELECTION DES ANNEES */}
            {condition && condition.ANNEES && (
              <>
                <TitleCondition>Années :</TitleCondition>

                {condition.ANNEES.sort().map((annee) => (
                  <AddCondition
                    selectMode
                    selected={filtres.ANNEES.includes(annee)}
                    onClick={() =>
                      !filtres.ANNEES.includes(annee)
                        ? setFiltres((prev) => ({
                            ...prev,
                            ANNEES: [...prev.ANNEES, annee],
                          }))
                        : setFiltres((prev) => ({
                            ...prev,
                            ANNEES: [
                              ...prev.ANNEES.filter((filt) => filt !== annee),
                            ],
                          }))
                    }
                  >
                    {annee}
                  </AddCondition>
                ))}
              </>
            )}
            {/* SELECTION DE LA VALEUR */}
            {condition && condition.CHOIX && condition.CHOIX.length > 0 && (
              <>
                <TitleCondition>{condition.UNITE} :</TitleCondition>

                <SliderValues
                  MIN={getMinMax(condition.CHOIX).MIN}
                  MAX={getMinMax(condition.CHOIX).MAX}
                  MIN_SET={getMinMaxSet(condition.CHOIX).MIN}
                  MAX_SET={getMinMaxSet(condition.CHOIX).MAX}
                  setTempoInclusion={setTempoInclusion}
                  KEY={condition.KEY}
                />
              </>
            )}
          </ConditionsContainer>
          {/* <MaxHeightContainer>
            {condition &&
              condition.ANNEES &&
              condition.ANNEES.sort()
                .filter(
                  (annee) =>
                    condition.CHOIX &&
                    condition.CHOIX.map((cond) => cond.ANNEE).includes(annee)
                )
                .map((annee) => (
                  <ConditionsContainer background>
                    <TitleCondition>{annee}</TitleCondition>
                    <ConditionsContainer>
                      {condition.OPTIONS &&
                        condition.OPTIONS.filter((cond) => cond.ANNEE === annee)
                          .sort((a, b) => a.KEY - b.KEY)
                          .map((cond) => (
                            <AddCondition
                              selectMode
                              selected={
                                condition.CHOIX &&
                                condition.CHOIX.map(
                                  (condi) => condi.KEY
                                ).includes(cond.KEY)
                              }
                              onClick={() =>
                                handleModifyModaliteYear(condition, cond)
                              }
                            >
                              {cond.LIBELLE}
                            </AddCondition>
                          ))}
                    </ConditionsContainer>
                  </ConditionsContainer>
                ))}
          </MaxHeightContainer> */}
        </>
      ) : (
        <span>Chargement en cours des critères de sélection</span>
      )}
    </>
  );
};

export default ConditionCritereContinu;
