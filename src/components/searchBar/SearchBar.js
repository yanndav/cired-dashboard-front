// Styling
import './SearchBar.css'

// React modules
import { useState, useEffect, useRef } from 'react';

// Icons
import { TiDelete } from "react-icons/ti"
import { RiArrowDropDownLine } from 'react-icons/ri'

// let fakeTerritories = ["Biovallée","Diois","Crest","Valence"]

const SearchBar = ({API_URL, setDashboard, territories, setTerritories}) => {
    // Function handling search query
    const handleSearch = (e) =>{
        e.preventDefault();
        setDashboard(true)
    
    }

    const addTerritoryToAnalysis = (e,t) => {
        e.preventDefault();
        setTerritories(territories => [...territories,t])
        setListTerritories(listTerritories.filter(ter=>ter!==t))  
        setQuery("")
        if(LIST_ITEM_REF.current.offsetWidth>=SEARCH_BAR_REF.current.offsetWidth*0.25){
            setPanelTerritories(true)   
        }
        
    }

    const removerTerritoryFromAnalysis = (e,t) =>{
        e.preventDefault();
        setTerritories(territories.filter(ter=>ter!==t))
        if(LIST_ITEM_REF.current.offsetWidth<=SEARCH_BAR_REF.current.offsetWidth*0.3){
            setPanelTerritories(false)   
        }
    }

    const SEARCH_BAR_REF = useRef(null)
    const LIST_ITEM_REF = useRef(null)
    const [query, setQuery] = useState("")
    const [listTerritories, setListTerritories] = useState([])
    const [panelTerritories, setPanelTerritories] = useState(false)

    useEffect(() => {
        let  start = new Date().getTime();
        const  recommendation = async (query) =>{
            const response = await fetch(`${API_URL}/getLocation`, {
                body: JSON.stringify({"location":query}),
                method: "POST",
                headers: {
                    // Authorization: bearer,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },

              });
              const data = await response.json()
           
            setListTerritories(data)   
        }
        recommendation(query)
       
    }, [query,API_URL])

  
    return (
        <div className="search-zone">
            {/* Search bar strictly speaking */}
            <form onSubmit={(e)=>handleSearch(e)} className="search-form">
                <div className="search-bar" ref={SEARCH_BAR_REF}>
                    <div className="selected-list" ref={LIST_ITEM_REF}>
                        {panelTerritories?(
                            <div className="selected-list-min">
                            <span 
                                key={19}
                                className="selected">
                                    {territories[0].LIBGEO[0]+' ('+territories[0].CODGEO[0].substring(0,2)+')'}
                                    <TiDelete className="delete-territory" 
                                    onClick = {e => removerTerritoryFromAnalysis(e,territories[0])}
                                    />
                            </span>
                            <span 
                                key={10}
                                className="selected aggregate">
                                    + {territories.length-1} 
                            </span>
                            <RiArrowDropDownLine  size="30px" className="drop-btn" />
                            </div>
                        ):(

                    territories.map((t,i)=>{
                        return <span 
                        key={i}
                        className="selected">
                            {t.LIBGEO[0]+' ('+t.CODGEO[0].substring(0,2)+')'}
                            <TiDelete className="delete-territory" 
                            onClick = {e => removerTerritoryFromAnalysis(e,t)}
                            />
                        </span>
                    })
                        )}
                    </div>
                    <input className="search-value" type="input"
                    onChange={(dta) => setQuery(dta.target.value)}
                    value = {query}
                    placeholder="Cherchez et ajoutez des territoires à votre tableau de bord"/>   
                </div>
                <input className="search-go" type="submit" value="GO"/>
            </form>

            {/* Drop down of suggestions */}
            <div className="propositions">
                        {query!==""&&listTerritories.map((t,i)=>{
                            return <span 
                            key={i}
                            onClick={e=>addTerritoryToAnalysis(e,t)}
                            className="item-list proposition">
                                {t.LIBGEO[0]+' ('+t.CODGEO[0].substring(0,2)+')'}
                            </span>
                        })}
            </div> 
        </div>
    )
}

export default SearchBar
