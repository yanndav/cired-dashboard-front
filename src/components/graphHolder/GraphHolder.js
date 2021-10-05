
// Styling
import './GraphHolder.css'
import BarChartCategorical from './graphs/BarChart';
import ScatterPlot from './graphs/ScatterPlot'
import LineChart from './graphs/LineChart';

const width =  600 ; 
const height = 400;



const GraphHolder = ({data}) => {
    console.log(data)
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
            {data.map(vari=>
                <LineChart 
                data={vari.DATA}
                xVariable={'ANNEE'}
                yVariable={'VALEUR'}
                color={'CODGEO'}
                width={width}
                height={height}
                />        
            )}
             
        </div>
    )
}

export default GraphHolder
