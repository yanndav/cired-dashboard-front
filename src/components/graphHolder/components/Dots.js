import Dot from "./Dot";

const Dots = ({data,xScale,yScale,xVariable,
  yVariable,radius=4,color,innerHeight,
  showX,setShowX,showY}) => {
    return data.map(d => {
      const show = d[xVariable]===showX?true:false
      return <Dot 
        d={d}
        xScale={xScale}
        yScale={yScale}
        xVariable={xVariable}
        yVariable={yVariable}
        radius={radius}
        color={color}
        innerHeight={innerHeight}
        setShowX={setShowX}
        show={show}
        showY={showY}
        />
    }
)}
    
  export {Dots};