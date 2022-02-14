import React from "react";
import {
  BoiteParametre,
  TitreParametre,
  LegendeParametre,
  ZoneSelection,
  Validateur,
} from "./StyledComparaison";
const PerimetreGeographique = ({ parametre, changeParametre }) => {
  return (
    <>
      {(parametre === "default" || parametre === "perimetre") && (
        <BoiteParametre isOpen={parametre !== "default"}>
          <ZoneSelection onClick={() => changeParametre("perimetre")}>
            <TitreParametre>Périmètre géographique</TitreParametre>
            <LegendeParametre>
              Définissez les zones géographiques que vous souhaitez inclure dans
              votre analyse.
            </LegendeParametre>
          </ZoneSelection>
          {parametre === "perimetre" && (
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

export default PerimetreGeographique;
