import React from "react";
import {
  BoiteParametre,
  TitreParametre,
  LegendeParametre,
  ZoneSelection,
  ClosingButton,
  ParameterButton,
  Action,
  ZoneAction,
  ZoneParametres,
  ParametreItemCritere,
  AddButton,
  ItemCritere,
} from "./StyledComparaison";
import { addS, isOpen, hasCritere } from "./fonctionsComparaison";
const PerimetreGeographique = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
}) => {
  return (
    <>
      {(parametre === "default" || parametre === "perimetre") && (
        <BoiteParametre
          isOpen={parametre !== "default"}
          hasCritere={typeof criteres.perimetre !== "undefined"}
        >
          <ZoneSelection
            onClick={() =>
              !isOpen(parametre) &&
              !hasCritere(criteres.perimetre) &&
              changeParametre("perimetre")
            }
          >
            <TitreParametre>
              Périmètre{addS(criteres.perimetre)} géographique
            </TitreParametre>
            {hasCritere(criteres.perimetre) && parametre === "default" ? (
              <ZoneParametres>
                {criteres.perimetre.map((perimetre) => (
                  <ParametreItemCritere>
                    <ItemCritere>{perimetre.libelle}</ItemCritere>
                    <ParameterButton
                      onClick={() => console.log("modify", perimetre.libelle)}
                    />
                    <ClosingButton
                      onClick={() => console.log("delete")}
                    ></ClosingButton>
                  </ParametreItemCritere>
                ))}
                <ItemCritere
                  clickable
                  onClick={() => changeParametre("perimetre")}
                >
                  <AddButton />
                  Ajouter un périmètre géographique
                </ItemCritere>
              </ZoneParametres>
            ) : (
              <LegendeParametre>
                Définissez les zones géographiques que vous souhaitez inclure
                dans votre analyse.
              </LegendeParametre>
            )}
          </ZoneSelection>
          {parametre === "perimetre" && (
            <ZoneAction>
              <Action
                onClick={() => changeParametre("default")}
                choix="VALIDER"
              >
                Valider
              </Action>
              <Action
                onClick={() => changeParametre("default")}
                choix="ANNULER"
              >
                Annuler
              </Action>
            </ZoneAction>
          )}
        </BoiteParametre>
      )}
    </>
  );
};

export default PerimetreGeographique;
