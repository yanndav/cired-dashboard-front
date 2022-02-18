import React from "react";
import {
  BoiteParametre,
  TitreParametre,
  LegendeParametre,
  ZoneSelection,
  Action,
  ZoneAction,
  AddButton,
  ZoneParametres,
  ItemCritere,
  ParameterButton,
  CarteSelection,
  TitreCarteSelection,
  Colonne,
  PetitTexte,
  SelectionModalite,
  CheckBoxContainer,
  CheckBox,
  Checked,
} from "./StyledComparaison";

import { hasCritere, isOpen, addS } from "./fonctionsComparaison";

const CritereInclusion = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
}) => {
  return (
    <>
      {(parametre === "default" || parametre === "inclusion") && (
        <BoiteParametre
          isOpen={isOpen(parametre)}
          hasCritere={hasCritere(criteres.inclusion)}
        >
          <ZoneSelection
            onClick={() =>
              !isOpen(parametre) &&
              !hasCritere(criteres.inclusion) &&
              changeParametre("inclusion")
            }
          >
            <TitreParametre>
              Critère{addS(criteres.inclusion)} d'inclusion des territoires
            </TitreParametre>
            {hasCritere(criteres.inclusion) && parametre === "default" ? (
              <ZoneParametres>
                {criteres.inclusion.map((inclusion) => (
                  <ItemCritere>{inclusion.libelle}</ItemCritere>
                ))}
                <ItemCritere
                  clickable
                  onClick={() => changeParametre("inclusion")}
                >
                  <ParameterButton />
                  Modifier les critères d'inclusion des territoires
                </ItemCritere>
              </ZoneParametres>
            ) : (
              <LegendeParametre>
                Sélectionnez les variables et les modalités qui définissent
                l'inclusion à la comparaison des territoires compris dans le
                périmètre géographique. Tous les territoires sont sélectionnés
                par défaut.
              </LegendeParametre>
            )}
          </ZoneSelection>

          {parametre === "inclusion" && (
            <ZoneSelection>
              <LegendeParametre>
                Critère{addS(criteres.inclusion)} sélectionné
                {addS(criteres.inclusion)} :
              </LegendeParametre>
              {hasCritere(criteres.inclusion) && (
                <>
                  {criteres.inclusion.map((inclusion) => (
                    <CarteSelection>
                      <Colonne>
                        <TitreCarteSelection>
                          {inclusion.libelle}
                        </TitreCarteSelection>
                        <PetitTexte>
                          <AddButton />
                          Plus d'information
                        </PetitTexte>
                      </Colonne>
                      <div>
                        Modalités:
                        <SelectionModalite>
                          {inclusion.modalites.map((modalite) => (
                            <CheckBoxContainer>
                              <CheckBox>
                                <Checked checked={modalite.select} />
                              </CheckBox>
                              <span>{modalite.libelle}</span>
                            </CheckBoxContainer>
                          ))}
                        </SelectionModalite>
                      </div>
                    </CarteSelection>
                  ))}
                </>
              )}
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
            </ZoneSelection>
          )}
        </BoiteParametre>
      )}
    </>
  );
};

export default CritereInclusion;
