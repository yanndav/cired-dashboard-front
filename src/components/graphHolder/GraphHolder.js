
// Styling
import './GraphHolder.css'
import BarChartCategorical from './graphs/BarChart';
import ScatterPlot from './graphs/ScatterPlot'
import LineChart from './graphs/LineChart';

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
    {'Land':11,
    'Population':3},
    {'Land':14,
    'Population':1}, 
    {'Land':10,
    'Population':2}, 
    {'Land':8,
    'Population':5},
     {'Land':13,
    'Population':2.5},
 
] ; 

const xVariable2 = 'Land'
const yVariable2 ='Population'


const data3 = [
    {'Year': new Date('2015-03-20T21:00:00.000Z'),
    'Population':3},
    {'Year': new Date('2016-03-20T22:00:00.000Z'),
    'Population':1}, 
    {'Year': new Date("2016-04-20T23:00:00.000Z"),
   'Population':2.5},
   {'Year': new Date("2017-03-20T23:00:00.000Z"),
   'Population':2}, 
   {'Year': new Date("2018-03-20T23:00:00.000Z"),
   'Population':5},
   {'Year': new Date('2019-03-20T22:00:00.000Z'),
   'Population':5}, 
   {'Year': new Date("2020-04-20T23:00:00.000Z"),
  'Population':6.5},
 
] ; 

const xVariable3 = 'Year'
const yVariable3 ='Population'

const GraphHolder = () => {
    return (
        <div className="graph-container">
            <BarChartCategorical 
            data={data}
            xVariable={xVariable}
            yVariable={yVariable}
            width={width}
            height={height}
            />   
            <ScatterPlot 
            data={data2}
            xVariable={xVariable2}
            yVariable={yVariable2}
            width={width}
            height={height}
            />     
             <LineChart 
            data={data3}
            xVariable={xVariable3}
            yVariable={yVariable3}
            width={width}
            height={height}
            />        
        </div>
    )
}

export default GraphHolder
