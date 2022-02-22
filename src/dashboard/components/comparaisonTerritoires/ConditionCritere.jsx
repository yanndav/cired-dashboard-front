// import React, { useState,useEffect } from "react";
import {
  AddCondition,
  ConditionsContainer,
  TitleCondition,
} from "./StyledComparaison";

const ConditionCritere = ({ condition, inclus, setTempoInclusion }) => {
  const isSelected = (condition, filtreKey, condCode) =>
    Object.keys(condition).includes("FILTRES") &&
    Object.keys(condition.FILTRES).includes(filtreKey) &&
    condition.FILTRES[filtreKey] === condCode;

  const handleAddFiltre = (inclus, filtreKey, codeOption) => {
    setTempoInclusion((prev) => {
      let toUpdate = prev.filter(
        (prevInclus) => prevInclus.CODE === inclus.CODE
      )[0];

      let toModify = condition;

      Object.keys(toModify).includes("FILTRES")
        ? Object.keys(toModify.FILTRES).includes(filtreKey)
          ? (toModify.FILTRES[filtreKey] = codeOption)
          : (toModify.FILTRES = {
              ...toModify.FILTRES,
              [filtreKey]: codeOption,
            })
        : (toModify.FILTRES = { [filtreKey]: codeOption });

      toUpdate.CONDITIONS = [
        ...toUpdate.CONDITIONS.filter(
          (prevCond) => prevCond.key !== condition.key
        ),
        toModify,
      ];
      return [
        ...prev.filter((prevInclus) => prevInclus.CODE !== inclus.CODE),
        toUpdate,
      ];
    });
  };

  return (
    <ConditionsContainer background>
      {Object.keys(inclus).includes("FILTRES") &&
        Object.keys(inclus.FILTRES).map((filtreKey) => (
          <>
            <TitleCondition>
              {inclus.FILTRES[filtreKey].LIBELLE} :
            </TitleCondition>
            <ConditionsContainer>
              {inclus.FILTRES[filtreKey].OPTIONS.map((option) => (
                <AddCondition
                  selectMode
                  selected={isSelected(condition, filtreKey, option.CODE)}
                  onClick={() =>
                    handleAddFiltre(inclus, filtreKey, option.CODE)
                  }
                >
                  {option.LIBELLE}
                </AddCondition>
              ))}
            </ConditionsContainer>
          </>
        ))}
    </ConditionsContainer>
  );
};

export default ConditionCritere;
