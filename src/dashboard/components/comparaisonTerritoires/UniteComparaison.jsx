import React, { useState } from "react";
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
  CarteSelection,
  TitreCarteSelection,
  PetitTexte,
} from "./StyledComparaison";

import { isOpen, hasCritere } from "./fonctionsComparaison";
import BarreRecherche from "./BarreRecherche";
const nbTer = 3;

const UniteComparaison = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
}) => {
  const [tempoUnite, setTempoUnite] = useState({ ...criteres.unite });

  return (
    <>
      {(parametre === "default" || parametre === "unite") && (
        <BoiteParametre
          isOpen={parametre !== "default"}
          hasCritere={hasCritere(tempoUnite)}
        >
          <ZoneSelection
            onClick={() =>
              !isOpen(parametre) &&
              !hasCritere(tempoUnite) &&
              changeParametre("unite")
            }
          >
            <TitreParametre>Unité géographique de comparaison</TitreParametre>
            {hasCritere(tempoUnite) && parametre === "default" ? (
              <ZoneParametres>
                <ItemCritere>Comparer les {tempoUnite.LIBELLE}</ItemCritere>
                <ItemCritere clickable onClick={() => changeParametre("unite")}>
                  <ParameterButton />
                  Changer d'unité géographique de comparaison
                </ItemCritere>
              </ZoneParametres>
            ) : (
              <LegendeParametre>
                Choisissez l'échelle à partir de laquelle les territoires
                doivent être comparés.
              </LegendeParametre>
            )}
          </ZoneSelection>
          {parametre === "unite" && (
            <>
              <ZoneSelection>
                <BarreRecherche
                  tempo={tempoUnite}
                  setTempo={setTempoUnite}
                  unique
                  parametre="unite"
                />
                Vous avez choisi de
                <CarteSelection>
                  <TitreCarteSelection>
                    Comparer les {tempoUnite.LIBELLE}
                    <PetitTexte>
                      Vous allez comparer {nbTer} territoires correspondants à
                      cette unité d'analyse.
                    </PetitTexte>
                  </TitreCarteSelection>
                </CarteSelection>
              </ZoneSelection>
              <ZoneAction>
                <Action
                  onClick={() => {
                    setCriteres((prev) => ({ ...prev, unite: tempoUnite }));
                    changeParametre("default");
                  }}
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
            </>
          )}
        </BoiteParametre>
      )}
    </>
  );
};

export default UniteComparaison;
