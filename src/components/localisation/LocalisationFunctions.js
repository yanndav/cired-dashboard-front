import "leaflet/dist/leaflet.css"
import L from 'leaflet';


// Function to retrieve the locations on the back-end
const  recommendation = async (query,API_URL,setSuggestions) =>{
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
   
    setSuggestions(data)   
}

// Function to launch the fetch action when press enter on the search bar
const handleSearch = (e,query,API_URL,setSuggestions) =>{
    e.preventDefault();
    recommendation(query,API_URL,setSuggestions)

}

// Function to correct lgtltd reversion
const revertLtLg = (coordinates) =>  coordinates.map( c => [c[1],c[0]])

// Function to add shape to geography
const  addShape = async (t,year,API_URL,setGeographies,map) =>{
    const response = await fetch(`${API_URL}/getLocationShape`, {
        body: JSON.stringify({
            "location_id":t._id.$oid,
            "year":year,
    }),
        method: "POST",
        headers: {
            // Authorization: bearer,
            Accept: "application/json",
            "Content-Type": "application/json",
          },

      });
      const data = await response.json()
      
      data[0].geometry.coordinates = revertLtLg(data[0].geometry.coordinates)
      let polygon = L.polyline(data[0].geometry.coordinates, {
        weight:1,
        color: '#0AAACB',
        fill:true,
        fillColor:"#0aabcb70",
        smoothFactor:2
    }
    ).addTo(map)

    data[0].id = polygon._leaflet_id
      setGeographies(prev=>[...prev,data[0]]) 


}
// Function to add a territory to the analysis
const addTerritoryToAnalysis = (e,t,territories,setTerritories,setSuggestions,setQuery,suggestions,year=2021,API_URL,setGeographies,map) => {
    e.preventDefault();
    if(!territories.some(ter => ter._id.$oid === t._id.$oid)){
        setTerritories(territories => [...territories,t])
        setSuggestions(suggestions.filter(ter=>ter!==t))  
        setQuery("")
        addShape(t,year,API_URL,setGeographies,map)
    }else{
        alert("Already added")
        setQuery("")
    }
}

// Function to remove a territory from the analysis
const removerTerritoryFromAnalysis = (e,t,setTerritories,territories,geographies,setGeographies,map) =>{
    e.preventDefault();
    let id = t._id.$oid
    let id_leaf = geographies.filter(t=>t.properties._id.$oid===id)[0].id
    console.log(id_leaf)
    setTerritories(territories.filter(ter=>ter!==t))
    setGeographies(!geographies.filter(t=>t.properties._id.$oid===id))
    map.removeLayer(id_leaf)


}

// Function setting the naming of locations
const namingLocation = (t,shorten=false,territories) =>{
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


// Function to open drop down of locations added
const openInfo = (e,SEARCH_BAR_REF,setModal) =>{
    setModal({
        clientX:SEARCH_BAR_REF.current.offsetLeft,
        clientY:SEARCH_BAR_REF.current.offsetTop,
        open:true,
    })
}


// Modal styling (=> the dropdown of locations)
const styleModal = (modal,SEARCH_BAR_REF) =>{
    const width = SEARCH_BAR_REF.current.offsetWidth*0.25
    return {
        width:width,
        top:modal.clientY,
        left:modal.clientX,
        borderRadius:7
    }
}

export {recommendation, handleSearch, addTerritoryToAnalysis, namingLocation, removerTerritoryFromAnalysis,openInfo,styleModal}