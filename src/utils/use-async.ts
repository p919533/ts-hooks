import { useState } from "react";

interface State<D> {
    error: Error | null,
    data: D | null,
    stat: 'idle'| "loading" | "error" | "success"
}

const defaultInitialState:State<null>  = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig };
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    const setData = (data:D) => {
        setState({
            error: null,
            data,
            stat: "success"
        })
    }

    const setError = (error: Error) => {
        setState({
            error,
            data: null,
            stat: "error"
        })
    }

    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            return new Error("请传入 Promise 类型数据");
        }
        setState({ ...state, stat: 'loading' })
        
        return promise
            .then(data => {
                setData(data)
                return data
            })
            .catch((err) => {
                setError(err)
                if (config.throwOnError) {
                    return Promise.reject(err)
                }
                return err
            })
    }

    return {
        isIdle: state.stat === "idle",
        isLoading: state.stat === "loading",
        isError: state.stat === "error",
        isSuccess: state.stat === "success",
        run,
        setData,
        setError,
        ...state,
    }
    
}