import "./LocalisationMap.css"
import { MapContainer, TileLayer, LayerGroup, MapConsumer,useMapEvents } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import L from 'leaflet';


import { useEffect, useState} from "react"   

import { creaElements,majElements,getRecommendations, removeRecommendations } from "../LocalisationFunctions";

const LocalisationMap = ({geographies,setMap,setLayer,map,API_URL,layer}) => {
    const center = [46.8,1.7]
    const zoom = 4.5
    const [nbTerritoires, setNbTerritoires] = useState(0)
    const [bounds, setBounds] = useState()
    const [territoriesAround, setTerritoriesAround] = useState([])


    useEffect(() => {
      creaElements(geographies,map)
      
      if(map && geographies.length===1){
        map.setView(geographies[geographies.length-1].latLng,9)
      }
    }, [geographies])
    
    // useEffect(() => {
    //   if(map){
    //     //  Creation svg layer for text/incrustations
    //     L.svg({'pane':'markerPane'}).addTo(map)

    //   }
    // }, [map])
    const Events = () => {
      const map = useMapEvents({
        zoomstart:(e)=>{
          removeRecommendations(map)
        },
        moveend: (e) => {
          majElements(map)
          if(geographies.length>=1){
            getRecommendations(
              API_URL,
              setTerritoriesAround,
              geographies,
              map,
              layer,
              territoriesAround)

          }


        }
      });
      return null;
    }

    return (
        <>
        <div className="map-wrapper">
        <MapContainer
          id="map"
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            whenCreated={setMap}
            >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | &copy; CIRED-ENPC'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Events/>
              <LayerGroup
              ref={setLayer}
              >

              </LayerGroup>
              
                {/* <MapConsumer>
               {(map) => {         
            
                
                
                return null
                    }} 

            </MapConsumer> */}
          </MapContainer>
        </div>
        </>
    )
}

export default LocalisationMap

