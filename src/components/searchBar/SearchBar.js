import React from 'react'
import './SearchBar.css'

const SearchBar = () => {
    return (
        <form className="search-bar">
            <input className="search-go" type="submit" value="GO"/>
            <input className="search-value" type="input"
            placeholder="Cherchez et ajoutez des territoires à votre tableau de bord"/>
        </form>
    )
}

export default SearchBar
