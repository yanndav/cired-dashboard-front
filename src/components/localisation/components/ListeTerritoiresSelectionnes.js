// Styling
import '../Localisation.css'

//Icons
import { TiDelete } from "react-icons/ti"

// Functions
import { namingLocation, removerTerritoryFromAnalysis,addShape } from "../LocalisationFunctions"

const ListeTerritoiresSelectionnes = ({territories,setTerritories,geographies,setGeographies,map,API_URL}) =>{
    return(
        <div className="list-territoires">

                    { territories.length>0?territories.map((t,i)=>{
                        // addShape(t,2021,API_URL,setGeographies,map)
                        return <span 
                        key={i}
                        className="selected">
                            {namingLocation(t,true,territories)}
                            <TiDelete className="delete-territory" 
                            onClick = {e => removerTerritoryFromAnalysis(e,t,setTerritories,territories,geographies,setGeographies,map)}
                            />
                        </span>
                    }):
                    "Ajoutez un territoire à votre périmètre"
                }
                     </div>
    )
}
export default ListeTerritoiresSelectionnes