import { min,max } from "d3-array"
const scaleDomain = (data,variable) =>{
    let mini = min(data, d => d[variable])
    let maxi = max(data, d => d[variable])

    return (maxi-mini)*0.05
}

export default scaleDomain