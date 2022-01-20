import LineChart from "./graphs/LineChart";
import { useState, useEffect } from "react";

import VariableSelectItemGraph from "./components/VariableSelectItemGraph";

const selectData = (data, territoiresVar, variable) => {
  return data
    .filter((dt) => dt.SHOW === true)[0]
    .DATA.filter(
      (dt) =>
        territoiresVar[variable].filter((fl) => fl.CODGEO === dt.CODGEO)[0].SHOW
    );
};

const selectLayer = (data) => {
  const temp = [...data].filter((dt) => dt.SHOW === true)[0];
  return temp;
};

// const omitKey = (key, layer) => {
//   const { [key]: omitted, ...rest } = layer;
//   return rest;
// };

// const getInfo = (data) => data.map((layer) => omitKey("DATA", layer));

const Graph = ({
  module,
  data,
  territoiresVar,
  setTerritoiresVar,
  setData,
  activatedFilters,
  setActivatedFilters,
}) => {
  const variable = [...data].filter((dt) => dt.SHOW === true)[0].VARIABLE.CODE;
  const layer = selectData(data, territoiresVar, variable);

  return (
    <>
      <VariableSelectItemGraph
        infos={data}
        setData={setData}
        activatedFilters={activatedFilters}
        setActivatedFilters={setActivatedFilters}
        variable={variable}
        territoiresVar={territoiresVar}
        setTerritoiresVar={setTerritoiresVar}
      />
      <LineChart
        data={selectData(data, territoiresVar, variable)}
        infos={selectLayer(data)}
        territoiresVar={territoiresVar}
      />
    </>
  );
};

export default Graph;
