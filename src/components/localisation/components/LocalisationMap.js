import "./LocalisationMap.css"
import { MapContainer, TileLayer, LayerGroup, SVGOverlay,useMapEvents } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import * as topojson from "topojson-client";


import { useEffect, useState} from "react"   

import { removeSelectionnes,updateShape,centroid,getVoisinnage, removeVoisinnage } from "../LocalisationFunctions";


const LocalisationMap = ({geographies,setMap,setLayer,map,API_URL,setTerritories,setGeographies,setRemove}) => {
    const [center,setCenter] = useState([46.8,1.7])
    const zoom = 4.5
    const [count,setCount] = useState(0)
    const [voisinnage, setVoisinnage] = useState([])
    
    useEffect(() => {
      map&&updateShape(geographies,map,setTerritories,API_URL,setGeographies)
      map&&setCenter(centroid(geographies))

      if(map && count !== geographies.length){
        removeVoisinnage(map)
        getVoisinnage(API_URL,geographies,map,voisinnage,setVoisinnage,"zoom",setTerritories,setGeographies,setRemove)
        setCount(geographies.length)
        geographies.length!=0 && map.panTo(centroid(geographies))
      }


      if(geographies.length===1 && count===0){
        map.setView(centroid(geographies),9)
        setCount(1)
      }
    }, [geographies])

    
    useEffect(() => {
      map&&L.svg().addTo(map)
      updateShape(geographies,map,setTerritories,API_URL,setGeographies)
      geographies.length>0&&map.setView(centroid(geographies),9)

    }, [map])



    const Events = () => {
      const map = useMapEvents({
        zoomstart:(e)=>{
          removeVoisinnage(map)
          removeSelectionnes(map)
        },
        dragend: (e) => {
          updateShape(geographies,map,setTerritories,API_URL,setGeographies)
          if(geographies.length>=1){
            getVoisinnage(
              API_URL,geographies,map,voisinnage,setVoisinnage,"drag",setTerritories,setGeographies,setRemove)

          }


        },
        zoomend: (e)=>{
          updateShape(geographies,map,setTerritories,API_URL,setGeographies)
          if(geographies.length>=1){
            getVoisinnage(API_URL,geographies,map,voisinnage,setVoisinnage,"zoom",setTerritories,setGeographies,setRemove)

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
          </MapContainer>
        </div>
        </>
    )
}

export default LocalisationMap

