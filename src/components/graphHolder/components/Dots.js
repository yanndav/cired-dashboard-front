import Dot from "./Dot";

const Dots = ({data,xScale,yScale,xVariable,yVariable,radius=4}) => data.map(d => 
<Dot 
  d={d}
  xScale={xScale}
  yScale={yScale}
  xVariable={xVariable}
  yVariable={yVariable}
  radius={radius} />
)
    
  export {Dots};