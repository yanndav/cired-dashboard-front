// Function to load location legend
const legendLocation = (territories) =>{
    return territories.map((l,i) =>{
        if(territories.length === 1){
            return  <span className="info-focus">{l}</span>
        }else{
            return (i!==(territories.length-1) )?(
                <span className="info-focus">{l}, </span>
           ):(
           <> et <span className="info-focus">{l}</span> </>
           )
        }
        
    })
};

// Function to load time legend
const legendTime = (time) =>{
    const minYear = Math.min.apply(Math, time)
    const maxYear = Math.max.apply(Math,time) 
    return <>Entre {minYear} et {maxYear}</>
};

export {legendTime,legendLocation};
