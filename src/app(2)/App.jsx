// -----------------------------------------------------------------------
// -- SQUELETTE DE L'APPLICATION
// -- Décembre 2021
// -----------------------------------------------------------------------

// IMPORTATIONS ------------------------
// Styling
import "./App.css";

// Context
import ContextProvider from "./ContextProvider";

// Components
import Footer from "./components/footer/Footer";
import Accueil from "../accueil/Accueil";
import ScrollToTop from "./ScrollToTop";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// COMPOSANT ------------------------
const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ContextProvider>
        <Switch>
          <div className="app-container">
            <div className="content-app">
              <ScrollToTop>
                <Route path="/" exact>
                  <Accueil />
                </Route>
              </ScrollToTop>
            </div>
            <Footer />
          </div>
        </Switch>
      </ContextProvider>
    </Router>
  );
};

export default App;
