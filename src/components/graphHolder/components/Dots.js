const Dots = ({data,xScale,yScale,xVariable,yVariable,radius=4}) => data.map(d =>
    <circle className="dot"
    // key={xScale(d[xVariable])*yScale(d[yVariable])}
    cy={yScale(d[yVariable])}
    cx={xScale(d[xVariable])}
    r={radius}
    />)
    
  export {Dots};