// D3 components
import { scaleLinear,scaleTime } from 'd3-scale';
import { min, max,extent } from 'd3-array';
import scaleDomain from '../components/ScaleDomain';

// Import bar components
import {AxisLeftContinuous} from '../components/AxisLeft';
import {AxisBottomContinuous} from '../components/AxisBottom';
import {Dots} from '../components/Dots';
import {Path} from '../components/Path';

const LineChart = ({data,xVariable,yVariable,color,width,height}) =>{
    console.log(data)

    const margin = {top:10, right:20, bottom:50, left:50}
    
    const innerWidth = +width - margin.right - margin.left;
    const innerHeight = +height - margin.top - margin.bottom;  
    
    const xScale = scaleLinear()
    .domain(extent(data, d => d[xVariable]))
    .range([0,innerWidth])
    .nice();

    const yScale = scaleLinear()
    .domain([min(data, d => d[yVariable])-scaleDomain(data,yVariable),max(data, d => d[yVariable])+scaleDomain(data,yVariable)])
    .range([innerHeight,0])
    .nice();

    console.log(yScale)

    const uniqueColors = [...new Set(data.map(item => item[color]))];

    const colorsPick = ['#FF8C00','#9932CC','#8B0000','#8FBC8F','#483D8B','#00CED1']

    return(
        <svg height={height} width={width} className="graph">
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottomContinuous
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
                     {/* {data.map(d =>
                     console.log(d))} */}

                     {uniqueColors.map((col,i)=>{
                     return (
                         <>
                      <Path 
                      data={data.filter(item => item[color] === col)}
                      xScale={xScale} 
                      yScale={yScale} 
                      xVariable={xVariable} 
                      yVariable={yVariable}
                      color={colorsPick[i]}
                      />
 
                      <Dots 
                      data={data.filter(item => item[color] === col)} 
                      xScale={xScale} 
                      yScale={yScale} 
                      xVariable={xVariable} 
                      yVariable={yVariable}
                      radius={2.5}
                      color={colorsPick[i]}

                      />     

                    </>
                         )}

                     )}

             
                </g>
            </svg>
    )
}

export default LineChart;