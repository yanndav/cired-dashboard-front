import "leaflet/dist/leaflet.css"
import "./LocalisationMap.css"

import { useEffect } from "react"

const LocalisationMap = () => {
    const parisCenter = [46.862725, 1.7]
    const initialZoom = 4.5

    useEffect(() => {
        let L = require("leaflet")
        const map = L.map('map').setView(parisCenter, initialZoom)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 10,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        return () => {
            map.remove()
        }
    }, [])
    



    return (
        <div className="map-wrapper">
            <div id="map">test</div>
        </div>
    )
}

export default LocalisationMap

