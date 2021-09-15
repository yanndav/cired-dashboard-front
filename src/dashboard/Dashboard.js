// Styling
import './Dashboard.css'

// React components
import { useState } from 'react';

// Components
import GraphHolder from '../components/graphHolder/GraphHolder';
import SearchBar from '../components/searchBar/SearchBar';
import Legend from '../components/legend/Legend';
// Modules

function Dashboard() {
  const [dashboard, setDashboard] = useState(false)
  const [territories, setTerritories] = useState([])

  return (
    <>
      <SearchBar 
      setDashboard={setDashboard} 
      territories = {territories}
      setTerritories={setTerritories}/>
      {dashboard? (
        <>
        <Legend />
        <GraphHolder />
        </>
        ):(
          <p></p>
          )}
    </>
  );
}

export default Dashboard;
