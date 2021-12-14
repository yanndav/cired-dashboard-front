import Header from "../../../components/header/Header"
import './Connection.css'


import { useState } from "react"


const Connection = () => {

    const [connect,setConnect] = useState(true)

    return (
        <>
        {/* <Header/> */}
        <div className="container-connection">

            <div class="container-boutons">
                <span 
                onClick={()=>setConnect(true)}
                className="bouton" 
                style={{
                    color:connect?("white"):("black"),
                    backgroundColor:connect?('#0AAACB'):('white')
            }}>Se connecter</span>
                <span 
                className="bouton"
                onClick={()=>setConnect(false)}
                style={{
                    color:!connect?("white"):("black"),
                    backgroundColor:!connect?('#0AAACB'):('white')}}
                >S'inscrire</span>

            </div>
        <div className="inscription-container">
            <form className="inscription">
                <input className="in" placeholder="Email" type="email"/>
                {!connect&&
                <input className="in" placeholder="Nom" type="text"/>}
                {!connect&&
                <input className="in" placeholder="Prénom" type="text"/>}
                <input className="in" placeholder="Mot de passe" type="password"/>
                {!connect&&
                <input className="in" placeholder="Confirmer le mot de passe" type="password"/>}
                <input className="aller" type="button" value={connect?"Se connecter":"S'inscrire"}/>
            </form>
            
        </div>
        </div>

        </>
    )
}

export default Connection