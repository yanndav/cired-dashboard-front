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
  ParametreItemCritere,
  AddButton,
  ClosingButton,
} from "./StyledComparaison";

import { setKeyCondition, hasCritere } from "./fonctionsComparaison";
import BarreRecherche from "./BarreRecherche";
const nbTer = 3;

const UniteComparaison = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
}) => {
  const [tempoUnite, setTempoUnite] = useState({});

  return (
    <>
      {(parametre === "default" || parametre === "unite") && (
        <BoiteParametre
          isOpen={parametre !== "default"}
          hasCritere={hasCritere(tempoUnite)}
        >
          <ZoneSelection>
            {/* EN-TÊTE */}
            {/* TITRE DU PANNEAU */}
            <TitreParametre>Unité géographique de comparaison</TitreParametre>
            {/* LEGENDE DU PANNEAU */}
            <LegendeParametre>
              Choisissez l'échelle à partir de laquelle les territoires doivent
              être comparés.
            </LegendeParametre>
            {/* BOUTON AJOUT D'UNITE */}
            <ItemCritere
              clickable
              onClick={() => {
                changeParametre("unite");
                setTempoUnite({ KEY: setKeyCondition(), CONDITIONS: [] });
              }}
            >
              <AddButton />
              Ajouter une unité géographique de comparaison
            </ItemCritere>

            {/* MODIFICATION DE LA CONDITION SELECTIONNEE */}
            {parametre === "unite" && (
              <>
                <ZoneSelection>
                  {/* BARRE DE RECHERCHE */}
                  <BarreRecherche
                    tempo={tempoUnite}
                    setTempo={setTempoUnite}
                    parametre="unite"
                  />
                  {/* CARTE DE CONDITION */}
                  <CarteSelection background flex="column">
                    <TitreCarteSelection>
                      Échelle de comparaison :
                    </TitreCarteSelection>
                    {tempoUnite.CONDITIONS.length === 0 && (
                      <LegendeParametre>
                        Pas de condition. Ajoutez des conditions à partir de la
                        barre de recherche.
                      </LegendeParametre>
                    )}
                    {hasCritere(tempoUnite.CONDITIONS) &&
                      tempoUnite.CONDITIONS.map((condition, index) => (
                        <CarteSelection flex="ROW">
                          <TitreCarteSelection>
                            {index >= 1 && "ET "}
                            PAR
                          </TitreCarteSelection>
                          <ParametreItemCritere>
                            <ItemCritere>{condition.LIBELLE}</ItemCritere>
                            <ClosingButton
                              onClick={() =>
                                setTempoUnite((prev) => ({
                                  ...prev,
                                  CONDITIONS: prev.CONDITIONS.filter(
                                    (prevElem) => prevElem.KEY !== condition.KEY
                                  ),
                                }))
                              }
                            />
                          </ParametreItemCritere>
                        </CarteSelection>
                      ))}
                  </CarteSelection>
                </ZoneSelection>
                <ZoneAction>
                  <Action
                    onClick={() => {
                      setCriteres((prev) => ({
                        ...prev,
                        unite: [
                          ...prev.unite.filter(
                            (prevElem) => prevElem.KEY !== tempoUnite.KEY
                          ),
                          tempoUnite,
                        ],
                      }));
                      setTempoUnite({});
                      changeParametre("default");
                    }}
                    choix="VALIDER"
                  >
                    Valider
                  </Action>
                  <Action
                    onClick={() => {
                      changeParametre("default");
                      setTempoUnite({});
                    }}
                    choix="ANNULER"
                  >
                    Annuler
                  </Action>
                </ZoneAction>
              </>
            )}

            {/* LISTE DES UNITES */}

            {hasCritere(criteres.unite) && (
              <ZoneParametres>
                {criteres.unite
                  .filter((unite) => unite.KEY !== tempoUnite.KEY)
                  .map((uniteElem, idx) => (
                    <ParametreItemCritere>
                      <ItemCritere>
                        {uniteElem.CONDITIONS.length === 0
                          ? "Unité " + (idx + 1)
                          : uniteElem.CONDITIONS.map(
                              (condUnite, id) =>
                                (id > 0 ? " et par " : "Par ") +
                                condUnite.LIBELLE.toLowerCase()
                            )}
                      </ItemCritere>
                      <ParameterButton
                        onClick={() => {
                          setTempoUnite({ ...uniteElem });
                          changeParametre("unite");
                        }}
                      />
                      <ClosingButton
                        onClick={() =>
                          setCriteres((prev) => ({
                            ...prev,
                            unite: prev.unite.filter(
                              (perim) => perim.KEY !== uniteElem.KEY
                            ),
                          }))
                        }
                      />
                    </ParametreItemCritere>
                  ))}
              </ZoneParametres>
            )}
          </ZoneSelection>
        </BoiteParametre>
      )}
    </>
  );
};

export default UniteComparaison;
