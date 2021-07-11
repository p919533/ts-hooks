import React, { useState, useEffect } from 'react';
import Search from 'components/search';
import CustomTable from 'components/table'
import { clearObject, useMount, useDebounce } from 'utils'
import { Params } from 'components/search'
import { useHttp } from 'utils/http'
import qs from 'qs'



function ProjectList() {
    const [params, setParams] = useState({
        name: '',
        personId: ''
    });

    const [users, setUsers] = useState([]);

    const [list, setList] = useState([]);

    const debounceParams = useDebounce<Params>(params, 200)

    const client = useHttp()

    useEffect(
        () => {
            client('projects', {
                data: clearObject(debounceParams)
            })
                .then(setList)
        },
        [debounceParams]
    )


    useMount(() => {
        client('users').then(setUsers)
    })

    return (
        <div className="App">
            <Search
                params={params}
                setParams={setParams}
                users={users}
            />
            <CustomTable
                users={users}
                list={list}
            />
        </div>
    );
}

export default ProjectList;
