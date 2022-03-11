import LineChart from "./graphs/LineChart";

import VariableSliderTopGraph from "./components/VariableSliderTopGraph";

import {
  BoiteParametre,
  ZoneSelection,
  TitleSection,
} from "../parametresTableau/StyledComparaison";

const Graph = ({ instruction, data, setData }) => {
  return (
    <BoiteParametre lighter>
      <ZoneSelection>
        <TitleSection>{instruction.NOM}</TitleSection>
        <VariableSliderTopGraph data={data} setData={setData} />
        <LineChart data={data[0]} setData={setData} />
      </ZoneSelection>
    </BoiteParametre>
  );
};

export default Graph;
