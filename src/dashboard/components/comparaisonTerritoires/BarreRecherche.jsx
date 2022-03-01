import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { colorsLight } from "../../../app/colorComponents";
import { FiFilter } from "react-icons/fi";
import { setKeyCondition, typeTerritoire } from "./fonctionsComparaison";
import {
  apiRecommendation,
  handleSearch,
} from "../localisation/LocalisationFunctions";

import { AppContext } from "../../../app/AppContext";
import ReactMarkdown from "react-markdown";

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
  flex-direction: column;
  gap: 15px;
  overflow: auto;
  max-height: 300px;
`;

const Resultat = styled.div`
  font-size: 1em;
  padding: 10px;
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
    background: ${colorsLight.background2};
    color: white;
  }
`;

const DefinitionContainer = styled.div`
  margin-top: 20px;
`;
const DefinitionResultat = styled(ReactMarkdown)`
  margin-top: 10px;
  padding: 0px 20px;
  font-size: 0.9em;
  font-style: italic;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  white-space: wrap;
  max-width: 100%;
  text-align: justify;
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
    props.isGeo
      ? props.isSelected
        ? colorsLight[props.code]
        : colorsLight.topBackground
      : props.isSelected
      ? colorsLight.background2
      : colorsLight.topBackground};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  border: 1px solid
    ${(props) => (props.isGeo ? colorsLight[props.code] : "none")};
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.isSelected
        ? colorsLight.cancel
        : props.isGeo
        ? colorsLight[props.code]
        : colorsLight.light};
    color: white;
  }
`;

// FAUSSES VARIABLES

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

const BarreRecherche = ({ tempo, setTempo, parametre, addMetaCondition }) => {
  const { API_URL } = useContext(AppContext);
  const [recherche, setRecherche] = useState("");
  const [openFiltres, setOpenFiltres] = useState(false);
  const [themes, setThemes] = useState([]);
  const [resultats, setResultats] = useState([]);
  const [listeThemes, setListeThemes] = useState([]);
  const [delayHandler, setDelayHandler] = useState(null);
  const [showInfo, setShowInfo] = useState("");

  const handleMouseEnter = (code) => {
    setDelayHandler(
      setTimeout(() => {
        setShowInfo(code);
      }, 500)
    );
  };

  const handleMouseLeave = () => {
    clearTimeout(delayHandler);
    setShowInfo("");
  };

  const handleClickInclusion = (tempo, resultat) => {
    if (
      typeof tempo === "undefined" ||
      !tempo.CONDITIONS.map((inclu) => inclu.CODE).includes(resultat.CODE)
    ) {
      let key = setKeyCondition();
      setTempo((prev) => ({
        ...prev,
        CONDITIONS: [...prev.CONDITIONS, { ...resultat, KEY: key, CHOIX: [] }],
      }));
      addMetaCondition(API_URL, [], { ...resultat, KEY: key }, resultat.TYPE);
    }
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
  }, []);

  useEffect(() => {
    // recherche tous les deux charactères
    if (recherche.length % 2 === 0 && recherche !== "") {
      parametre === "perimetre"
        ? apiRecommendation(recherche, API_URL, setResultats, themes)
        : parametre === "inclusion" &&
          searchVariables(recherche, API_URL, themes, setResultats);
    }
  }, [recherche, API_URL, themes, parametre]);

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
            (parametre === "perimetre"
              ? handleSearch(e, recherche, API_URL, setResultats, themes)
              : searchVariables(recherche, themes, API_URL, setResultats))
          }
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
          Filtrez les{" "}
          {parametre === "inclusion"
            ? "thèmes"
            : parametre === "unite"
            ? "types d'unité"
            : "niveaux géographiques"}
        </FilterZone>
        {/* )} */}
      </BarreContainer>
      {openFiltres && (
        <ZoneFiltres>
          {listeThemes.map((theme) => (
            <FiltreButton
              isSelected={themes.includes(theme.CODE)}
              onClick={(e) => {
                themes.length > 1 && themes.includes(theme.CODE)
                  ? setThemes((prev) => prev.filter((th) => th !== theme.CODE))
                  : setThemes((prev) => [...prev, theme.CODE]);

                parametre === "perimetre"
                  ? handleSearch(e, recherche, API_URL, setResultats, themes)
                  : searchVariables(
                      recherche,
                      [...themes, theme.CODE],
                      API_URL,
                      setResultats
                    );
              }}
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
        {parametre === "perimetre"
          ? resultats.length > 0 &&
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
          : // INCLUSION ET UNITE
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
              .map((resultat) => (
                <Resultat
                  isSelected={
                    typeof tempo !== "undefined" &&
                    tempo.CONDITIONS.map((inclu) => inclu.CODE).includes(
                      resultat.CODE
                    )
                  }
                  onClick={() =>
                    parametre === "inclusion"
                      ? handleClickInclusion(tempo, resultat)
                      : setTempo((prev) => ({
                          ...prev,
                          CONDITIONS: [
                            ...prev.CONDITIONS,
                            { ...resultat, KEY: setKeyCondition() },
                          ],
                        }))
                  }
                  onMouseEnter={() => handleMouseEnter(resultat.CODE)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  {resultat.LIBELLE}

                  {showInfo === resultat.CODE && (
                    <DefinitionContainer>
                      Definition :
                      <DefinitionResultat
                        children={resultat.DEFINITION.replace(
                          /\n\s{2,}/g,
                          "\n\n"
                        )}
                        // components={{ pre: "div", code: "p" }}
                      />
                    </DefinitionContainer>
                  )}
                </Resultat>
              ))}
      </ZoneResultat>
    </>
  );
};

export default BarreRecherche;
