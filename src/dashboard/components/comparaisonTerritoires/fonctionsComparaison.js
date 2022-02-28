const addS = (list) =>
  typeof list !== "undefined" && list.length > 1 ? "s" : "";

const hasCritere = (exist) =>
  Array.isArray(exist) ? exist.length > 0 : Object.keys(exist).length > 0;

const isOpen = (parametre) => parametre !== "default";
const setKeyCondition = () => (Math.random() + 1).toString(36).substring(7);

const typeTerritoire = (TYPE) =>
  TYPE === "COM"
    ? "Commune"
    : TYPE === "REG"
    ? "Région"
    : TYPE === "DEP"
    ? "Département"
    : TYPE;
export { addS, hasCritere, isOpen, typeTerritoire, setKeyCondition };
