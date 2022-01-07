import { line, curveMonotoneX} from "d3-shape"
const Path = ({data,xScale,yScale,xVariable,yVariable,color,showY,setShowY,group}) => 
<path 
onMouseOver={()=>setShowY(group)}
onMouseOut={()=>setShowY(null)}
    className="line"
    style={{stroke:color,strokeWidth:showY?(3):(2)}}
    d={line()
    .x(d => xScale(d[xVariable]))
    .y(d => yScale(d[yVariable]))
    // .curve(curveMonotoneX)
    (data)
} 
   />

export {Path}