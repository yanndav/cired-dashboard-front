import "./LocalisationMap.css"
import { MapContainer, TileLayer, Polygon, MapConsumer } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import L from 'leaflet';

import { useEffect, useState, useCallback} from "react"    
    
    
    const LocalisationMap = ({geographies,setMap}) => {
        const [center,setCenter] = useState([ 44.98783390046939,4.970584899999999])
        const [zoom,setZoom] = useState(4.5)
        
    // const onNewGeo = useCallback(() => {
    //   map.setView(center, zoom)
    // }, [map,center,zoom])
  
    // useEffect(() => {
    //     territories.map(t =>{
    //         // Ids of territories projected
    //         let ids = geographies.map((g) => g.properties._id.$oid)

    //         // If the territory is not yet projected
    //         if(!ids.includes(t._id.$oid)){
    //             // Add if to the geography state
    //             addShape(t,2021,API_URL,setGeographies,setCenter)
    //         }
            
           
    //     })

    // }, [territories])
  
 


    return (
        <>
        {/* {map ? <DisplayPosition map={map} /> : null} */}
        <div className="map-wrapper">
        <MapContainer
          id="map"
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            whenCreated={setMap}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
           
                {/* <MapConsumer>
               {(map) => {         
                    //   {geographies.map(g=>{
                    //     let polygon = L.polyline(g.geometry.coordinates, {
                    //         weight:1,
                    //         color: '#0AAACB',
                    //         fill:true,
                    //         fillColor:"#0aabcb70",
                    //         smoothFactor:2
                    //     }
                    //     ).addTo(map)
                    // })}
                    return null
                    }} 

            </MapConsumer> */}
          </MapContainer>
        </div>
        </>
    )
}

export default LocalisationMap

