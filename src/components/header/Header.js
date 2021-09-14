// Styling
import './Header.css'

// Modules
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header-container">
            <div className="titre">
                
                <NavLink to="/" className="link-nom">
                    <h1 className="nom-site">
                    <img className="logo-nom" src="logo-site-HD.png" width="35em"/>
                        Transitions Viewer
                    </h1>
                </NavLink>
                <h2 className="slogan-site">Un outil pour mesurer les transitions sur votre territoire</h2>
            </div>
            <nav>
            <ul className="navig-container">
                <NavLink to="/a-propos" exact className="navig-pages" activeClassName="link-current">
                À propos
                </NavLink>
                <NavLink to="/connexion" exact className="navig-pages" activeClassName="link-current">
                   Connexion
                </NavLink>
            </ul>
            </nav>
          
        </div>
    )
}

export default Header
