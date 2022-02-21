import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { colorsLight } from "../../../app/colorComponents";
import { FiFilter } from "react-icons/fi";
import { typeTerritoire } from "./fonctionsComparaison";
import {
  apiRecommendation,
  handleSearch,
} from "../localisation/LocalisationFunctions";

import { AppContext } from "../../../app/AppContext";

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
`;

const FilterZone = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 0px 8px 8px 0px;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    color: ${colorsLight.interaction};
    svg {
      fill: ${colorsLight.interaction};
      circle {
        fill: ${colorsLight.interaction};
      }
    }
  }
`;
const IconZone = styled.svg`
  width: 35px;
  height: 20px;
`;
const FilterIcon = styled(FiFilter)`
  stroke: ${colorsLight.title};
`;

const FilterNumberCircle = styled.circle`
  fill: ${colorsLight.background2};
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
  gap: 15px;
  overflow: auto;
  max-height: ${(props) => props.parametre !== "perimetre" && "300px"};
`;

const Resultat = styled.div`
  padding: 10px;
  background: ${(props) =>
    typeof props.type === "undefined"
      ? props.isSelected
        ? colorsLight.title
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
    background: ${colorsLight.title};
    color: white;
  }
`;

const ZoneFiltres = styled.div`
margin-top:20px;
transition:width 0.3s,
height:0.3s;
width:95%;
display:flex;
flex-direction:row;
flex-wrap:wrap;
gap:15px;
/* padding:15px; */
border-radius:8px;
`;

const FiltreButton = styled.div`
  border-radius: 8px;
  padding: 10px;
  background: ${(props) =>
    props.isSelected ? colorsLight.title : colorsLight.topBackground};
  color: ${(props) => (props.isSelected ? "white" : "black")};

  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.isSelected ? colorsLight.cancel : colorsLight.light};
    color: white;
  }
`;

// FAUSSES VARIABLES
const fauxResultats = [
  {
    CODE: "TAAV2020",
    THEME: "Zonage",
    LIBELLE: "Tranche d’aire d’attraction des villes 2020",
    MODALITES: [
      { LIBELLE: "Commune hors attraction des villes", SELECT: false },
      { LIBELLE: "Aire de moins de 50 000 habitants", SELECT: false },
      {
        LIBELLE: "Aire de 50 000 à moins de 200 000 habitants",
        SELECT: false,
      },
    ],
  },
  {
    THEME: "Zonage",
    CODE: "CAAV2020",

    LIBELLE:
      "Catégorie de la commune dans le zonage en aires d'attraction des villes 2020",
    MODALITES: [
      { LIBELLE: "Commune hors attraction des villes", SELECT: false },
      { LIBELLE: "Aire de moins de 50 000 habitants", SELECT: false },
      {
        LIBELLE: "Aire de 50 000 à moins de 200 000 habitants",
        SELECT: false,
      },
    ],
  },
  {
    THEME: "Démographie",
    LIBELLE: "Taux de pauvreté dans la commune",
    MODALITES: [
      { LIBELLE: "Commune hors attraction des villes", SELECT: false },
      { LIBELLE: "Aire de moins de 50 000 habitants", SELECT: false },
      {
        LIBELLE: "Aire de 50 000 à moins de 200 000 habitants",
        SELECT: false,
      },
    ],
  },
];

const BarreRecherche = ({ tempo, setTempo, parametre }) => {
  const [recherche, setRecherche] = useState("");
  const [openFiltres, setOpenFiltres] = useState(false);
  const [themes, setThemes] = useState([]);

  const [resultats, setResultats] = useState([]);
  const { API_URL } = useContext(AppContext);

  useEffect(() => {
    // recherche tous les deux charactères
    if ((recherche.length % 2 === 0) & (recherche !== "")) {
      apiRecommendation(recherche, API_URL, setResultats);
    }
  }, [recherche, API_URL]);

  return (
    <>
      <BarreContainer>
        <SearchZone
          type="text"
          placeholder={`🔍️ Cherchez ${
            parametre === "inclusion" ? "une variable" : ""
          } ${parametre === "unite" ? "une unité d'analyse" : ""}${
            parametre === "perimetre" ? "un territoire administratif" : ""
          } `}
          parametre={parametre}
          onChange={(e) => setRecherche(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" &&
            handleSearch(e, recherche, API_URL, setResultats)
          }
        />
        {parametre !== "perimetre" && (
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
            Filtrez les {parametre === "inclusion" ? "thèmes" : "types d'unité"}
          </FilterZone>
        )}
      </BarreContainer>
      {openFiltres && (
        <ZoneFiltres>
          {[...new Set(fauxResultats.map((resultat) => resultat.THEME))].map(
            (theme) => (
              <FiltreButton
                isSelected={themes.includes(theme)}
                onClick={() =>
                  themes.includes(theme)
                    ? setThemes((prev) => prev.filter((th) => th !== theme))
                    : setThemes((prev) => [...prev, theme])
                }
              >
                {theme}
              </FiltreButton>
            )
          )}
        </ZoneFiltres>
      )}

      <ZoneResultat parametre={parametre}>
        {parametre === "perimetre"
          ? resultats
              .filter((resultat) =>
                resultat.LIBGEO.toLowerCase().includes(recherche.toLowerCase())
              )
              .map((resultat) => (
                <Resultat
                  isSelected={
                    typeof tempo.TERRITOIRES !== "undefined" &&
                    tempo.TERRITOIRES.map((inclu) => inclu.LIBGEO).includes(
                      resultat.LIBGEO
                    )
                  }
                  onClick={() =>
                    !tempo.TERRITOIRES.map((inclu) => inclu.LIBGEO).includes(
                      resultat.LIBGEO
                    ) &&
                    setTempo((prev) => ({
                      ...prev,
                      TERRITOIRES: [...prev.TERRITOIRES, resultat],
                    }))
                  }
                  parametre={parametre}
                  type={resultat.TYPE}
                >
                  {resultat.LIBGEO} - {typeTerritoire(resultat.TYPE)}
                </Resultat>
              ))
          : fauxResultats
              .filter((resultat) =>
                themes.length > 0 ? themes.includes(resultat.THEME) : true
              )
              .filter((resultat) => resultat.LIBELLE.includes(recherche))
              .map((resultat) => (
                <Resultat
                  isSelected={
                    parametre === "inclusion"
                      ? typeof tempo !== "undefined" &&
                        tempo
                          .map((inclu) => inclu.LIBELLE)
                          .includes(resultat.LIBELLE)
                      : typeof tempo !== "undefined" &&
                        tempo.LIBELLE === resultat.LIBELLE
                  }
                  onClick={() =>
                    parametre === "inclusion"
                      ? (typeof tempo === "undefined" ||
                          !tempo
                            .map((inclu) => inclu.LIBELLE)
                            .includes(resultat.LIBELLE)) &&
                        setTempo((prev) => [...prev, resultat])
                      : (typeof tempo !== "undefined" ||
                          tempo.LIBELLE !== resultat.LIBELLE) &&
                        setTempo(resultat)
                  }
                >
                  {resultat.LIBELLE}
                </Resultat>
              ))}
      </ZoneResultat>
    </>
  );
};

export default BarreRecherche;
