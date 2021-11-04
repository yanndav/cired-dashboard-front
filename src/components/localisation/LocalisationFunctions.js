// Function to retrieve the locations on the back-end
const  recommendation = async (query,API_URL,setListTerritories) =>{
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

// Function to launch the fetch action when press enter on the search bar
const handleSearch = (e,query,API_URL,setListTerritories) =>{
    e.preventDefault();
    recommendation(query,API_URL,setListTerritories)

}

// Function to add a territory to the analysis
const addTerritoryToAnalysis = (e,t,setTerritories,setListTerritories,setQuery,territories,listTerritories) => {
    e.preventDefault();
    setTerritories(territories => [...territories,t])
    setListTerritories(listTerritories.filter(ter=>ter!==t))  
    setQuery("")
    
}

// Function to remove a territory from the analysis
const removerTerritoryFromAnalysis = (e,t,setTerritories,territories) =>{
    e.preventDefault();

    setTerritories(territories.filter(ter=>ter!==t))

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