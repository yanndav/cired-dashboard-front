const Bars = ({data,xScale,yScale,innerHeight,xVariable,yVariable}) => data.map(d =>
  <rect className="bar"
  key={xScale(d[xVariable])}
  y={yScale(d[yVariable])}
  x={xScale(d[xVariable])}
  width={xScale.bandwidth()}
  height={innerHeight - yScale(d[yVariable])}
  >
    <title>
      {d[yVariable]}
    </title>
  </rect>)
  
export default Bars