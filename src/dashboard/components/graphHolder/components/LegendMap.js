import LegendItem from "./LegendItem";

import { useState, useEffect } from "react";

import { colors, keyGen, setColorsLegend } from "./mapFunctions";

const LegendMap = ({ layer, idKey }) => {
  const couleurs = setColorsLegend(layer, colors);
  console.log("le layer", layer["GEOMETRY"][0]);
  const year = layer.GEOMETRY[0].properties.ANNEE;

  return (
    <div key={"legend-" + idKey + "-" + keyGen(layer)}>
      <p>{layer.VARIABLE.LIBELLE}:</p>
      {couleurs.map((couleur, idx) => {
        return (
          <LegendItem
            idKey={idKey + "-" + keyGen(layer)}
            couleur={couleur}
            modalite={
              layer.MODALITES.filter(
                (c) =>
                  (c.CODE.toString() === couleur.CODE.toString()) &
                  c.ANNEE.includes(year)
              )[0]
            }
            idx={idx}
          />
        );
      })}
      {/* <hr className="sep-line" /> */}
    </div>
  );
};

export default LegendMap;
