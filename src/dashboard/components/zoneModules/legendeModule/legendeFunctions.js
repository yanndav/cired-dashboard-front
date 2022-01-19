const getLayer = (consignes, data) =>
  data.filter((layer) => layer.VARIABLE.CODE == consignes.VAR_SOURCE)[0];

const valeursUniques = (bonLayer, group_var) => [
  ...new Set(bonLayer.GEOMETRY.map((c) => c.properties[group_var])),
];

const valeursUniquesBonLayer = (bonLayer, group_var) => {
  const set = [...new Set(bonLayer.map((c) => c.properties[group_var]))];

  return set;
};

const subsetLayer = (bonLayer, group_var, val) =>
  bonLayer.GEOMETRY.filter((c) => c.properties[group_var] == val);

const varNb = (bonLayer, variable) =>
  valeursUniquesBonLayer(bonLayer, variable).length;

const varUnique = (bonLayer, variable) =>
  valeursUniquesBonLayer(bonLayer, variable)[0];

const typeCalc = (calc) => calc.match("(?<=--)([A-Z]+)(?=--)")[0];
const varCalc = (calc) => calc.match("(?<=--)([A-Z]+$)")[0];

const genererVariables = (bonLayer, creer_var) => {
  let variables = {};
  for (let consignes of creer_var) {
    variables = { ...variables, ...ajouterVariable(bonLayer, consignes) };
  }
  return variables;
};

const ajouterVariable = (bonLayer, consignes) => {
  const type_calc = typeCalc(consignes.CALC);
  const var_calc = varCalc(consignes.CALC);
  let resultat = {};
  if (type_calc == "NB") {
    resultat[consignes.CODE] = varNb(bonLayer, var_calc);
  } else if (type_calc == "UNIQUE") {
    resultat[consignes.CODE] = varUnique(bonLayer, var_calc);
  }
  return resultat;
};

const genererTexteVariables = (texte_brut, variables) => {
  const re = new RegExp(
    Object.keys(variables)
      .map((c) => "--" + c + "--")
      .join("|"),
    "gi"
  );
  const texte =
    texte_brut.replace(
      re,
      (matched) => variables[matched.replaceAll("--", "")]
    ) +
    `  
  `;

  return texte;
};

const legendeIterateur = (consignes, layers) => {
  const bonLayer = getLayer(consignes, layers);
  let texte = ``;
  let variables = {};
  if (consignes.hasOwnProperty("GROUPER_PAR")) {
    const group_var = consignes.GROUPER_PAR;
    const valeurs_var = valeursUniques(bonLayer, group_var);
    variables = {};
    for (const val of valeurs_var) {
      let groupLayer = subsetLayer(bonLayer, group_var, val);
      variables = genererVariables(groupLayer, consignes.CREER_VAR);
      texte = texte + genererTexteVariables(consignes.TEXTE, variables);
    }
  } else {
    variables = genererVariables(bonLayer, consignes.CREER_VAR);
    texte += genererTexteVariables(consignes.TEXTE, variables);
  }
  return texte;
};

const genererLegende = (layers, legendes) => {
  let texte = ``;
  for (const consignes of legendes) {
    if (consignes.TYPE === "BOUCLE") {
      texte += legendeIterateur(consignes, layers).replace(
        "\n  ",
        `
`
      );
    } else if (consignes.TYPE === "BASIQUE") {
      texte +=
        consignes.TEXTE +
        `  
      `;
    }
  }
  return texte;
};

export { genererLegende };
