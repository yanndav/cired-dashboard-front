import React from "react";

import LegendItem from "./LegendItem";

import { colors, keyGen, setColorsLegend } from "./mapFunctions";

const LegendMap = ({ layer, idKey }) => {
  const couleurs = setColorsLegend(layer, colors);
  const modalites = layer.MODALITES;

  return (
    <div key={"legend-" + idKey + "-" + keyGen(layer)}>
      <p>{layer.VARIABLE.LIBELLE}:</p>
      {Object.keys(couleurs).map((mod, idx) => {
        console.log(mod);
        console.log(modalites);
        console.log(modalites.filter((c) => c.CODE == mod));

        return (
          <LegendItem
            idKey={idKey + "-" + keyGen(layer)}
            couleurs={couleurs}
            mod={mod}
            modalite={
              modalites.filter((c) => c.CODE.toString() === mod.toString())[0]
            }
            idx={idx}
          />
        );
      })}
      <hr className="sep-line" />
    </div>
  );
};

export default LegendMap;
