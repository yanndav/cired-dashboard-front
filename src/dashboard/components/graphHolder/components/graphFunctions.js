import { colors } from "../components/mapFunctions";

const lineTypes = [
  "1,0",
  "10,10",
  "20,10,5,5,5,10",
  "20,5,5,10",
  "1,2",
  "6,2",
  "6,2,4",
  "20,5,5,5",
];

const pointTypes = ["dot", "triangle", "square", "5f", "6f", "7f", "etoile"];

const getTerritoires = (donnees) => {
  return [
    ...new Set(
      donnees
        .map((dt) => {
          return { CODGEO: dt.CODGEO };
        })
        .map((o) => JSON.stringify(o))
    ),
  ]
    .map((str) => JSON.parse(str))
    .sort((a, b) => a.CODGEO - b.CODGEO);
};

const getFiltres = (donnees) => {
  return [
    ...new Set(
      donnees
        .map((dt) => {
          return { FILTRES: dt.FILTRES };
        })
        .map((o) => JSON.stringify(o))
    ),
  ]
    .map((str) => JSON.parse(str))
    .sort((a, b) => a.FILTRES - b.FILTRES);
};

const setFiltresLines = (modalites, lineTypes) => {
  return Array(modalites.length).fill(lineTypes).flat();
};
const setFiltresShapes = (modalites, pointTypes) => {
  return Array(modalites.length).fill(pointTypes).flat();
};

const setGraphFiltres = (layer) => {
  // Fonction qui crée un dictionnaire.
  // Clé = modalité, valeur = couleur

  const modalites = getFiltres(layer);
  const filtresLines = setFiltresLines(modalites, lineTypes);
  const filtresShapes = setFiltresShapes(modalites, pointTypes);

  return modalites.map((k, i) => ({
    ...k,
    LINETYPE: filtresLines[i],
    SHAPE: filtresShapes[i],
  }));
};

const setColorsScales = (modalites, colors) => {
  // Fonction qui crée un Array de la taille du nombre de modalités
  return Array(modalites.length).fill(colors).flat();
};

const setGraphColors = (layer) => {
  // Fonction qui crée un dictionnaire.
  // Clé = modalité, valeur = couleur

  const modalites = getTerritoires(layer);
  const colorsArray = setColorsScales(modalites, colors);
  return modalites.map((k, i) => ({ ...k, COULEUR: colorsArray[i] }));
};

export { setGraphColors, setGraphFiltres };
