import { Input, Select } from 'antd';
import React from 'react'

export interface User {
    id: string,
    name: string,
    email: string;
    title: string;
    organization: string;
    token: string;
  
}

export type Params = {
    name: string,
    personId: string
}
interface SearchProps {
    params: Params,

    setParams: (params: SearchProps['params']) => void,
    // 
    users: User[]
}
export default function Search({ params, setParams, users }: SearchProps) {
    return (
        <>
            <Input
                value={params.name}
                onChange={(ev) => {
                    setParams({
                        ...params,
                        name: ev.target.value
                    });
                }}
            />

            <Select
                value={params.personId}
                onChange={(personId) => {
                    setParams({
                        ...params,
                        personId
                    });
                }}
            >
                <Select.Option value='' >负责人</Select.Option>;
                {users.map((item) => {
                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>;
                })}
            </Select>
        </>
    );
}
