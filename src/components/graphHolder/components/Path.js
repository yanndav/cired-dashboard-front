import { line, curveMonotoneX} from "d3-shape"
const Path = ({data,xScale,yScale,xVariable,yVariable,color}) => 
<path 
    className="line"
    style={{stroke:color}}
    d={line()
    .x(d => xScale(d[xVariable]))
    .y(d => yScale(d[yVariable]))
    // .curve(curveMonotoneX)
    (data)
} 
   />

export {Path}