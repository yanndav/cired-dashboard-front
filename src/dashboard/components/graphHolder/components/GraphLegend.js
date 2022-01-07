
const widthLegend = (territories,i) => {
    if(i!==0){
       return territories.slice(0,i).map(ti=>ti.LIBGEO[0]).join('').length*9 +30*(i-1) + 30

    }else{
        return 0
    }
    
}
const GraphLegend = ({territories,colorsPick,innerHeight,innerWidth,showY,setShowY}) => {
    
    return (

        <g 
        transform={`translate(0,${innerHeight+70})`}
        className="legend-graph"
        >
            {territories.map((t,i)=>{
                const show_y = showY == t.CODGEO[0]
            return <g transform={`translate(${widthLegend(territories,i)},0)`}
            >
                <circle 
                className="dot"
                transform={`translate(7.5,-5)`}
                r={3}
                style={{fill:colorsPick[i]}}
                />    
                <line
                x1={0}
                x2={15}
                y1={-5}
                y2={-5}
                style={{stroke:colorsPick[i],strokeWidth:2}}
                />    
                <text
                onMouseOver={()=>setShowY(t.CODGEO[0])}
                onMouseOut={()=>setShowY(null)}
                transform={`translate(18,0)`}
                style={{fill:colorsPick[i],fontWeight:show_y?(900):(500)}}

                >{t.LIBGEO[0]}</text>    

            </g>}
            )}
        </g>
    )
}

export default GraphLegend
