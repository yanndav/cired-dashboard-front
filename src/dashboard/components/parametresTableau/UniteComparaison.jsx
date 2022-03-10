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
  ParametreItemCritere,
  AddButton,
  ClosingButton,
  LayerImg,
} from "./StyledComparaison";

import { setKeyCondition, hasCritere } from "./fonctionsComparaison";
import BarreRecherche from "./BarreRecherche";

const UniteComparaison = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
  isComparaison,
}) => {
  const [tempoUnite, setTempoUnite] = useState({});

  return (
    <>
      {(parametre === "default" || parametre === "unite") && (
        <BoiteParametre>
          <ZoneSelection>
            {/* EN-TÊTE */}
            {/* TITRE DU PANNEAU */}
            <TitreParametre>
              <LayerImg />
              {isComparaison
                ? "Définir les échelles de comparaison"
                : "Définir les échelles d'analyse"}
            </TitreParametre>
            {/* LEGENDE DU PANNEAU */}
            <LegendeParametre>
              {isComparaison
                ? " Choisissez les échelles à partir de laquelle les territoires doivent être comparés."
                : "Vous pouvez choisir différentes échelles d’analyse, de la commune à la région, en passant par les zonages d’étude de l’INSEE. Ou bien vous pouvez aussi lancer une analyse à l'échelle de votre périmètre géographique unifié."}
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
              {isComparaison
                ? "Ajouter une échelle de comparaison"
                : "Ajouter une échelle d'analyse"}
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
                      {isComparaison
                        ? "Échelle de comparaison :"
                        : "Unité d'analyse"}
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
