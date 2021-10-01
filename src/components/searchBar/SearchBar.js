// Styling
import './SearchBar.css'

// React modules
import { useState, useEffect, useRef } from 'react';

// Icons
import { TiDelete } from "react-icons/ti"
import { RiArrowDropDownLine } from 'react-icons/ri'

// let fakeTerritories = ["Biovallée","Diois","Crest","Valence"]

const SearchBar = ({API_URL, setDashboard, territories, setTerritories}) => {
    const SEARCH_BAR_REF = useRef(null)
    const LIST_ITEM_REF = useRef(null)
    const [modal,setModal] = useState({
        clientX:0,
        clientY:0,
        open:false,
    })

    const [query, setQuery] = useState("")
    const [listTerritories, setListTerritories] = useState([])
    const [panelTerritories, setPanelTerritories] = useState(false)


    useEffect(() => {
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
    
    useEffect(()=>{
        if(territories.length > 1 & LIST_ITEM_REF.current.offsetWidth>=SEARCH_BAR_REF.current.offsetWidth*0.30){
            setPanelTerritories(true)   
        }
        
    },[territories])

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
        if(territories.length-1===0){
            setModal({open:false})
        }
        if(territories.length-2===0){
            setPanelTerritories(false)
            setModal({open:false})
   
        }
        setTerritories(territories.filter(ter=>ter!==t))
      
        if(LIST_ITEM_REF.current.offsetWidth<=SEARCH_BAR_REF.current.offsetWidth*0.3 ){
            setPanelTerritories(false)   
        }
    }




    const namingLocation = (t,shorten=false) =>{
        if(t.LIBGEO[0].length > 10 & shorten===true){
            if(territories.length >1){
                return t.LIBGEO[0].substring(0,6)+'... ('+t.CODGEO[0].substring(0,2)+')'
            }else{
                return t.LIBGEO[0].substring(0,10)+'... ('+t.CODGEO[0].substring(0,2)+')'
            }
        }else{
           return t.LIBGEO[0]+' ('+t.CODGEO[0].substring(0,2)+')'
        }
    }

    const openInfo = (e) =>{
        setModal({
            clientX:SEARCH_BAR_REF.current.offsetLeft,
            clientY:SEARCH_BAR_REF.current.offsetTop,
            open:true,
        })
    }

    const styleModal = (modal) =>{
        // console.log(SEARCH_BAR_REF.current.offsetWidth)
        const width = SEARCH_BAR_REF.current.offsetWidth*0.25
        return {
            width:width,
            top:modal.clientY,
            left:modal.clientX,
            borderRadius:7
        }
    }

  
    return (
        <div className="search-zone">
            {/* Search bar strictly speaking */}
            <form onSubmit={(e)=>handleSearch(e)} className="search-form">
                <div className="search-bar" ref={SEARCH_BAR_REF}>
                    <div className="selected-list" 
                    // style={{maxWidth: barWidth*0.30}}
                    ref={LIST_ITEM_REF}>
                        {panelTerritories?(
                            <div className="selected-list-min">
                            <span 
                                key={19}
                                className="selected">
                                    {namingLocation(territories[0],true)}
                                    <TiDelete className="delete-territory" 
                                    onClick = {e => removerTerritoryFromAnalysis(e,territories[0])}
                                    />
                            </span>
                            <span onClick={(e)=>openInfo(e)}
                                key={10}
                                className="selected aggregate">
                                    + {territories.length-1} 
                            </span>
                            <RiArrowDropDownLine  
                            onClick={(e)=>openInfo(e)}
                            size="30px" className="drop-btn" />
                            </div>
                        ):(

                    territories.map((t,i)=>{
                        return <span 
                        key={i}
                        className="selected">
                            {namingLocation(t,true)}
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
                                {namingLocation(t)}
                            </span>
                        })}
            </div> 

            {/* Modal of Cities added */}
            {modal.open && 
                <div className="modal" style={styleModal(modal)}>
                    <div className="drop-header">
                        <h4 className="drop-title" >Territoires ajoutés : </h4>
                        <RiArrowDropDownLine 
                        onClick={()=>setModal({open:false})}
                         size="30px"
                        className='drop-btn close' />
    
                    </div>
                    <div className="column" >
                    {territories.map((t,i)=>{
                        return <span 
                        key={i}
                        className="selected col-items">
                            {namingLocation(t)}
                            <TiDelete className="delete-territory" 
                            onClick = {e => removerTerritoryFromAnalysis(e,t)}
                            />
                        </span>
                    })}
                    </div>
    
                </div>}

        </div>
    )
}

export default SearchBar
