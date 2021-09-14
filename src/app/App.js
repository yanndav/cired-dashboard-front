// Styling
import './App.css';

// Components
import Footer from '../components/footer/Footer';
import APropos from '../aPropos/APropos';
import Header from '../components/header/Header';
import Connection from '../connection/Connection';
import Dashboard from '../dashboard/Dashboard'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Modules

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <div className="app-container">
        <div className="content-app">
          <Header/>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/a-propos" exact>
            <APropos />
          </Route>
          <Route path="/connexion" exact>
            <Connection />
          </Route>

        </div>
        <Footer />
      </div>
      </Switch>  
    </Router>
  );
}

export default App;
