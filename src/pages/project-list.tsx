import { useState, useEffect } from 'react';
import Search from 'components/search';
import CustomTable from 'components/table'
import { clearObject, useMount, useDebounce } from 'utils'
import { Params } from 'components/search'
import './App.css';
import qs from 'qs'

const REACT_APP_URL = process.env.REACT_APP_URL


function ProjectList() {
    const [params, setParams] = useState({
        name: '',
        personId: ''
    });

    const [users, setUsers] = useState([]);

    const [list, setList] = useState([]);

    const debounceParams = useDebounce<Params>(params, 200)

    useEffect(
        ()=>{
            fetch(`${REACT_APP_URL}/projects?${qs.stringify(clearObject(debounceParams))}`)
                .then(async (res)=>{
                    if(res.ok){
                        setList(await res.json())
                    }
                })
        },
        [debounceParams]
    )


    useMount(()=>{
        fetch(`${REACT_APP_URL}/users`)
            .then(async (res)=>{
                console.log('res=', res)
                if(res.ok){
                    setUsers(await res.json())
                }
            })
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
