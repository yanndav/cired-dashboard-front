// Styling
import '../Localisation.css'

import { handleSearch } from "../LocalisationFunctions"
import { MdKeyboardArrowUp } from 'react-icons/md'


const SearchBarTerritoires = ({query,API_URL,setSuggestions,panelTerritories,setPanelTerritories,setQuery}) =>{
    {/* Search bar strictly speaking */}

    return(
    <form 
    onSubmit={(e)=>handleSearch(e,query,API_URL,setSuggestions)} 
    onClick={()=>setPanelTerritories(true)}
    className="search-form">
            <input className="search-value" type="input"
            onChange={(dta) => setQuery(dta.target.value)}
            value = {query}
            placeholder="🔍️  Cherchez et ajoutez des territoires à votre tableau de bord (nom de commune, code postal..)"/>   
           {!panelTerritories&&
           <MdKeyboardArrowUp 
           className="arrow-btn"
           onClick={()=> setPanelTerritories(!panelTerritories) }
           size={25}
           style={{transform:`rotate(180deg)`}}
           />
        } 
    </form>

    )
}

export default SearchBarTerritoires