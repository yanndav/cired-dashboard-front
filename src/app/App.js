// Styling
import './App.css';

// Components
import Footer from '../components/footer/Footer';
import Accueil from '../accueil/Accueil';
import APropos from '../aPropos/APropos';
import Dashboard from '../dashboard/Dashboard'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import UserBoard from '../userBoard/UserBoard';

// Modules
import { useState } from 'react';

// Constantes

const API_URL = "http://127.0.0.1:5000"

const user = {connected:false}
const App = () => {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <div className="app-container">
        <div className="content-app">
          <Route path="/" exact>
            <Accueil/>
          </Route>
          <Route path="/tableau" exact>
            <Dashboard 
            API_URL={API_URL} />
          </Route>
          <Route path="/a-propos" exact>
            <APropos />
          </Route>
          <Route path="/user-board" exact>
            <UserBoard user={user}/>
          </Route>

        </div>
        <Footer />
      </div>
      </Switch>  
    </Router>
  );
}

export default App;
