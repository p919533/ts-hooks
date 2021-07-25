import { useAsync } from "./use-async";
import { User } from 'components/search'
import { useEffect } from "react";
import { useHttp } from "utils/http";
import { clearObject } from "utils/index"


export function useUsers(params?:Partial<User>) {
    const client = useHttp();
    const { run, ...result } = useAsync<User[]>()


    useEffect(() => {
        run(client("users"))
    }, [])
    
    return result
}

