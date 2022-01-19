import { colors } from "../components/mapFunctions";

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

export { setGraphColors };
