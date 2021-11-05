import "./LocalisationMap.css"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import * as d3 from "d3";

import { useEffect, useState } from "react"

// import { geoPath } from "d3-geo"
// import { feature } from 'topojson-client'
// import { Feature, FeatureCollection, Geometry } from 'geojson'

const  addShape = async (t,year,API_URL,setGeographies) =>{
    const response = await fetch(`${API_URL}/getLocationShape`, {
        body: JSON.stringify({
            "location_id":t._id.$oid,
            "year":year,
    }),
        method: "POST",
        headers: {
            // Authorization: bearer,
            Accept: "application/json",
            "Content-Type": "application/json",
          },

      });
      const data = await response.json()
   
      setGeographies(geographies=>[...geographies,data[0]])

}




const LocalisationMap = ({territories,API_URL}) => {
    // Initialisation de l'objet leaflet
    let L = null

    // Creation de l'object de cart
    const [mapOut,setMapOut] = useState()

    const parisCenter = [46.862725, 1.7]
    const initialZoom = 4.5
    
    const [geographies, setGeographies] = useState([])
    // const [projection, setProjection] = useState()
    // const [mapOut, setMapOut] = useState()
    
    // Ajout de la carte à l'ouverture de la page
    // useEffect(() => {
    //     let L = require("leaflet")
    //     const map = L.map('map').setView(parisCenter, initialZoom)

    //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         maxZoom: 10,
    //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     }).addTo(map)
        
    //     L.svg().addTo(map)

    //     setMapOut(map)
        
    //     return () => {
    //         map.remove()
    //     }
    // }, [])
    
    

    // Ajout des shapes des villes à la carte
    // useEffect(() => {
    //     territories.map(t =>{
    //         // console.log(t._id.$oid)
    //         let ids = geographies.map((g) => g.properties._id.$oid)
    //         // console.log(ids)
    //         if(!ids.includes(t._id.$oid)){
    //             addShape(t,2021,API_URL,setGeographies)
    //             // console.log('added')
    //         }
            
         
    //     })

    // }, [territories])

    return (
        <div className="map-wrapper">
         <MapContainer id="map" center={parisCenter} zoom={initialZoom}>
         <Marker position={parisCenter}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
         <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         </MapContainer>
        </div>
    )
}

export default LocalisationMap

