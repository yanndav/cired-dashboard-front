import React from "react";
import {
  BoiteParametre,
  TitreParametre,
  LegendeParametre,
  ZoneSelection,
  Action,
  ZoneAction,
  ZoneParametres,
  ItemCritere,
  ParameterButton,
} from "./StyledComparaison";

import { isOpen, hasCritere } from "./fonctionsComparaison";
const UniteComparaison = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
}) => {
  return (
    <>
      {(parametre === "default" || parametre === "unite") && (
        <BoiteParametre
          isOpen={parametre !== "default"}
          hasCritere={typeof criteres.unite !== "undefined"}
        >
          <ZoneSelection
            onClick={() =>
              !isOpen(parametre) &&
              !hasCritere(criteres.unite) &&
              changeParametre("unite")
            }
          >
            <TitreParametre>Unité géographique de comparaison</TitreParametre>
            {hasCritere(criteres.unite) && parametre === "default" ? (
              <ZoneParametres>
                <ItemCritere>Comparer les {criteres.unite.libelle}</ItemCritere>
                <ItemCritere clickable onClick={() => changeParametre("unite")}>
                  <ParameterButton />
                  Changer d'unité géographique de comparaison
                </ItemCritere>
              </ZoneParametres>
            ) : (
              <LegendeParametre>
                Choisissez l'échelle à laquelle les territoires doivent être
                comparés.
              </LegendeParametre>
            )}
          </ZoneSelection>
          {parametre === "unite" && (
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

export default UniteComparaison;
