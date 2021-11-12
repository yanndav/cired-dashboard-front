import "leaflet/dist/leaflet.css"
import L, { popup } from 'leaflet';
import * as d3 from "d3"

import './components/LocalisationMap.css'

// Function to retrieve the locations on the back-end
const  recommendation = async (query,API_URL,setSuggestions) =>{
    const response = await fetch(`${API_URL}/getLocation`, {
        body: JSON.stringify({"location":query}),
        method: "POST",
        headers: {
            // Authorization: bearer,
            Accept: "application/json",
            "Content-Type": "application/json",
          },

      });
      const data = await response.json()
   
    setSuggestions(data)   
}

// Function to launch the fetch action when press enter on the search bar
const handleSearch = (e,query,API_URL,setSuggestions) =>{
    e.preventDefault();
    recommendation(query,API_URL,setSuggestions)

}



const zoomInit = (map) =>{
    if(map){
      return map.getZoom()
  
    }else{
      return 4.5
    }
  }



  const creaElements = (geographies,map) =>{
    const svg = d3.select('#map').select('svg')
    let zoomMove = zoomInit(map)
  
    const c = svg.select('g').attr('id','city').selectAll('text')
    c.remove()
  
    c
    .data(geographies.filter(d=>d.showLegend===true))
    .enter()
    .append('text')
    .attr("id", s => s.id)
    .attr("text-anchor", "middle")
    .attr("font","inherit")
    .attr("font-size", zoomFunction(map))
    .text(d=>d.properties.LIBGEO[0])
    .attr(
      'transform',
      d =>
          'translate(' +
          map.latLngToLayerPoint(d.latLng).x +
          ',' +
          map.latLngToLayerPoint(d.latLng).y +
          ')'
  )
  }
  
  const zoomFunction = (map) =>{
    let zoomMove = zoomInit(map)
    if(zoomMove<9){
      return '0em'
    }else if(zoomMove===9){
      return '0.7em'
    } else if(zoomMove===10){
      return '1.4em'
    }else if(zoomMove===11){
      return '2em'
    }
  }


  const majElements = (map)=>{
    let zoomMove = zoomInit(map)
  
    const g = d3
    .select('#map')
    .select('svg')
    .select('#city')
    .selectAll('text')
  
    g
    .attr("font-size", zoomFunction(map))
    .attr(
      'transform',
      d =>
          'translate(' +
          map.latLngToLayerPoint(d.latLng).x +
          ',' +
          map.latLngToLayerPoint(d.latLng).y +
          ')'
  )

  }
  
  const removeRecommendations = (map) =>{
    const t = d3.select(map.getPanes().overlayPane)
    .select('svg')
    .select("#candidates")
    .remove()

  }
  
  const getRecommendations = async (API_URL,setTerritoriesAround,geographies,map) =>{
    const bounds = map.getBounds().getCenter()
    const zoom = zoomInit(map)

    
    if(zoom>=9){
        const response = await fetch(`${API_URL}/getTerritoriesAround`, {
            body: JSON.stringify({"lat":bounds.lat,"lng":bounds.lng,"zoom":zoom}),
            method: "POST",
            headers: {
                // Authorization: bearer,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
    
    });
    
        const data = await response.json()
        const ids = geographies.map(d=>d.properties._id.$oid)
        let data_clean = data.filter(d=>!d.properties._id.$oid.includes(ids))
        data_clean = data_clean.map((d)=> {
            d.geometry.coordinates = [revertLtLg(d.geometry.coordinates)]
            return d}
        )
    
          
    
    const overlay = d3.select(map.getPanes().overlayPane)
    const svg = overlay.select('svg').attr("pointer-events", "auto")
    svg
    .select("#candidates").selectAll('path')
    .remove()

    
    
    const g = svg
    .append("g")
    .attr('id',"candidates")
    .attr('class', 'leaflet-zoom-hide')
    
    
         
      // Use Leaflets projection API for drawing svg path (creates a stream of projected points)
      const projectPoint = function(x,y) {
        const point = map.latLngToLayerPoint(new L.LatLng(x,y))
        this.stream.point(point.x, point.y)
      }
      
      
      // Use d3's custom geo transform method to implement the above
      const projection = d3.geoTransform({point: projectPoint})
      // creates geopath from projected points (SVG)
      const pathCreator = d3.geoPath().projection(projection)
      
      const areaPaths = g.selectAll('path')
        .data(data_clean)
        .enter()
        .append('path')
        .attr("id", d=>d.properties.LIBGEO)
        .attr('fill-opacity', 0)
        .attr('stroke', 'grey')
        .attr('class',`leaflet-interactive ${zoom} normal`)
        .on("mouseover", (d)=> {
            d3.select(d.target).attr("class",`leaflet-interactive ${zoom} mouseOver`)})
        .on("mouseout", (d)=>d3.select(d.target).attr("class",`leaflet-interactive ${zoom} normal`))
       
      // Function to place svg based on zoom
      const onZoom = () => areaPaths.attr('d', pathCreator)
      // initialize positioning
      onZoom()
        }
 
 }


//   const getRecommendations = async (API_URL,setTerritoriesAround,geographies,map,layer,territoriesAround) =>{
//       const bounds = map.getBounds().getCenter()
//       const zoom = zoomInit(map)
//       removeRecommendations(map,territoriesAround)
//       if(zoom >=9){
//           const response = await fetch(`${API_URL}/getTerritoriesAround`, {
//               body: JSON.stringify({"lat":bounds.lat,"lng":bounds.lng,"zoom":zoom}),
//               method: "POST",
//               headers: {
//                   // Authorization: bearer,
//                   Accept: "application/json",
//                   "Content-Type": "application/json",
//               },
      
//           });

//         const data = await response.json()
//         const ids = geographies.map(d=>d.properties._id.$oid)
//         let data_clean = data.filter(d=>!d.properties._id.$oid.includes(ids))
//         data_clean = data_clean.map(d=>{
//             d.geometry.coordinates = revertLtLg(d.geometry.coordinates)
//           let polygon = L.polyline(d.geometry.coordinates, {
//               weight:0.5,
//               color: '#9c9c9c',
//               fill:false,
//               fillOpacity:0.5,
//               smoothFactor:2
//           }
//           ).addTo(layer)

//           d.id = polygon._leaflet_id
//           d.latLng = polygon.getBounds().getCenter()
//           d.showLegend=false
          
//            polygon.on(
//                {
//                    'mouseover': ()=>{
//                       setTerritoriesAround(
//                            prev=>[...prev.filter(g=>g.id!==d.id),
//                            {...d,showLegend:true}])
//                       polygon.setStyle({fill:true,fillColor:"#51acbe"})
//                            },
//                     'mouseout':()=>{
//                       setTerritoriesAround(
//                           prev=>[...prev.filter(g=>g.id!==d.id),
//                           {...d,showLegend:false}])
//                           polygon.setStyle({fill:false})
      
//                           },
//                       })
  
//           return d
//         })
  
//         setTerritoriesAround(data_clean) 

//       }else{

//       }

//   }

// Function to correct lgtltd reversion
const revertLtLg = (coordinates) =>  coordinates.map( c => [parseFloat(c[1]),parseFloat(c[0])])

// Function to add shape to geography
const  addShape = async (t,year,API_URL,setGeographies,map) =>{
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
      
      data[0].geometry.coordinates = revertLtLg(data[0].geometry.coordinates)
      let polygon = L.polyline(data[0].geometry.coordinates, {
        weight:1,
        color: '#0AAACB',
        fill:true,
        fillColor:"#00d5ff",
        fillOpacity:0.5,
        smoothFactor:2
    }
    ).addTo(map)

    data[0].id = polygon._leaflet_id
    data[0].latLng = polygon.getBounds().getCenter()
    data[0].showLegend=false
    setGeographies(prev=>[...prev,data[0]])


    
     polygon.on(
         {
             'mouseover': ()=>{
                 setGeographies(
                     prev=>[...prev.filter(g=>g.id!==data[0].id),
                     {...data[0],showLegend:true}])
                polygon.setStyle({fillColor:"#51acbe"})
                     },
              'mouseout':()=>{
                setGeographies(
                    prev=>[...prev.filter(g=>g.id!==data[0].id),
                    {...data[0],showLegend:false}])
                    polygon.setStyle({fillColor:"#00d5ff"})

                    },
        
})

}
// Function to add a territory to the analysis
const addTerritoryToAnalysis = (e,t,territories,setTerritories,setSuggestions,setQuery,suggestions,year=2021,API_URL,setGeographies,map) => {
    e.preventDefault();
    if(!territories.some(ter => ter._id.$oid === t._id.$oid)){
        setTerritories(territories => [...territories,t])
        setSuggestions(suggestions.filter(ter=>ter!==t))  
        setQuery("")
        addShape(t,year,API_URL,setGeographies,map)
    }else{
        alert("Already added")
        setQuery("")
    }
}

// Function to remove a territory from the analysis
const removerTerritoryFromAnalysis = (e,t,setTerritories,territories,geographies,setGeographies,map) =>{
    e.preventDefault();
    let id = t._id.$oid
    let id_leaf = geographies.filter(t=>t.properties._id.$oid===id)[0].id

    setTerritories(territories.filter(ter=>ter!==t))
    setGeographies(geographies.filter(t=>t.properties._id.$oid !==id))
    map.removeLayer(id_leaf)


}

// Function setting the naming of locations
const namingLocation = (t,shorten=false,territories) =>{
    if(t.LIBGEO[0].length > 10 & shorten===true){
        if(territories.length >1){
            return t.LIBGEO[0].substring(0,6)+'... ('+t.CODGEO[0].substring(0,2)+')'
        }else{
            return t.LIBGEO[0].substring(0,10)+'... ('+t.CODGEO[0].substring(0,2)+')'
        }
    }else{
       return t.LIBGEO[0]+' ('+t.CODGEO[0].substring(0,2)+')'
    }
}


// Function to open drop down of locations added
const openInfo = (e,SEARCH_BAR_REF,setModal) =>{
    setModal({
        clientX:SEARCH_BAR_REF.current.offsetLeft,
        clientY:SEARCH_BAR_REF.current.offsetTop,
        open:true,
    })
}


// Modal styling (=> the dropdown of locations)
const styleModal = (modal,SEARCH_BAR_REF) =>{
    const width = SEARCH_BAR_REF.current.offsetWidth*0.25
    return {
        width:width,
        top:modal.clientY,
        left:modal.clientX,
        borderRadius:7
    }
}

export {
    recommendation,
     handleSearch,
      addTerritoryToAnalysis,
       namingLocation,
        removerTerritoryFromAnalysis,
        openInfo,styleModal,addShape,
        zoomFunction,
    zoomInit,
creaElements,
majElements,
getRecommendations,
removeRecommendations}