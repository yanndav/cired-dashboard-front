// Importing react hooks
import { useState, useEffect } from 'react'

// Importing icons
import { RiArrowUpSLine } from 'react-icons/ri'
import { VscListSelection } from 'react-icons/vsc'

// Import styling
import './VariablesPicker.css'

// Importing functions
import { getVariables,changeStatusVariable,checkSelected } from './VariablesFunctions'



const VariablesPicker = ({territories,API_URL,selectedVariables,setSelectedVariables}) => {

const [openPicker,setOpenPicker] = useState(false)
const [candidateVariables, setCandidateVariables] = useState([])


useEffect(()=>{
    getVariables(territories,API_URL,setCandidateVariables)
},[territories])


    return (
        <div className="variables-container">
            {openPicker?(
                <div className="top-picker">
                <VscListSelection 
                className='lines arrow'
                size={'22px'}
                onClick={() => setOpenPicker(false)}
                />

                {selectedVariables.length >=1?(
                    <div className="selected-top">
                        {selectedVariables.map(vari => 
                        <p 
                        onClick={()=>changeStatusVariable(vari,selectedVariables,setSelectedVariables)}
                        className="variable-picker attop"
                        style={
                            {backgroundColor:checkSelected(vari,selectedVariables)&&'#0AAACB',
                            color:checkSelected(vari,selectedVariables)&&'white'
                            
                        }}
                        >
                            {vari.LIB}
                       </p> 
                       )}
                    </div>
                ):(
                    <h4                 
                    onClick={() => setOpenPicker(false)}
                    className="top-legend clickable">Sélectionnez des indicateurs</h4>
                )}
                </div>
            ):(
                <>
                <div className="top-picker">
                <RiArrowUpSLine 
                className='arrow closed'
                onClick={() => setOpenPicker(true)}
                />
                <h4 
                onClick={() => setOpenPicker(true)}
                className="top-legend clickable"
                >
                    Sélectionnez des indicateurs</h4>
                </div>
                <div className="selection-picker">
                    {candidateVariables.map((doc,i) => {
                        return (
                        <div key={i} className="document-picker">
                            <div>
                            <h5>{doc.document}</h5>
                            <hr/>
                            </div>
                            <div className="list">
                            {doc.variables.map(vari => 
                                     <p 
                                     onClick={()=>changeStatusVariable(vari,selectedVariables,setSelectedVariables)}
                                     className="variable-picker"
                                     style={
                                         {backgroundColor:checkSelected(vari,selectedVariables)&&'#0AAACB',
                                         color:checkSelected(vari,selectedVariables)&&'white'
                                    
                                    }}
                                     >
                                         {vari.LIB}
                                    </p> 
                            )
                            }
                            </div>
                        </div>)
                    })
                    }
                </div>
                </>
            )}
        </div>
    )
}

export default VariablesPicker
