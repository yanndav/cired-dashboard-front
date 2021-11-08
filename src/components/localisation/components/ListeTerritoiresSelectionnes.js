// Styling
import '../Localisation.css'

//Icons
import { TiDelete } from "react-icons/ti"

// Functions
import { namingLocation, removerTerritoryFromAnalysis } from "../LocalisationFunctions"

const ListeTerritoiresSelectionnes = ({territories,setTerritories,geographies,setGeographies,map}) =>{
    return(
        <div className="list-territoires">

                    { territories.length>0?territories.map((t,i)=>{
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