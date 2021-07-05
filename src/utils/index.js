import { useEffect, useState } from "react"

const isFalsy = (value) => value === 0 ? false : !value

export const clearObject = (object) => {
    const result = { ...object }
    Object.keys(object).map(key => {
        const value = object[key]
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback) => {
    useEffect(() => {
        callback()
    }, [])
}

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        // 每次在上一个useEffect处理完以后在运行
        return () => clearTimeout(timeout)
    }, value)

    return debounceValue
}
