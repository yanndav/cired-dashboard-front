import React from "react";
import {
  AddCondition,
  ConditionsContainer,
  TitleCondition,
  MaxHeightContainer,
} from "./StyledComparaison";
const ConditionCritereNominal = ({
  META,
  inclus,
  handleModifyYear,
  handleModifyModaliteYear,
}) => {
  return (
    <>
      {META && META.CHOIX ? (
        <>
          {" "}
          <span>Années :</span>
          <ConditionsContainer>
            {META &&
              META.ANNEES.sort().map((annee) => (
                <AddCondition
                  selectMode
                  selected={
                    inclus.OPTIONS &&
                    inclus.OPTIONS.map((cond) => cond.ANNEE).includes(annee)
                  }
                  onClick={() => handleModifyYear(inclus, annee, META)}
                >
                  {annee}
                </AddCondition>
              ))}
          </ConditionsContainer>
          <MaxHeightContainer>
            {META &&
              META.ANNEES.sort()
                .filter(
                  (annee) =>
                    inclus.OPTIONS &&
                    inclus.OPTIONS.map((cond) => cond.ANNEE).includes(annee)
                )
                .map((annee) => (
                  <ConditionsContainer background>
                    <TitleCondition>{annee}</TitleCondition>
                    <ConditionsContainer>
                      {META.CHOIX &&
                        META.CHOIX.filter((cond) => cond.ANNEE === annee)
                          .sort((a, b) => a.KEY - b.KEY)
                          .map((cond) => (
                            <AddCondition
                              selectMode
                              selected={
                                inclus.OPTIONS &&
                                inclus.OPTIONS.map(
                                  (condi) => condi.KEY
                                ).includes(cond.KEY)
                              }
                              onClick={() =>
                                handleModifyModaliteYear(inclus, cond)
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
