import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { colorsLight } from "../../../app/colorComponents";
import { FiFilter } from "react-icons/fi";
import { setKeyCondition, typeTerritoire } from "./fonctionsComparaison";
import { apiRecommendation, handleSearch } from "./LocalisationFunctions";

import { AppContext } from "../../../app/AppContext";
import {
  ParagraphSousTitre,
  TitreCarteSelection,
  ZoneFiltres,
  FiltreButton,
} from "./StyledComparaison";

const BarreContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 8px;
  border: solid 1px ${colorsLight.topBackground};
`;

const SearchZone = styled.input`
  background: transparent;
  border: none;
  flex-grow: 6;
  margin-right: 3px;
  border-radius: ${(props) =>
    props.parametre === "perimetre" ? "8px" : "8px 0px 0px 8px"};
  padding: 10px;
  font-size: 1em;
`;

const FilterZone = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 0px 8px 8px 0px;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    color: ${colorsLight.background2};
    svg {
      fill: ${colorsLight.background2};
    }
  }
`;
const IconZone = styled.svg`
  width: 35px;
  height: 20px;
`;
const FilterIcon = styled(FiFilter)`
  stroke: ${colorsLight.background2};
`;

const FilterNumberCircle = styled.circle`
  fill: ${colorsLight.background3};
  cx: 20px;
  cy: 8px;
  r: 8px;
`;

const FilterNumber = styled.text`
  font-size: 1em;
  text-anchor: middle;
  fill: white;
`;

const ZoneResultat = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: ${(props) =>
    props.parametre === "perimetre" ? "row" : "column"};

  flex-wrap: "nowrap";
  gap: 15px;
  overflow-x: auto;
  max-height: ${(props) => (!props.parametre === "modules" ? "300px" : "60vh")};
  width: 80vw;
`;

const Resultat = styled.div`
  font-size: 1em;
  padding: ${(props) => (props.isModules ? "20px" : "10px")};
  background: ${(props) =>
    typeof props.type === "undefined"
      ? props.isSelected
        ? colorsLight.background2
        : colorsLight.topBackground
      : colorsLight[props.type]};
  color: ${(props) =>
    typeof props.type === "undefined"
      ? props.isSelected
        ? "white"
        : "black"
      : "white"};
  white-space: ${(props) =>
    props.parametre !== "perimetre" ? "normal" : "nowrap"};
  border-radius: 8px;
  width: ${(props) =>
    props.parametre !== "perimetre" ? "95%" : "fit-content"};
  cursor: ${(props) => (props.isSelected ? "normal" : "pointer")};
  &:hover {
    opacity: ${(props) => !props.isSelected && "70%"};
    /* color: ${(props) => !props.isSelected && colorsLight.interaction}; */
  }
