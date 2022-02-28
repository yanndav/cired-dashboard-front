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
  EditButton,
  TerritoiresSelectionnes,
  TitreCarteSelection,
  CarteSelection,
} from "./StyledComparaison";
import { addS, isOpen, hasCritere } from "./fonctionsComparaison";

import BarreRecherche from "./BarreRecherche";

const handleName = (name) => (name === "" ? "Périmètre sans nom" : name);

const setName = (libelle) =>
  libelle === "" ? "Nommez votre périmètre" : libelle;

const setKeyPerimetre = () => (Math.random() + 1).toString(36).substring(7);

const PerimetreGeographique = ({
  parametre,
  changeParametre,
  criteres,
  setCriteres,
}) => {
  const [tempoPerimetre, setTempoPerimetre] = useState({});
  const [editName, setEditName] = useState(false);
  const [tempoLib, setTempoLib] = useState("");

  return (
    <>
      {(parametre === "default" || parametre === "perimetre") && (
        <BoiteParametre>
          <ZoneSelection
          // onClick={() => {
          //   if (!isOpen(parametre) && !hasCritere(criteres.perimetre)) {
          //     changeParametre("perimetre");
          //     setTempoPerimetre({
          //       LIBELLE: "",
          //       TERRITOIRES: [],
          //     });
          //   }
          // }}
          >
            {/* EN-TETE */}
            {/* TITRE */}
            <TitreParametre>
              Périmètre{addS(criteres.perimetre)} géographique
              {addS(criteres.perimetre)}
            </TitreParametre>
            {/* Légende */}
            <LegendeParametre>
              Définissez les zones géographiques que vous souhaitez inclure dans
              votre analyse.
            </LegendeParametre>
            {/* Bouton ajout de périmètre */}
            <ItemCritere
              clickable
              onClick={() => {
                changeParametre("perimetre");
                setTempoPerimetre({
                  LIBELLE: "",
                  KEY: setKeyPerimetre(),
                  TERRITOIRES: [],
                });
              }}
            >
              <AddButton />
              Ajouter un périmètre géographique
            </ItemCritere>

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
                        <EditButton
                          onClick={() => setEditName((prev) => !prev)}
                        />
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
                  <ZoneAction>
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
