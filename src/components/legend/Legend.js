// Styling
import './Legend.css'

//

import { FaRegQuestionCircle } from 'react-icons/fa';

const Legend = () => {
    return (
        <div className="legend-container">
            <h3 className="legend-title">Vous étudiez <span className="info-focus">la Biovallée</span></h3>
            <p className="legend-content"> Entre 1990 et 2018, la part des <span className="info-variable">terres artificialisées <FaRegQuestionCircle className="question-variable"/></span> a <span className="info-focus">augmenté de 8%</span>. 
            Dans le même temps <span className="info-variable">la population <FaRegQuestionCircle className="question-variable"/></span> a <span className="info-focus">augmenté de 2%</span>.</p>
        </div>
    )
}

export default Legend
