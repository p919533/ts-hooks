const isValue = (value)=>value == 0 ? false : !!value

export const clearParams = (params)=>{
    const data = {...params}
    const newParams = {}
    Object.keys(data).map(key=>{
        if(isValue(data[key])){
            newParams[key] = data[key]
        }
    })
    return newParams
}
