// Styling
import '../Localisation.css'

import { FaSave } from "react-icons/fa"

import { useEffect,useState } from 'react'
const NomZonage = ({editZonage, setEditZonage, nomZonage,setNomZonage}) =>{


    {/* Nommer le découpage territorial */}
    return(

        <div className="decoupage-territoire">

    {!editZonage?(
        <div onClick={()=>setEditZonage(true)}
        className="name-stable-territoire">
            {nomZonage==""?"Nommer et sauvegarder ce zonage":nomZonage}
        </div>
    ):(
        <form onSubmit={()=>setEditZonage(false)}
        className="form-name">
            <input 
            type="text"
            className="name-edit-territoire"
            style={{ width: (nomZonage.length<36?"260px":(nomZonage.length + 1) * 8.5 + "px") }}
            placeholder="Nommer et sauvegarder ce zonage"
            value={nomZonage} 
            onChange={e=>setNomZonage(e.target.value)}>
            </input>
            <FaSave 
            className="save"
            size={15}
            onClick={()=>setEditZonage(false)}
            />

        </form>
    )}
    </div>
    )
}

export default NomZonage