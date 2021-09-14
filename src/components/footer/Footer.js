import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer-container">
            <a className="footer-logo" href="https://www.centre-cired.fr/" target="_blank" rel="noreferrer">
                <img  src="logo-cired.jpeg" alt="CIRED" width="3.3%"/> 
            </a> 
            <a className="footer-logo" href="https://www.ecoledesponts.fr/" target="_blank" rel="noreferrer">
                <img className="footer-logo" src="logo-enpc.png" alt="ENPC" width="2.5%"/>
            </a> 

            <p>
                Transitions Viewer - Version Alpha 1 - Coevolution - CIRED-ENPC 2021
            </p>

        </div>
    )
}

export default Footer
