import LineChart from "./graphs/LineChart";

import VariableSelectItemGraph from "./components/VariableSelectItemGraph";

import {
  BoiteParametre,
  ZoneSelection,
  TitleSection,
} from "../parametresTableau/StyledComparaison";
const selectData = (data, territoiresVar, variable) =>
  data
    .find((dt) => dt.SHOW === true)
    .DATA.filter(
      (dt) =>
        territoiresVar[variable].find((fl) => fl.CODGEO === dt.CODGEO).SHOW
    );

const selectLayer = (data) => data.find((dt) => dt.SHOW === true);

// const omitKey = (key, layer) => {
//   const { [key]: omitted, ...rest } = layer;
//   return rest;
// };

// const getInfo = (data) => data.map((layer) => omitKey("DATA", layer));

const Graph = ({
  instruction,
  data,
  setData,
  // territoiresVar,
  // setTerritoiresVar,
  // activatedFilters,
  // setActivatedFilters,
}) => {
  console.log(data);
  return (
    <BoiteParametre lighter>
      <ZoneSelection>
        <TitleSection>{instruction.NOM}</TitleSection>
        <VariableSelectItemGraph
          data={data}
          setData={setData}
          // activatedFilters={activatedFilters}
          // setActivatedFilters={setActivatedFilters}
          // variable={data.find((dt) => dt.SHOW === true).VARIABLE.CODE}
          // territoiresVar={territoiresVar}
          // setTerritoiresVar={setTerritoiresVar}
        />
        <LineChart data={data[0]} setData={setData} />
      </ZoneSelection>
    </BoiteParametre>
  );
};

export default Graph;
