// Styling
import './Legend.css'

// Icons
import { FaRegQuestionCircle } from 'react-icons/fa';

// Import functions
import {legendLocation, legendTime} from './LegendFunctions'


// Constants
// const time = [1990,2018]

const variables = [{
    'label':'terres artificialisées',
    "pre_label":"la part des",
    'unite_label':'pourcentage de la surface totale',
    'definition':"Transformation d'un sol à caractère agricole, naturel ou forestier par des actions d'aménagement, pouvant entraîner son imperméabilisation totale ou partielle. Ce changement d'usage des sols, le plus souvent irréversible, a des conséquences qui peuvent être préjudiciables à l'environnement et à la production agricole",
    'source_definition':"https://www.insee.fr/fr/metadonnees/definition/c2190",
    'year':[1990,2000,2006,2012,2018],
    'value':[20,25,26,29,30],
    'unit':"%"
}]

const evolValue = (v) =>{
    const minYearI = v.year.indexOf(Math.min.apply(Math,v.year))
    const maxYearI = v.year.indexOf(Math.max.apply(Math,v.year))

    const startV = v.value[minYearI]
    const endV = v.value[maxYearI]

    const direction = (endV-startV < 0)?("diminué "):("augmenté ")

    if(v.unit==="%"){
        return <>{direction} de {endV-startV} points de pourcentage, en passant de {startV}% a {endV}%.</>
    }
}

const legendEvolution = (variables) => {
     return variables.map((v,i) => {
        return <> {legendTime(v.year)}, 
          {' '+v.pre_label} <span className="info-variable">{v.label} <FaRegQuestionCircle className="question-variable"/></span> a <span className="info-focus">{evolValue(v)}</span>
         </>
    }

    )
}
const Legend = ({territories}) => {
    return (
        <div className="legend-container">
            <h3 className="legend-title">Vous étudiez {legendLocation(territories)}</h3>
            <p className="legend-content">
                {legendEvolution(variables)}
            </p>


            {/* <p className="legend-content">{legendTime(time)}, la part des <span className="info-variable">terres artificialisées <FaRegQuestionCircle className="question-variable"/></span> a <span className="info-focus">augmenté de 8%</span>. 
            Dans le même temps <span className="info-variable">la population <FaRegQuestionCircle className="question-variable"/></span> a <span className="info-focus">augmenté de 2%</span>.</p> */}
        </div>
    )
}

export default Legend
