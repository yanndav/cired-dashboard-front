// Styling
import '../Localisation.css'

//Icons
import { TiDelete } from "react-icons/ti"

// Import hooks
import { useState, useEffect } from 'react'

// Functions
import { namingLocation, removerTerritoryFromAnalysis } from "../LocalisationFunctions"

const ListeTerritoiresSelectionnes = ({territories,setTerritories,setGeographies}) =>{
const [selection,setSelection] = useState(territories)
useEffect(() => {
    setSelection(territories)
}, [territories])
    return(
        <div className="list-territoires">

                    { selection.length>0?selection.map((t,i)=>{
                        // addShape(t,2021,API_URL,setGeographies,map)
                        return <span 
                        key={i}
                        className="selected">
                            {namingLocation(t,true,selection)}
                            <TiDelete className="delete-territory" 
                            onClick = {e => removerTerritoryFromAnalysis(e,t,setTerritories,setGeographies)}
                            />
                        </span>
                    }):
                    "Ajoutez un territoire à votre périmètre"
                }
                     </div>
    )
}
export default ListeTerritoiresSelectionnes