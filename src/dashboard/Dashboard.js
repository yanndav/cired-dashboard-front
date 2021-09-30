// Styling
import './Dashboard.css'

// React components
import { useState } from 'react';

// Components
import GraphHolder from '../components/graphHolder/GraphHolder';
import SearchBar from '../components/searchBar/SearchBar';
import Legend from '../components/legend/Legend';
// Modules

function Dashboard({API_URL}) {
  const [dashboard, setDashboard] = useState(false)
  const [territories, setTerritories] = useState([])

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
        <Legend 
        territories={territories}
        />
        <GraphHolder />
        </>
        ):(
          <p>Ici il serait bien d'ajouter quelques infos sur le fonctionnement de l'outil quand l'utilisateur arrive</p>
          )}
    </>
  );
}

export default Dashboard;
