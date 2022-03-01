import React from "react";
import {
  AddCondition,
  ConditionsContainer,
  TitleCondition,
  MaxHeightContainer,
} from "./StyledComparaison";
const ConditionCritereNominal = ({
  condition,
  handleModifyYear,
  handleModifyModaliteYear,
}) => {
  return (
    <>
      {condition && condition.CHOIX ? (
        <>
          {" "}
          <span>Années :</span>
          <ConditionsContainer>
            {condition &&
              condition.ANNEES &&
              condition.ANNEES.sort().map((annee) => (
                <AddCondition
                  selectMode
                  selected={
                    condition.CHOIX &&
                    condition.CHOIX.map((cond) => cond.ANNEE).includes(annee)
                  }
                  onClick={() => handleModifyYear(condition, annee)}
                >
                  {annee}
                </AddCondition>
              ))}
          </ConditionsContainer>
          <MaxHeightContainer>
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
          </MaxHeightContainer>
        </>
      ) : (
        <span>Chargement en cours des critères de sélection</span>
      )}
    </>
  );
};

export default ConditionCritereNominal;
