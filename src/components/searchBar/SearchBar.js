// Styling
import './SearchBar.css'

// React modules
import { useState, useEffect, useRef } from 'react';

// Icons
import { TiDelete } from "react-icons/ti"
import { RiArrowDropDownLine } from 'react-icons/ri'

// Import fonctions
import { recommendation, handleSearch, addTerritoryToAnalysis, namingLocation, removerTerritoryFromAnalysis, openInfo,styleModal } from './SearchFunctions'


const SearchBar = ({API_URL, setDashboard, territories, setTerritories}) => {
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


    // Effects 
    useEffect(() => {
        if(query.length%2===0 & query!==""){
            recommendation(query,API_URL,setListTerritories)
        }
       
    }, [query,API_URL])
    
    useEffect(()=>{
        if(territories.length > 1 & LIST_ITEM_REF.current.offsetWidth>=SEARCH_BAR_REF.current.offsetWidth*0.30){
            setPanelTerritories(true)   
        }
        if(territories.length>=1){
            setDashboard(true)
        }else{
            setDashboard(false)
        }
        
    },[territories,setDashboard,recommendation])

   
    return (
        <div className="search-zone">
            {/* Search bar strictly speaking */}
            <form onSubmit={(e)=>handleSearch(e,query,API_URL,setListTerritories)} className="search-form">
                <div className="search-bar" ref={SEARCH_BAR_REF}>
                    <div className="selected-list" 
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
                    </div>
                    <input className="search-value" type="input"
                    onChange={(dta) => setQuery(dta.target.value)}
                    value = {query}
                    placeholder="🔍️  Cherchez et ajoutez des territoires à votre tableau de bord (nom de commune, code postal..)"/>   
                </div>
            </form>

            {/* Drop down of suggestions */}
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

            {/* Modal of Cities added */}
            {modal.open && 
                <div className="modal" style={styleModal(modal,SEARCH_BAR_REF)}>
                    <div className="drop-header">
                        <h4 className="drop-title" >Territoires ajoutés : </h4>
                        <RiArrowDropDownLine 
                        onClick={()=>setModal({open:false})}
                         size="30px"
                        className='drop-btn close' />
    
                    </div>
                    <div className="column " >
                    {territories.sort((a,b)=>a.LIBGEO[0]>b.LIBGEO[0] ? 1 : -1).map((t,i)=>{
                        return <div key={i} className="selected sel-modal">
                        <span 
                        className=" col-items">
                            {namingLocation(t,false,territories)}
                        </span>
                            <TiDelete className="delete-territory" 
                            onClick = {e => removerTerritoryFromAnalysis(e,t,setModal,setPanelTerritories,setTerritories,territories,LIST_ITEM_REF,SEARCH_BAR_REF)}
                            />

                        </div>
                    })}
                    </div>
    
                </div>}

        </div>
    )
}

export default SearchBar
