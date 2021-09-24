import { line, curveMonotoneX} from "d3-shape"
const Path = ({data,xScale,yScale,xVariable,yVariable}) => 
<path 
    className="line"
    d={line()
    .x(d => xScale(d[xVariable]))
    .y(d => yScale(d[yVariable]))
    .curve(curveMonotoneX)(data)} 
   />

export {Path}