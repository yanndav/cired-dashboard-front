// Styling
import './SearchBar.css'

// React modules
import { useState, useEffect } from 'react';

// Icons
import { TiDelete } from "react-icons/ti"

let fakeTerritories = ["Biovallée","Diois","Crest","Valence"]

const SearchBar = ({setDashboard, territories, setTerritories}) => {
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
    }

    const removerTerritoryFromAnalysis = (e,t) =>{
        e.preventDefault();
        setTerritories(territories.filter(ter=>ter!==t))

    }

    const [query, setQuery] = useState("")
    const [listTerritories, setListTerritories] = useState([])

    useEffect(() => {
        const recommendation = (query) =>{
            let tempoTerritories = fakeTerritories.filter(territory=>
                territory.toLowerCase().includes(query.toLowerCase()))

            setListTerritories(tempoTerritories)         
        }

        recommendation(query) 
    }, [query])

    return (
        <div className="search-zone">
            {/* Search bar strictly speaking */}
            <form onSubmit={(e)=>handleSearch(e)} className="search-form">
                <div className="search-bar">
                    {territories.map(t=>{
                        return <span 
                        className="selected">
                            {t}
                            <TiDelete className="delete-territory" 
                            onClick = {e => removerTerritoryFromAnalysis(e,t)}
                            />
                        </span>
                    })}
                    <input className="search-value" type="input"
                    onChange={(dta) => setQuery(dta.target.value)}
                    value = {query}
                    placeholder="Cherchez et ajoutez des territoires à votre tableau de bord"/>   
                </div>
                <input className="search-go" type="submit" value="GO"/>
            </form>

            {/* Drop down of suggestions */}
            <div className="propositions">
                        {query!==""&&listTerritories.map((t)=>{
                            return <span 
                            onClick={e=>addTerritoryToAnalysis(e,t)}
                            className="item-list proposition">
                                {t}
                            </span>
                        })}
            </div> 
        </div>
    )
}

export default SearchBar
