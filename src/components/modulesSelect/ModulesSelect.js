import './ModulesSelect.css'
import { useState, useEffect } from 'react'
import Modules from './Modules'


const getModules = async(API_URL) =>{
    const response = await fetch(`${API_URL}/getModules`, {
      // body: JSON.stringify({"lat":bounds.lat,"lng":bounds.lng,"zoom":zoom}),
      method: "POST",
      headers: {
          // Authorization: bearer,
          Accept: "application/json",
          "Content-Type": "application/json",
      },
  
  });
  
  const data = await response.json()
  return data
  }

  


const ModulesSelect = ({API_URL}) => {
    const [showModules,setShowModules] =useState(false)

    const [modules, setModules] = useState([])

    useEffect(async () => {
        const modules_data = await getModules(API_URL)
        setModules(modules_data)
    }, [showModules])



    return (
        <>
        {!showModules?(
        <div onClick={()=>setShowModules(prev=>!prev)} className="module-bouton">
           <div className="icon-module">🎛️</div> 
           <div className="legend-module-bouton">Ajouter un module</div>
        </div>

        ):(
            <Modules modules={modules} setShowModules={setShowModules}/>
        )}
        </>
    )
}

export default ModulesSelect
