import Dot from "./Dot";

const Dots = ({data,xScale,yScale,xVariable,yVariable,radius=4,color}) => data.map(d => 
<Dot 
  d={d}
  xScale={xScale}
  yScale={yScale}
  xVariable={xVariable}
  yVariable={yVariable}
  radius={radius}
  color={color}
  />
)
    
  export {Dots};