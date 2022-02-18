const addS = (list) =>
  typeof list !== "undefined" && list.length > 1 ? "s" : "";

const hasCritere = (exist) => typeof exist !== "undefined";

const isOpen = (parametre) => parametre !== "default";

export { addS, hasCritere, isOpen };
