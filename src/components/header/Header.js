// Styling
import './Header.css'

// Modules
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation().pathname;
    
    return (
        <div className="header-container">
            <div className="titre">
                
                <NavLink to="/" className="link-nom">
                    <h1 className="nom-site">
                    <img className="logo-nom" src="logo-site-HD.png" alt="Transitions" width="35em"/>
                        Transitions Viewer
                    </h1>
                </NavLink>
                {!location.includes('/tableau')&&
                <h2 className="slogan-site">Un outil pour mesurer les transitions sur votre territoire</h2>
                }
            </div>
            <nav>
            <ul className="navig-container">
                <NavLink to="/#apropos" exact className="navig-pages" activeClassName="link-current">
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
