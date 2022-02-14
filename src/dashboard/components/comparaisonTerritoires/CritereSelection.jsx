import React from "react";
import {
  BoiteParametre,
  TitreParametre,
  LegendeParametre,
  ZoneSelection,
  Validateur,
} from "./StyledComparaison";
const CritereComparaison = ({ parametre, changeParametre }) => {
  return (
    <>
      {(parametre === "default" || parametre === "critere") && (
        <BoiteParametre isOpen={parametre !== "default"}>
          <ZoneSelection onClick={() => changeParametre("critere")}>
            <TitreParametre>Critères de sélection</TitreParametre>
            <LegendeParametre>
              Définissez les variables et les modalités qui permettent
              l'inclusion des territoires dans la comparaison.
            </LegendeParametre>
          </ZoneSelection>
          {parametre === "critere" && (
            <>
              <Validateur onClick={() => changeParametre("default")}>
                Valider
              </Validateur>
            </>
          )}
        </BoiteParametre>
      )}
    </>
  );
};

export default CritereComparaison;
