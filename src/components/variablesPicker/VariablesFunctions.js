const  getVariables = async (territories,API_URL,setCandidateVariables) =>{
    const response = await fetch(`${API_URL}/getAvailableVariables`, {
        body: JSON.stringify({"locations":territories.map(t=> t.CODGEO[0])}),
        method: "POST",
        headers: {
            // Authorization: bearer,
            Accept: "application/json",
            "Content-Type": "application/json",
          },

      });
      const data = await response.json()
   
    setCandidateVariables(data)   
}


const changeStatusVariable = (vari,selectedVariables,setSelectedVariables) =>{
    const varnames = selectedVariables.map(doc => doc.LIB)
    if(varnames.includes(vari.LIB)){
        setSelectedVariables(selectedVariables.filter((sel) => sel.LIB !== vari.LIB))
    }else{
        setSelectedVariables([...selectedVariables,vari])
    }
}

const checkSelected = (vari,selectedVariables,) =>{
    const varnames = selectedVariables.map(doc => doc.LIB)
    return varnames.includes(vari.LIB)
}

export { getVariables,changeStatusVariable,checkSelected }