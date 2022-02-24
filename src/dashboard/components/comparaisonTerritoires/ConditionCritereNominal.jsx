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
      {META && inclus.CONDITIONS ? (
        <>
          {" "}
          <span>Années :</span>
          <ConditionsContainer>
            {META &&
              META.ANNEES.sort().map((annee) => (
                <AddCondition
                  selectMode
                  selected={
                    inclus.CONDITIONS &&
                    inclus.CONDITIONS.filter((cond) => cond.SELECT)
                      .map((cond) => cond.ANNEE)
                      .includes(annee)
                  }
                  onClick={() => handleModifyYear(inclus, annee)}
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
                    inclus.CONDITIONS &&
                    inclus.CONDITIONS.filter((cond) => cond.SELECT)
                      .map((cond) => cond.ANNEE)
                      .includes(annee)
                )
                .map((annee) => (
                  <ConditionsContainer background>
                    <TitleCondition>{annee}</TitleCondition>
                    <ConditionsContainer>
                      {inclus.CONDITIONS &&
                        inclus.CONDITIONS.filter((cond) => cond.ANNEE === annee)
                          .sort((a, b) => a.KEY - b.KEY)
                          .map((cond) => (
                            <AddCondition
                              selectMode
                              selected={
                                inclus.CONDITIONS &&
                                inclus.CONDITIONS.filter(
                                  (condi) => condi.KEY === cond.KEY
                                )[0].SELECT
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
