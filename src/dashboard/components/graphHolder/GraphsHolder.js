// Styling
import "./GraphHolder.css";
import BarChartCategorical from "./graphs/BarChart";
import ScatterPlot from "./graphs/ScatterPlot";
import LineChart from "./graphs/LineChart";
import Graph from "./Graph";

const width = 600;
const height = 500;

const GraphsHolder = ({ data, territories }) => {
  return (
    <div className="graph-container">
      {/* <BarChartCategorical 
            data={data}
            xVariable={xVariable}
            yVariable={yVariable}
            width={width}
            height={height}
            />   
            <ScatterPlot 
            data={data2}
            xVariable={xVariable2}
            yVariable={yVariable2}
            width={width}
            height={height}
            />      */}
      {data.map((vari) => (
        <Graph
          vari={vari}
          width={width}
          height={height}
          territories={territories}
        />
      ))}
    </div>
  );
};

export default GraphsHolder;
