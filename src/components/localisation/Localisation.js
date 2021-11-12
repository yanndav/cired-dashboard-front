// Styling
import './Localisation.css'

// React modules
import { useState, useEffect, useRef } from 'react';

import L from "leaflet"

// Import map function
import SearchBarTerritoires from './components/SearchBarTerritoires';
import SuggestionsDrop from './components/SuggestionsDrop';
import NomZonage from './components/NomZonage';
import ListeTerritoiresSelectionnes from './components/ListeTerritoiresSelectionnes';
import LocalisationMap from './components/LocalisationMap';

// Icons
import { MdKeyboardArrowUp } from 'react-icons/md'

// Import fonctions
import { apiRecommendation,removerTerritoryFromAnalysis } from './LocalisationFunctions'



const Localisation = ({API_URL,  territories, setTerritories}) => {
    // State variables
    const [query, setQuery] = useState("") // La recherche de l'utilisateur
    const [panelTerritories, setPanelTerritories] = useState(false) // ouvre/ferme module territoire
    const [suggestions, setSuggestions] = useState([]) //suggestions de villes
    const [nomZonage, setNomZonage] = useState("") //Nom du zonage
    const [editZonage, setEditZonage] = useState(false) //ouvre/ferme edition zonage
    const [geographies, setGeographies] = useState([]) // Geographies to be placed
    const [remove, setRemove] = useState([]) //geo to remove
    const [map, setMap] = useState(null) // map reference
    const [layer, setLayer] = useState(null)

    // Effects 
    // Lance les recherches de territoires
    useEffect(() => {
        // recherche tous les deux charactères
        if(query.length%2===0 & query!==""){
            apiRecommendation(query,API_URL,setSuggestions)
        }
       
    }, [query,API_URL])

    useEffect(() => {
        if(remove.length>0 & map){
            console.log(remove)
            removerTerritoryFromAnalysis(null,remove[0],setTerritories,territories,geographies,setGeographies,map)
            setRemove([])
        }
    }, [remove])

   
    return (
        <div className="module-localisation">
            <SearchBarTerritoires 
            query={query}
            API_URL={API_URL}
            setSuggestions={setSuggestions}
            panelTerritories={panelTerritories}
            setPanelTerritories={setPanelTerritories}
            setQuery={setQuery}/>

            {/* Ouverture de la boîte de paramètres territoriaux */}
            {panelTerritories&&<hr className="separation"/>}

            {/* Drop down of suggestions */}
            {(suggestions.length>0 && panelTerritories) &&
            <SuggestionsDrop
            suggestions={suggestions}
            setTerritories={setTerritories}
            setSuggestions={setSuggestions}
            setQuery={setQuery}
            query={query}
            territories={territories}
            setGeographies={setGeographies}
            API_URL={API_URL}
            map={map}
            setRemove={setRemove}
            />
            }
            
            {panelTerritories&&(
                <>
                <div className="parametre-territoire">
                {/* Nommer le découpage territorial */}
                        <NomZonage 
                        editZonage={editZonage}
                        setEditZonage={setEditZonage}
                        nomZonage={nomZonage}
                        setNomZonage={setNomZonage}
                        />

                    {/* Liste des territoires sélectionnés */}
                     <p className="section-titre">Territoires sélectionnés {territories.length>0&&<span className="nb-ter">{territories.length}</span>}:</p>
                    <div className="selection-territoires">
                        <ListeTerritoiresSelectionnes 
                        territories={territories}
                        setTerritories={setTerritories}
                        setGeographies={setGeographies}
                        />
                     

                     <LocalisationMap 
                     geographies={geographies}
                     setMap={setMap}
                     setLayer={setLayer}
                     map={map}
                     API_URL={API_URL}
                     setTerritories={setTerritories}
                     setGeographies={setGeographies}
                     territories={territories}
                     />

                    </div>
                    </div>                    
                    <MdKeyboardArrowUp 
                    className="arrow-btn right"
                    onClick={()=> setPanelTerritories(!panelTerritories) }
                    size={25}
                    />
                </>
                )}
        </div>
    )
}

export default Localisation




