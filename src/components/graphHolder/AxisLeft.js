const AxisLeft = ({yScale, innerWidth,innerHeight, yVariable}) => <>
{yScale.ticks(10).map(tickValue =>
    <g key={tickValue} transform={`translate(0, ${+yScale(tickValue)})`}>
        <line className="tick"
        x2={+innerWidth} 
        />
        <text 
        dy={'0.31em'} 
        dx={-10}
        className="yLabel">
            {tickValue}
        </text>

    </g>)}
    <text
    className="yTitle"
    transform={`translate(${-30}, ${innerHeight/2}) rotate(-90)`}
    >{yVariable}
</text>
    </>

export default AxisLeft