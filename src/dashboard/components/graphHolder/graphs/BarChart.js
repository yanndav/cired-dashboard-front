// D3 components
import { scaleBand, scaleLinear } from 'd3';
import { max } from 'd3-array';
import scaleDomain from '../components/ScaleDomain';

// Import bar components
import {AxisLeftContinuous} from '../components/AxisLeft'
import {AxisBottomCategorical} from '../components/AxisBottom'
import Bars from '../components/Bars';


const BarChartCategorical = ({data,xVariable,yVariable,width,height}) =>{
    const margin = {top:10, right:20, bottom:50, left:40}
    
    const innerWidth = +width - margin.right - margin.left;
    const innerHeight = +height - margin.top - margin.bottom;  
    
    const xScale = scaleBand()
    .domain(data.map(d => d[xVariable]))
    .range([0, innerWidth])
    .padding(0.1);


    const yScale = scaleLinear()
    .domain([0, max(data, d => d[yVariable])+scaleDomain(data,yVariable)])
    .range([innerHeight,0])
    .nice();



    return(
        <svg height={height} width={width} className="graph">
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottomCategorical 
                    xScale={xScale} 
                    innerHeight={innerHeight}
                    innerWidth={innerWidth}
                    xVariable={xVariable}/> 
                     <AxisLeftContinuous
                     yScale={yScale} 
                     innerWidth={innerWidth}
                     innerHeight={innerHeight}
                     yVariable={yVariable}/> 
                     <Bars 
                     data={data} 
                     xScale={xScale} 
                     yScale={yScale} 
                     innerHeight={innerHeight} 
                     xVariable={xVariable} 
                     yVariable={yVariable}/>              
                </g>
            </svg>
    )
}

export default BarChartCategorical;