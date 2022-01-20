import LineChart from "./graphs/LineChart";

import { useState, useEffect, useMemo } from "react";
import VariableSelectItem from "./components/VariableSelectItem";

const selectLayer = (layers, showVariable, showFilter, module) => {
  let temp = [...layers];
  if (showVariable !== undefined) {
    let layer = {};
    if (temp.length === 1) {
      layer = temp.map((dt) => dt)[0];
    } else {
      layer = temp.filter(
        (lay) => lay.VARIABLE.CODE === getVariable(showVariable, module)
      );
    }
    if (showFilter[getVariable(showVariable, module)] !== false) {
      layer.DATA = layer.DATA.filter((dt) =>
        showFilter[getVariable(showVariable, module)]
          .map((flt) => JSON.stringify(flt))
          .includes(JSON.stringify(dt.FILTRES))
      );
    }

    return layer;
  }
};

const createShowVariable = (module) => {
  let obj = {};
  for (let layer of module.DONNEES) {
    obj["l" + layer.LAYER.toString()] = layer.LAYER === 1 ? true : false;
  }
  return obj;
};

const createShowFilter = (layers) => {
  let obj = {};
  for (let lay of layers) {
    obj[lay.VARIABLE.CODE] = lay.DATA[0].hasOwnProperty("FILTRES")
      ? [lay.DATA[0].FILTRES]
      : false;
  }
  return obj;
};

const getVariable = (showVariable, module) =>
  module.DONNEES.filter((dt) => showVariable["l" + dt.LAYER.toString()])[0]
    .VARIABLE;

const getOptionsFilter = (layer) => {
  let temp = Object.assign({}, layer);
  if (layer.hasOwnProperty("FILTRES")) {
    let filter = {};
    const categ = Array.from(
      new Set(temp.DATA.map((dt) => Object.keys(dt.FILTRES)).flat())
    );
    for (let cat of categ) {
      filter[cat] = Object.fromEntries(
        new Map(
          Array.from(
            new Set(temp.DATA.map((dt) => dt.FILTRES[cat]).flat())
          ).map((dt, i) => [dt, i === 0])
        )
      );
    }
    return filter;
  } else {
    return false;
  }
};

const getInfo = (layers, module) => {
  let temp = [...layers];
  let info = [];
  for (let lay of module.DONNEES) {
    let sele = temp.filter((dt) => dt.VARIABLE.CODE === lay.VARIABLE)[0];
    info.push({
      VARIABLE: sele.VARIABLE,
      LAYER: lay.LAYER,
      FILTRES: getOptionsFilter(sele),
    });
  }
  return info;
};

const Graph = ({ module, layers }) => {
  const [showVariable, setShowVariable] = useState(
    createShowVariable(module, layers)
  );
  const [showFilter, setShowFilter] = useState(createShowFilter([...layers]));

  return (
    <>
      {/* <VariableSelectItem infos={getInfo(layers, module)}/> */}
      <LineChart
        module={module}
        layer={selectLayer([...layers], showVariable, showFilter, module)}
      />
    </>
  );
};

export default Graph;
