import React from "react";
import { useState, useRef } from "react";

import LegendItem from "./LegendItem";

import { colors, keyGen, setColorsLegend } from "./mapFunctions";

// const getModalites = (data, clef) => {
//   let code = data.MODALITES.filter((c) => c.CODE === clef);
//   console.log(clef);
//   if (code) {
//     return code[0];
//   }
// };

const LegendMap = ({ layer, idKey }) => {
  const couleurs = setColorsLegend(layer, colors);
  const modalites = layer.MODALITES;

  return (
    <div key={"legend-" + idKey + "-" + keyGen(layer.VARIABLE.CODE)}>
      <p>{layer.VARIABLE.LIBELLE}:</p>
      {Object.keys(couleurs).map((mod, idx) => {
        return (
          <LegendItem
            idKey={idKey + "-" + keyGen(layer.VARIABLE.CODE)}
            couleurs={couleurs}
            mod={mod}
            modalite={modalites.filter((c) => c.CODE === mod)[0]}
            idx={idx}
          />
        );
      })}
      <hr className="sep-line" />
    </div>
  );
};

export default LegendMap;
