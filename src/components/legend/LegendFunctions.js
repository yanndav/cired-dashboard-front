// Function to load location legend
const legendLocation = (territories) =>{
    return territories.map((l,i) =>{
        if(territories.length === 1){
            return l.LIBGEO[0]
        }else{
            return (i!==(territories.length-1) )?(
                l.LIBGEO[0] 
           ):(
           'et ' + l.LIBGEO[0]
           )
        }
        
    }).join(", ")
};

const getTimes = (vari) => vari.map(v => v.ANNEE)
     
// Function to load time legend
const legendTime = (time) =>{
    const minYear = Math.min.apply(Math, time)
    const maxYear = Math.max.apply(Math,time) 
    return minYear+' et '+maxYear
};



const evolValue = (v) =>{
    const minYearI = v.year.indexOf(Math.min.apply(Math,v.year))
    const maxYearI = v.year.indexOf(Math.max.apply(Math,v.year))
    
    const startV = v.value[minYearI]
    const endV = v.value[maxYearI]
    
    const direction = (endV-startV < 0)?("diminué "):("augmenté ")
    
    if(v.unit==="%"){
        return <>{' ' + direction} de {endV-startV} points de pourcentage, en passant de {startV}% à {endV}%.</>
    }
};


export {legendTime,legendLocation,evolValue,getTimes};