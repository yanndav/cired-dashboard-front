// Styling
import '../Localisation.css'

import { addTerritoryToAnalysis,namingLocation } from '../LocalisationFunctions'




const SuggestionsDrop = ({suggestions, setTerritories,setSuggestions,setQuery,query,territories,setGeographies,API_URL,map}) =>{
    // Ensemble des suggestions
    return(
        <div className="propositions">
                        {query!==""&&suggestions.map((t,i)=>{
                            return <span 
                            key={i}
                            onClick={e=>addTerritoryToAnalysis(e,t,territories,setTerritories,
                                setSuggestions,setQuery,suggestions,2021,
                                API_URL,setGeographies,
                                map)}
                            className="item-list proposition">
                                {namingLocation(t,false,territories)}
                            </span>
                        })}
            </div> 
)
}
export default SuggestionsDrop