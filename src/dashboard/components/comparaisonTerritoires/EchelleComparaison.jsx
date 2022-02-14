import React from "react";
import {
  BoiteParametre,
  TitreParametre,
  LegendeParametre,
  ZoneSelection,
  Validateur,
} from "./StyledComparaison";
const EchelleComparaison = ({ parametre, changeParametre }) => {
  return (
    <>
      {(parametre === "default" || parametre === "echelle") && (
        <BoiteParametre isOpen={parametre !== "default"}>
          <ZoneSelection onClick={() => changeParametre("echelle")}>
            <TitreParametre>Échelle d'analyse</TitreParametre>
            <LegendeParametre>
              Choisissez l'échelle d'analyse et de comparaison des critères de
              sélection.
            </LegendeParametre>
          </ZoneSelection>
          {parametre === "echelle" && (
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

export default EchelleComparaison;
