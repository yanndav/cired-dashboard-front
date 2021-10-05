// Styling
import './Dashboard.css'

// React components
import { useState, useEffect } from 'react';

// Components
import GraphHolder from '../components/graphHolder/GraphHolder';
import SearchBar from '../components/searchBar/SearchBar';
import Legend from '../components/legend/Legend';
import VariablesPicker from '../components/variablesPicker/VariablesPicker';

// Modules

const updateData = async (API_URL, territories, selectedVariables,setData) =>{
  const response = await fetch(`${API_URL}/getData`, {
    body: JSON.stringify({"locations":territories.map(t=> t.CODGEO[0]),
  "variables":selectedVariables.map(vari=>{return {"base":vari.BASE,"variable":vari.VARIABLE}})}),
    method: "POST",
    headers: {
        // Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

  });
  const res = await response.json()
  setData(res)
  console.log(res)
}

const Dashboard = ({API_URL}) => {
  const [dashboard, setDashboard] = useState(false)
  const [territories, setTerritories] = useState([])
  const [selectedVariables, setSelectedVariables] = useState([])
  const [data, setData] = useState([])

  useEffect(()=>{
    updateData(API_URL,territories,selectedVariables,setData)

  },[selectedVariables,territories,API_URL])


  return (
    <>
      <SearchBar 
      API_URL={API_URL}
      setDashboard={setDashboard} 
      territories = {territories}
      setTerritories={setTerritories}
      />
      {dashboard? (
        <>
        <VariablesPicker
        territories={territories}
        API_URL={API_URL}
        selectedVariables ={selectedVariables}
        setSelectedVariables={setSelectedVariables}
        />
        <Legend 
        territories={territories}
        data={data}
        />
        <GraphHolder 
        data={data}
        />
        </>
        ):(
          <p>Ici il serait bien d'ajouter quelques infos sur le fonctionnement de l'outil quand l'utilisateur arrive</p>
          )}
    </>
  );
}

export default Dashboard;
