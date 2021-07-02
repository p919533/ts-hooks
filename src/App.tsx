import React, { useState } from 'react';
import Search from './components/search';
import CustomTable from './components/table'
import './App.css';
import { useEffect } from 'react';
import qs from 'qs'

const REACT_APP_URL = process.env.REACT_APP_URL

type Params = {
    name: string;
    personId: string;
};

console.log('REACT_APP_URL===', process.env)

function App() {
    const [params, setParams] = useState<Params>({
        name: '',
        personId: ''
    });

    const [users, setUsers] = useState([]);

    const [list, setList] = useState([])

    useEffect(
        ()=>{
            fetch(`${REACT_APP_URL}/projects`)
                .then(async (res)=>{
                    if(res.ok){
                        setList(await res.json())
                    }
                })
        },
        [params]
    )


    useEffect(
        ()=>{
            fetch(`${REACT_APP_URL}/users`)
            .then(async (res)=>{
                console.log('res=', res)
                if(res.ok){
                    setUsers(await res.json())
                }
            })
        },
        []
    )

    return (
        <div className="App">
            <Search
                params={params}
                setParams={setParams}
                users={users}
                setUsers={setUsers}
            />
            <CustomTable 
                users={users}
                list={list}
            />
        </div>
    );
}

export default App;
