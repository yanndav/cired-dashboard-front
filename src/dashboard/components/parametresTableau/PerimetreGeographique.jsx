import React, { useState } from "react";
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
  SaveButton,
  AddButton,
  ItemCritere,
  NomPerimetre,
  InputNomPerimetre,
  TerritoiresSelectionnes,
  TitreCarteSelection,
  CarteSelection,
  CropImg,
} from "./StyledComparaison";
import { addS, hasCritere, setKeyCondition } from "./fonctionsComparaison";

import BarreRecherche from "./BarreRecherche";
import LocalisationMap from "./LocalisationMap";

const handleName = (name) => (name === "" ? "Périmètre sans nom" : name);

const setName = (libelle) =>
  libelle === "" ? "Nommez votre périmètre" : libelle;

const PerimetreGeographique = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
  isComparaison,
}) => {
  const [tempoPerimetre, setTempoPerimetre] = useState({});
  const [editName, setEditName] = useState(false);
  const [tempoLib, setTempoLib] = useState("");

  return (
    <>
      {(parametre === "default" || parametre === "perimetre") && (
        <BoiteParametre card>
          <ZoneSelection>
            {/* EN-TETE */}
            {/* TITRE */}
            <TitreParametre>
              <CropImg />
              Définir le{addS(criteres.perimetre)} périmètre
              {addS(criteres.perimetre)} géographique
              {addS(criteres.perimetre)}
            </TitreParametre>
            {/* Légende */}
            <LegendeParametre>
              {isComparaison
                ? "Définissez les zones géographiques que vous souhaitez inclure dans votre analyse."
                : "Vous pouvez définir librement votre périmètre géographique d'analyse en fusionnant des communes, intercos, départements et régions. Ou bien vous pouvez aussi ne vous intéresser qu’à un seul territoire."}
            </LegendeParametre>
            {/* Bouton ajout de périmètre */}
            {(isComparaison ||
              (!isComparaison &&
                parametre !== "perimetre" &&
                criteres.perimetre.length === 0)) && (
              <ItemCritere
                clickable
                onClick={() => {
                  changeParametre("perimetre");
                  setTempoPerimetre({
                    LIBELLE: "",
                    KEY: setKeyCondition(),
                    TERRITOIRES: [],
                  });
                }}
              >
                <AddButton />
                Ajouter un périmètre géographique
              </ItemCritere>
            )}

            {/* CONTENU DU PANEL QUAND OUVERT EN MODE MODIFICATION */}

            {parametre === "perimetre" && (
              <ZoneSelection>
                <BarreRecherche
                  tempo={tempoPerimetre}
                  setTempo={setTempoPerimetre}
                  parametre="perimetre"
                />
                <CarteSelection flex="column">
                  <NomPerimetre
                    isEmpty={tempoPerimetre.LIBELLE === ""}
                    isEditing={editName}
                    onClick={() => !editName && setEditName(true)}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setTempoPerimetre((prev) => ({
                        ...prev,
                        LIBELLE: tempoLib,
                      }));
                      setEditName((prev) => !prev);
                    }}
                  >
                    {editName ? (
                      <>
                        <InputNomPerimetre
                          type="text"
                          placeholder={setName(tempoPerimetre.LIBELLE)}
                          onChange={(e) => setTempoLib(e.target.value)}
                        />
                        <SaveButton
                          onClick={() => {
                            setEditName((prev) => !prev);
                            setTempoPerimetre((prev) => ({
                              ...prev,
                              LIBELLE: tempoLib,
                            }));
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {/* <EditButton
                          onClick={() => setEditName((prev) => !prev)}
                        /> */}
                        {setName(tempoPerimetre.LIBELLE)}
                      </>
                    )}
                  </NomPerimetre>

                  <TitreCarteSelection>
                    Territoire{addS(tempoPerimetre.TERRITOIRES)} inclus dans ce
                    périmètre :
                  </TitreCarteSelection>

                  <TerritoiresSelectionnes>
                    {tempoPerimetre.TERRITOIRES.length > 0
                      ? tempoPerimetre.TERRITOIRES.map((territoire) => (
                          <ParametreItemCritere>
                            <ItemCritere>{territoire.LIBGEO}</ItemCritere>
                            <ClosingButton
                              onClick={() =>
                                setTempoPerimetre((prev) => ({
                                  ...prev,
                                  TERRITOIRES: prev.TERRITOIRES.filter(
                                    (perim) =>
                                      perim.LIBGEO !== territoire.LIBGEO
                                  ),
                                }))
                              }
                            ></ClosingButton>
                          </ParametreItemCritere>
                        ))
                      : "Pas de territoire sélectionné. Ajoutez des territoires à votre périmètre à partir de la barre de recherche."}
                  </TerritoiresSelectionnes>
                  {typeof tempoPerimetre.TERRITOIRES !== "undefined" &&
                    tempoPerimetre.TERRITOIRES.length > 0 && (
                      <LocalisationMap
                        perimetre={tempoPerimetre.TERRITOIRES}
                        setCritere={setTempoPerimetre}
                        isZoomControl
                        isTerritoriesAround
                      />
                    )}
                  <ZoneAction>
                    {hasCritere(tempoPerimetre.TERRITOIRES) && (
                      <Action
                        onClick={() => {
                          changeParametre("default");
                          setCriteres((prev) => ({
                            ...prev,
                            perimetre: [
                              ...prev.perimetre.filter(
                                (prevPer) => prevPer.KEY !== tempoPerimetre.KEY
                              ),
                              tempoPerimetre,
                            ],
                          }));
                          setTempoPerimetre({});
                        }}
                        choix="VALIDER"
                      >
                        Valider
                      </Action>
                    )}
                    <Action
                      onClick={() => {
                        changeParametre("default");
                        setTempoPerimetre({});
                      }}
                      choix="ANNULER"
                    >
                      Annuler
                    </Action>
                  </ZoneAction>
                </CarteSelection>
              </ZoneSelection>
            )}

            {/* LISTE DES PERIMETRES */}
            {hasCritere(criteres.perimetre) && (
              <ZoneParametres>
                {criteres.perimetre
                  .filter((perimListe) => perimListe.KEY !== tempoPerimetre.KEY)
                  .map((perimListe) => (
                    <ParametreItemCritere>
                      <ItemCritere>
                        {handleName(perimListe.LIBELLE)}
                      </ItemCritere>
                      <ParameterButton
                        onClick={() => {
                          setTempoPerimetre({ ...perimListe });
                          changeParametre("perimetre");
                        }}
                      />
                      <ClosingButton
                        onClick={() =>
                          setCriteres((prev) => ({
                            ...prev,
                            perimetre: prev.perimetre.filter(
                              (perim) => perim.KEY !== perimListe.KEY
                            ),
                          }))
                        }
                      ></ClosingButton>
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

export default PerimetreGeographique;
