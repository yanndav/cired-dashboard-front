// -----------------------------------------------------------------------
// -- SQUELETTE DE L'APPLICATION
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------------
// Styling
import "./App.css";

// Context
import ContextProvider from "./ContextProvider";
import ScrollToTop from "./ScrollToTop";
// Components
import Footer from "./footer/Footer";
import Accueil from "../accueil/Accueil";
import Mentions from "./mentions/Mentions";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// COMPOSANT ------------------------
const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ContextProvider>
        <ScrollToTop />
        <Switch>
          <div className="app-container">
            <div className="content-app">
              <Route path="/" exact>
                <Accueil />
              </Route>
              <Route path="/mentions-legales" exact>
                <Mentions />
              </Route>
            </div>
            <Footer />
          </div>
        </Switch>
      </ContextProvider>
    </Router>
  );
};

export default App;
