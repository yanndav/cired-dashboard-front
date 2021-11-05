// Styling
import './Localisation.css'

// React modules
import { useState, useEffect, useRef } from 'react';

// Import map function
import LocalisationMap from './LocalisationMap';

// Icons
import { TiDelete } from "react-icons/ti"
import { MdKeyboardArrowUp } from 'react-icons/md'
import { FaSave } from "react-icons/fa"

// Import fonctions
import { recommendation, handleSearch, addTerritoryToAnalysis, namingLocation, removerTerritoryFromAnalysis, openInfo,styleModal } from './LocalisationFunctions'


const Localisation = ({API_URL, setDashboard, territories, setTerritories}) => {
    // Ref definitions
    const SEARCH_BAR_REF = useRef(null)
    const LIST_ITEM_REF = useRef(null)

    // State variables
    const [modal,setModal] = useState({
        clientX:0,
        clientY:0,
        open:false,
    })
    const [query, setQuery] = useState("")
    const [listTerritories, setListTerritories] = useState([])
    const [panelTerritories, setPanelTerritories] = useState(false)
    const [nomTerritoire, setNomTerritoire] = useState("")
    const [editTerritoire, setEditTerritoire] = useState(false)
   
   
    // Effects 
    useEffect(() => {
        if(query.length%2===0 & query!==""){
            recommendation(query,API_URL,setListTerritories)
        }
       
    }, [query,API_URL])
    
    // useEffect(()=>{
    //     if(territories.length > 1 & LIST_ITEM_REF.current.offsetWidth>=SEARCH_BAR_REF.current.offsetWidth*0.30){
    //         setPanelTerritories(true)   
    //     }
    //     if(territories.length>=1){
    //         setDashboard(true)
    //     }else{
    //         setDashboard(false)
    //     }
        
    // },[territories,setDashboard,recommendation])

   
    return (
        <div className="module-localisation">
            {/* Search bar strictly speaking */}
            <form 
            onSubmit={(e)=>handleSearch(e,query,API_URL,setListTerritories)} 
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
            {/* Ouverture de la boîte de paramètres territoriaux */}
            {panelTerritories&&<hr className="separation"/>}

            {/* Drop down of suggestions */}
            {(listTerritories.length>0 && panelTerritories) &&
            <div className="propositions">
                        {query!==""&&listTerritories.map((t,i)=>{
                            return <span 
                            key={i}
                            onClick={e=>addTerritoryToAnalysis(e,t,setTerritories,setListTerritories,setQuery,territories,listTerritories)}
                            className="item-list proposition">
                                {namingLocation(t,false,territories)}
                            </span>
                        })}
            </div> 
            }
            
            {panelTerritories&&(
                <>
                {/* Nommer le découpage territorial */}
                <div className="parametre-territoire">
                    <div className="decoupage-territoire">
                        {!editTerritoire?(
                            <div onClick={()=>setEditTerritoire(true)}
                            className="name-stable-territoire">
                                {nomTerritoire==""?"Nommer et sauvegarder ce zonage":nomTerritoire}
                            </div>
                        ):(
                            <form onSubmit={()=>setEditTerritoire(false)}
                            className="form-name">
                                <input 
                                type="text"
                                className="name-edit-territoire"
                                style={{ width: (nomTerritoire.length<36?"260px":(nomTerritoire.length + 1) * 8.5 + "px") }}
                                placeholder="Nommer et sauvegarder ce zonage"
                                value={nomTerritoire} 
                                onChange={e=>setNomTerritoire(e.target.value)}>
                                </input>
                                <FaSave 
                                className="save"
                                size={15}
                                onClick={()=>setEditTerritoire(false)}
                                />

                            </form>
                        )}

                    </div>
                    {/* Liste des territoires sélectionnés */}
                     <p className="section-titre">Territoires sélectionnés:</p>
                    <div className="selection-territoires">



                     <div className="list-territoires">

                    { territories.length>0?territories.map((t,i)=>{
                        return <span 
                        key={i}
                        className="selected">
                            {namingLocation(t,true,territories)}
                            <TiDelete className="delete-territory" 
                            onClick = {e => removerTerritoryFromAnalysis(e,t,setTerritories,territories)}
                            />
                        </span>
                    }):
                    "Ajoutez un territoire à votre périmètre"
                }
                     </div>

                     <LocalisationMap 
                     territories={territories}
                     API_URL={API_URL}
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




// Liste de villes sélectionnées:
{/* <div className="selected-list" 
                    ref={LIST_ITEM_REF}>
                        {panelTerritories?(
                            <div className="selected-list-min">
                            <span 
                                key={19}
                                className="selected">
                                    {namingLocation(territories[0],true,territories)}
                                    <TiDelete className="delete-territory" 
                                    onClick = {e => removerTerritoryFromAnalysis(e,territories[0],setModal,setPanelTerritories,setTerritories,territories,LIST_ITEM_REF,SEARCH_BAR_REF)}
                                    />
                            </span>
                            <span onClick={(e)=>openInfo(e,SEARCH_BAR_REF,setModal)}
                                key={10}
                                className="selected aggregate">
                                    + {territories.length-1} 
                            </span>
                            <RiArrowDropDownLine  
                            onClick={(e)=>openInfo(e,SEARCH_BAR_REF,setModal)}
                            size="30px" className="drop-btn" />
                            </div>
                        ):(

                    territories.map((t,i)=>{
                        return <span 
                        key={i}
                        className="selected">
                            {namingLocation(t,true,territories)}
                            <TiDelete className="delete-territory" 
                            onClick = {e => removerTerritoryFromAnalysis(e,t,setModal,setPanelTerritories,setTerritories,territories,LIST_ITEM_REF,SEARCH_BAR_REF)}
                            />
                        </span>
                    })
                        )}
                    </div> */}