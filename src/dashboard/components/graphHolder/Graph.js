import LineChart from "./graphs/LineChart";

import VariableSelectItemGraph from "./components/VariableSelectItemGraph";

const selectLayer = (data) => {
  return data.filter((dt) => dt.SHOW === true)[0];
};

// const omitKey = (key, layer) => {
//   const { [key]: omitted, ...rest } = layer;
//   return rest;
// };

// const getInfo = (data) => data.map((layer) => omitKey("DATA", layer));

const Graph = ({
  module,
  data,
  setData,
  activatedFilters,
  setActivatedFilters,
}) => {
  return (
    <>
      <VariableSelectItemGraph
        infos={data}
        setData={setData}
        activatedFilters={activatedFilters}
        setActivatedFilters={setActivatedFilters}
      />
      <LineChart module={module} layer={selectLayer(data)} />
    </>
  );
};

export default Graph;

// POUBELLE
// const createShowFilter = (layers) => {
//   let obj = {};
//   for (let lay of layers) {
//     // console.log(lay);
//     obj[lay.VARIABLE.CODE] = lay.DATA[0].hasOwnProperty("FILTRES")
//       ? lay.DATA[0].FILTRES
//       : false;
//   }
//   return obj;
// };

// const createShowVariable = (module) => {
//   let obj = {};
//   for (let layer of module.DONNEES) {
//     obj["l" + layer.LAYER.toString()] = layer.LAYER === 1 ? true : false;
//   }
//   return obj;
// };

// const createShowFilter = (layers) => {
//   let obj = {};
//   for (let lay of layers) {
//     // console.log(lay);
//     obj[lay.VARIABLE.CODE] = lay.DATA[0].hasOwnProperty("FILTRES")
//       ? [lay.DATA[0].FILTRES]
//       : false;
//   }
//   return obj;
// };

// const getVariable = (showVariable, module) =>
//   module.DONNEES.filter((dt) => showVariable["l" + dt.LAYER.toString()])[0]
//     .VARIABLE;

// const getInfo = (layers, module) => {
//   let temp = [...layers];
//   let info = [];
//   for (let lay of module.DONNEES) {
//     let sele = temp.filter((dt) => dt.VARIABLE.CODE === lay.VARIABLE)[0];
//     info.push({
//       VARIABLE: sele.VARIABLE,
//       LAYER: lay.LAYER,
//       FILTRES: getOptionsFilter(sele),
//     });
//   }
//   return info;
// };

// const getOptionsFilter = (layer) => {
//   let temp = Object.assign({}, layer);
//   if (layer.hasOwnProperty("FILTRES")) {
//     let filter = {};
//     const categ = Array.from(
//       new Set(temp.DATA.map((dt) => Object.keys(dt.FILTRES)).flat())
//     );
//     for (let cat of categ) {
//       console.log(cat);
//       filter[cat] = Object.fromEntries(
//         new Map(
//           Array.from(
//             new Set(temp.DATA.map((dt) => dt.FILTRES[cat]).flat())
//           ).map((dt, i) => [dt, i === 0])
//         )
//       );
//       console.log(
//         Array.from(new Set(temp.DATA.map((dt) => dt.FILTRES[cat]).flat()))
//       );
//     }
//     return filter;
//   } else {
//     return false;
//   }
// };
