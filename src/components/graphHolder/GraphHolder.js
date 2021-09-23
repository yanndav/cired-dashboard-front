
// Styling
import './GraphHolder.css'
import BarChart from './BarChart';


const width =  600 ; 
const height = 400;



// Partie data
const data = [
    {'value':8,
    'country':'France'},
    {'value':1,
    'country':'Brazil'},
    {'value':3,
    'country':'Zimbabwe'}
] ; 

const xVariable = 'country'
const yVariable ='value'

const data2 = [
    {'value':11,
    'country':'France'},
    {'value':7,
    'country':'Germany'},
    {'value':3,
    'country':'England'},
    {'value':11,
    'country':'France3'},
    {'value':11,
    'country':'France2'},
 
] ; 

const GraphHolder = () => {
    return (
        <div className="graph-container">
            <BarChart 
            data={data}
            xVariable={xVariable}
            yVariable={yVariable}
            width={width}
            height={height}
            />   
            <BarChart 
            data={data2}
            xVariable={xVariable}
            yVariable={yVariable}
            width={width}
            height={height}
            />            
        </div>
    )
}

export default GraphHolder
