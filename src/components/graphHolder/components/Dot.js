import { useState } from "react";

const Dot = ({d,xScale,yScale,xVariable,yVariable,radius,color}) => {

    const [show,setShow] = useState(false)
  
  
    return(
        <g 
        onMouseOver={()=>setShow(true)}
        onMouseOut={()=>setShow(false)}
        >
        <circle className="dot"
        // key={xScale(d[xVariable])*yScale(d[yVariable])}
        cy={yScale(d[yVariable])}
        cx={xScale(d[xVariable])}
        r={show?radius*1.5:radius}
        style={{fill:color}}
        />
        {show && 
            <text className="tooltip"
            // key={xScale(d[xVariable])*yScale(d[yVariable])}
            y={yScale(d[yVariable])}
            x={xScale(d[xVariable])}
            dy={-10}
            style={{color:color}}
            >
            {d[yVariable]}
            </text>
        }
        
        </g>

  )
}
export default Dot;