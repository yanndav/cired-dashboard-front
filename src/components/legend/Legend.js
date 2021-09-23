// Styling
import './Legend.css'

// React hooks
import { useState } from 'react';

// Icons
import { FaRegQuestionCircle } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg'

// Import functions
import {legendLocation, legendTime, evolValue} from './LegendFunctions'

// Import react modals


const variables = [{
    'label':'terres artificialisées',
    "pre_label":"la part des",
    'unite_label':'pourcentage de la surface totale',
    'definition':"Transformation d'un sol à caractère agricole, naturel ou forestier par des actions d'aménagement, pouvant entraîner son imperméabilisation totale ou partielle. Ce changement d'usage des sols, le plus souvent irréversible, a des conséquences qui peuvent être préjudiciables à l'environnement et à la production agricole",
    'source_definition_url':"https://www.insee.fr/fr/metadonnees/definition/c2190",
    'source_definition_name':'Insee',
    'year':[1990,2000,2006,2012,2018],
    'value':[20,25,26,29,30],
    'unit':"%"
}]






const Legend = ({territories}) => {
    const [modal,setModal] = useState({
        clientX:0,
        clientY:0,
        open:false,
        variable:'',
        definition:'',
        source:''
    })

    const openInfo = (e,v) =>{
        console.log(e)
        const clientX = e.target.offsetLeft
        const clientY = e.target.offsetTop
        setModal({
            clientX:clientX,
            clientY:clientY,
            open:true,
            variable:v.label,
            definition:v.definition,
            source_url:v.source_definition_url,
            source_name:v.source_definition_name,
        })
    }

    const styleModal = (modal) =>{
        const width = 400
        return {
            width:width,
            top:modal.clientY+25,
            left:modal.clientX
        }
    }


    const legendEvolution = (variables) => {
        return variables.map((v,i) => {
        return <> {legendTime(v.year)}, 
            {' '+v.pre_label + ' '} 
            <span className="info-variable"
            style = {{backgroundColor:modal.open&&"#2cc5e45e"}}
            onClick={e => openInfo(e,v) }
            >
                {v.label + ' '} 
                <FaRegQuestionCircle className="question-variable"/>
            </span> 
            {' a'} 
            <span className="info-focus">{evolValue(v)}</span>
            </>
    }

    )
    }

    return (
        <div className="legend-container">
            <h3 className="legend-title">Vous étudiez {legendLocation(territories)}</h3>
            <p className="legend-content">
                {legendEvolution(variables)}
            </p>
            {modal.open && 
            <div className="modal" style={styleModal(modal)}>
                <div className="header-legend">
                    <h4   className="title-var">{modal.variable} </h4>
                    <CgClose className="close-legend" onClick={()=>setModal({open:false})}/>

                </div>
                <hr className="line-thin"/>
                <p className="legend-var">{modal.definition}</p>
                <p className="source-var">Source: <a href={modal.source_url} target="_blank" rel="noreferrer">{modal.source_name}</a></p>

            </div>}

            {/* <p className="legend-content">{legendTime(time)}, la part des <span className="info-variable">terres artificialisées <FaRegQuestionCircle className="question-variable"/></span> a <span className="info-focus">augmenté de 8%</span>. 
            Dans le même temps <span className="info-variable">la population <FaRegQuestionCircle className="question-variable"/></span> a <span className="info-focus">augmenté de 2%</span>.</p> */}
        </div>
    )
}

export default Legend
