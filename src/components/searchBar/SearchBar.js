// Styling
import './SearchBar.css'

// React modules
import { useState, useEffect } from 'react';

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
        <form onSubmit={(e)=>handleSearch(e)} className="search-bar">
            <input className="search-go" type="submit" value="GO"/>
            <div className="search-zone">
                {territories.map(t=>{
                    return <span 
                    className="item-proposition">
                        {t}
                    </span>
                })}
                <input className="search-value" type="input"
                onChange={(dta) => setQuery(dta.target.value)}
                placeholder="Cherchez et ajoutez des territoires à votre tableau de bord"/>   
                <div className="propositions">
                    {query!==""&&listTerritories.map((t)=>{
                        return <span 
                        onClick={e=>addTerritoryToAnalysis(e,t)}
                        className="item-proposition">
                            {t}
                        </span>
                    })}
                </div> 
            </div>
        </form>
    )
}

export default SearchBar
