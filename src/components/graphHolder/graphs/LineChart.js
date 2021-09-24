// D3 components
import { scaleLinear,scaleTime } from 'd3-scale';
import { min, max,extent } from 'd3-array';
import scaleDomain from '../components/ScaleDomain';

// Import bar components
import {AxisLeftContinuous} from '../components/AxisLeft';
import {AxisBottomTime} from '../components/AxisBottom';
import {Dots} from '../components/Dots';
import {Path} from '../components/Path';


const LineChart = ({data,xVariable,yVariable,width,height}) =>{
    const margin = {top:10, right:20, bottom:50, left:50}
    
    const innerWidth = +width - margin.right - margin.left;
    const innerHeight = +height - margin.top - margin.bottom;  
    
    const xScale = scaleTime()
    .domain(extent(data, d => d[xVariable]))
    .range([0,innerWidth])
    .nice();

    const yScale = scaleLinear()
    .domain([min(data, d => d[yVariable])-scaleDomain(data,yVariable),max(data, d => d[yVariable])+scaleDomain(data,yVariable)])
    .range([innerHeight,0])
    .nice();



    return(
        <svg height={height} width={width} className="graph">
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottomTime
                    xScale={xScale} 
                    innerHeight={innerHeight}
                    innerWidth={innerWidth}
                    xVariable={xVariable}
                    /> 
                     <AxisLeftContinuous
                     yScale={yScale} 
                     innerWidth={innerWidth}
                     innerHeight={innerHeight}
                     yVariable={yVariable}/> 
                     {data.map(d =>
                     console.log(d))}

                     <Path 
                     data={data}
                     xScale={xScale} 
                     yScale={yScale} 
                     xVariable={xVariable} 
                     yVariable={yVariable}
                     />


                    
                     <Dots 
                     data={data} 
                     xScale={xScale} 
                     yScale={yScale} 
                     xVariable={xVariable} 
                     yVariable={yVariable}
                     radius={2.5}/>              
                </g>
            </svg>
    )
}

export default LineChart;