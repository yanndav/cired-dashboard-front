import LineChart from "./graphs/LineChart"

const Graph = ({vari, width, height,territories}) => {
    return (
        <LineChart 
        data={vari.DATA}
        xVariable={'ANNEE'}
        yVariable={'VALEUR'}
        color={'CODGEO'}
        nameVar={vari.LIB}
        width={width}
        height={height}
        territories={territories}
        />        
    )
}

export default Graph
