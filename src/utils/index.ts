import { useEffect, useState } from "react"

const isFalsy = (value: unknown) => value === 0 ? false : !value

export const clearObject = (object: object) => {
    const result = { ...object }
    Object.keys(object).map(key => {
        // @ts-ignores
        const value = object[key]
        if (isFalsy(value)) {
            // @ts-ignores
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

export const useDebounce = <D>(value: D, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        // 每次在上一个useEffect处理完以后在运行
        return () => {
            return clearTimeout(timeout)
        }
    }, [value])

    return debounceValue
}


export const useArray = <T> (persons: T[]) => {
    const [value, setValue] = useState(persons)

    function clear(){
        setValue([])
    }

    function removeIndex(index: number){
        const list = [...value]
        list.splice(index, 1)
        setValue(list)
    }

    function add(obj: T){
        setValue([...value, obj])
    }

    return {value, clear, removeIndex, add}


    
}
