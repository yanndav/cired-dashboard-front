import './NameTableau.css'

import { useState,useRef, useEffect } from "react"

import { GoCheck } from "react-icons/go";

const NameTableau = () => {
    const [edit, setEdit] = useState(false)
    const [name, setName ] = useState("")



    return (
        <>
        <div className="container-name">
            {!edit?(
                <div 
                className="name-solid"
                onClick={()=>setEdit(!edit)}>
                    {name===""?("Tableau sans titre"):(name)}
                </div>
            ):(
                <form onSubmit={()=>setEdit(!edit)}>
                    <input 
                    type="text"
                    className="name-edit"
                    style={{ width: (name.length<36?"300px":(name.length + 1) * 8.5 + "px") }}
                    placeholder="Tableau sans titre"
                    value={name} 
                    onChange={e=>setName(e.target.value)}>
                    </input>
                    <GoCheck 
                    className="check"
                    size={20}
                    onClick={()=>setEdit(!edit)}
                    />

                </form>
            )}
        </div>
        <hr className="sep-line"/>
        </>
    )
}

export default NameTableau