`;

const searchVariables = async (recherche, theme, API_URL, setResultats) => {
  const response = await fetch(`${API_URL}/searchVariables`, {
    body: JSON.stringify({ recherche: recherche, theme: theme }),
    method: "POST",
    headers: {
      // Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  setResultats(data);
};

const getModules = async (API_URL, recherche, theme, setResultats) => {
  const response = await fetch(`${API_URL}/getModules`, {
    body: JSON.stringify({ recherche: recherche, theme: theme }),
    method: "POST",
    headers: {
      // Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  setResultats(data);
};

const BarreRecherche = ({ tempo, setTempo, parametre, addMetaCondition }) => {
  const { API_URL } = useContext(AppContext);
  const [recherche, setRecherche] = useState("");
  const [openFiltres, setOpenFiltres] = useState(false);
  const [themes, setThemes] = useState([]);
  const [resultats, setResultats] = useState([]);
  const [listeThemes, setListeThemes] = useState([]);

  const handleClickInclusion = (tempo, resultat) => {
    if (
      typeof tempo === "undefined" ||
      !tempo.CONDITIONS.some((inclu) => inclu.CODE === resultat.CODE)
    ) {
      let key = setKeyCondition();
      setTempo((prev) => ({
        ...prev,
        CONDITIONS: [...prev.CONDITIONS, { ...resultat, KEY: key, CHOIX: [] }],
      }));
      addMetaCondition(API_URL, [], { ...resultat, KEY: key }, resultat.TYPE);
    }
  };

  const handleAddModule = (resultat) => {
    setTempo((prev) => [...prev, resultat]);
  };

  useEffect(() => {
    const getListeThemes = async (parametre, API_URL) => {
      const response = await fetch(`${API_URL}/getThemes`, {
        body: JSON.stringify({ parametre: parametre }),
        method: "POST",
        headers: {
          // Authorization: bearer,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setListeThemes(data);
      setThemes(data.map((elem) => elem.CODE));
    };
    getListeThemes(parametre, API_URL);
    (parametre === "inclusion" || parametre === "unite") &&
      searchVariables(recherche, themes, API_URL, setResultats);
    parametre === "modules" &&
      getModules(API_URL, recherche, themes, setResultats);
  }, []);

  useEffect(() => {
    // recherche tous les deux charactères
    if (recherche.length % 2 === 0 && recherche !== "") {
      parametre === "perimetre" &&
        apiRecommendation(recherche, API_URL, setResultats, themes);
      parametre === "inclusion" &&
        searchVariables(recherche, API_URL, themes, setResultats);
      parametre === "modules" &&
        getModules(API_URL, recherche, themes, setResultats);
    }
  }, [recherche, API_URL, themes, parametre]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      parametre === "perimetre" &&
        handleSearch(e, recherche, API_URL, setResultats, themes);
      (parametre === "inclusion" || parametre === "unite") &&
        searchVariables(recherche, themes, API_URL, setResultats);
      parametre === "modules" &&
        getModules(API_URL, recherche, themes, setResultats);
    }
  };

  const handleFilterUpdate = (e, theme) => {
    themes.length > 1 && themes.includes(theme.CODE)
      ? setThemes((prev) => prev.filter((th) => th !== theme.CODE))
      : setThemes((prev) => [...prev, theme.CODE]);

    parametre === "perimetre" &&
      handleSearch(
        e,
        recherche,
        API_URL,
        setResultats,
        themes
      )(parametre === "unite" || parametre === "inclusion") &&
      searchVariables(
        recherche,
        [...themes, theme.CODE],
        API_URL,
        setResultats
      );
    parametre === "modules" &&
      getModules(API_URL, recherche, themes, setResultats);
  };

  return (
    <>
      <BarreContainer>
        <SearchZone
          type="text"
          placeholder={`🔍️ Cherchez ${
            parametre === "inclusion" ? "une variable" : ""
          }${parametre === "unite" ? "une unité d'analyse" : ""}${
            parametre === "perimetre" ? "un territoire administratif" : ""
          }${parametre === "modules" ? "des analyses" : ""}`}
          parametre={parametre}
          onChange={(e) => setRecherche(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {/* {parametre !== "perimetre" && ( */}
        <FilterZone onClick={() => setOpenFiltres((prev) => !prev)}>
          <IconZone>
            <FilterIcon size={21} />
            {themes.length > 0 && (
              <>
                <FilterNumberCircle />
                <FilterNumber x={20} y={14}>
                  {themes.length}
                </FilterNumber>
              </>
            )}
          </IconZone>
          Filtrez les {parametre === "inclusion" && "thèmes"}
          {parametre === "unite" && "types d'unité"}
          {parametre === "perimetre" && "niveaux géographiques"}
          {parametre === "modules" && "thèmes de modules"}
        </FilterZone>
        {/* )} */}
      </BarreContainer>
      {openFiltres && (
        <ZoneFiltres>
          {listeThemes.map((theme) => (
            <FiltreButton
              isSelected={themes.includes(theme.CODE)}
              onClick={(e) => handleFilterUpdate(e, theme)}
              isGeo={parametre === "perimetre"}
              code={theme.CODE}
            >
              {theme.LIBELLE}
            </FiltreButton>
          ))}
        </ZoneFiltres>
      )}
      {/* LISTE DES RESULTATS */}
      <ZoneResultat parametre={parametre}>
        {/* SI ON EST SUR LE PERIMETRE GEOGRAPHIQUE */}
        {parametre === "perimetre" &&
          resultats.length > 0 &&
          resultats
            .filter((resultat) =>
              themes.length > 0 ? themes.includes(resultat.TYPE) : true
            )
            .filter((resultat) =>
              resultat.LIBGEO.toLowerCase().includes(recherche.toLowerCase())
            )
            .map((resultat) => (
              <Resultat
                isSelected={
                  typeof tempo.TERRITOIRES !== "undefined" &&
                  tempo.TERRITOIRES.some(
                    (inclu) => inclu.LIBGEO === resultat.LIBGEO
                  )
                }
                onClick={() =>
                  !tempo.TERRITOIRES.some(
                    (inclu) => inclu.LIBGEO === resultat.LIBGEO
                  ) &&
                  setTempo((prev) => ({
                    ...prev,
                    TERRITOIRES: [...prev.TERRITOIRES, resultat],
                  }))
                }
                parametre={parametre}
                type={resultat.TYPE}
              >
                {resultat.LIBGEO}{" "}
                {resultat.POSTAL &&
                  "(" +
                    resultat.POSTAL.find((rs) => rs.ANNEE === 2017).VALEUR +
                    ") "}
                - {typeTerritoire(resultat.TYPE)}
              </Resultat>
            ))}
        {/* INCLUSION ET UNITE */}
        {(parametre === "unite" || parametre === "inclusion") &&
          resultats
            .filter((resultat) =>
              themes.length > 0
                ? themes.some((r) => resultat.THEME.includes(r))
                : true
            )
            .filter((resultat) =>
              recherche !== ""
                ? resultat.LIBELLE.toLowerCase().includes(
                    recherche.toLowerCase()
                  )
                : true
            )
            .filter((resultat) =>
              tempo.CONDITIONS.length > 0
                ? resultat.NIVGEO === tempo.CONDITIONS[0].NIVGEO
                : true
            )
            .map((resultat) => (
              <Resultat
                isSelected={
                  typeof tempo !== "undefined" &&
                  tempo.CONDITIONS.some((inclu) => inclu.CODE === resultat.CODE)
                }
                onClick={() =>
                  parametre === "inclusion"
                    ? handleClickInclusion(tempo, resultat)
                    : typeof tempo !== "undefined" &&
                      !tempo.CONDITIONS.some(
                        (inclu) => inclu.CODE === resultat.CODE
                      ) &&
                      setTempo((prev) => ({
                        ...prev,
                        CONDITIONS: [
                          ...prev.CONDITIONS,
                          { ...resultat, KEY: setKeyCondition() },
                        ],
                      }))
                }
              >
                {resultat.LIBELLE}
              </Resultat>
            ))}
        {parametre === "modules" &&
          resultats
            .filter((resultat) =>
              themes.length > 0
                ? themes.some((r) => resultat.THEME.includes(r))
                : true
            )
            .filter((resultat) =>
              recherche !== ""
                ? resultat.TITRE.toLowerCase().includes(recherche.toLowerCase())
                : true
            )
            .map((resultat) => (
              <Resultat
                isSelected={
                  typeof tempo !== "undefined" &&
                  tempo.some((inclu) => inclu.TITRE === resultat.TITRE)
                }
                isModules
                onClick={() =>
                  typeof tempo !== "undefined" &&
                  !tempo.some((inclu) => inclu.TITRE === resultat.TITRE) &&
                  handleAddModule(resultat)
                }
              >
                <TitreCarteSelection>{resultat.TITRE}</TitreCarteSelection>
                <ParagraphSousTitre>{resultat.DESCRIPTION}</ParagraphSousTitre>
              </Resultat>
            ))}
      </ZoneResultat>
    </>
  );
};

export default BarreRecherche;
