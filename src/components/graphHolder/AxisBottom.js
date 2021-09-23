// import './GraphHolder.css'

const AxisBottom = ({xScale,innerHeight,innerWidth,xVariable}) => 
<>
{xScale.domain().map(tickValue =>
    <g key={tickValue} transform={`translate(${xScale(tickValue)+xScale.bandwidth()/2},${innerHeight+10})`}>
    <text 
    dy={'0.71em'} 
    className="xLabel">
        {tickValue}
    </text>
    </g>
    )}
<text
    x={innerWidth/2}
    y={innerHeight+45} 
    className="xTitle"
    >{xVariable}
</text>
</>

export default AxisBottom