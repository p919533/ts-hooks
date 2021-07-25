import { useAsync } from "./use-async";
import { Project } from 'components/table'
import { useEffect } from "react";
import { useHttp } from "utils/http";
import { clearObject } from "utils/index"


export function useProjects(params?:Partial<Project>) {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>()


    useEffect(() => {
        run(client("projects", {
            data: clearObject(params ||{}),
        }))
    }, [params])
    
    return result
}

