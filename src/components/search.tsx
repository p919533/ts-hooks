import { useState } from 'react';

export default function Search({ params, setParams, users }: any) {
    return (
        <>
            <input
                value={params.name}
                onChange={(ev) => {
                    setParams({
                        ...params,
                        name: ev.target.value
                    });
                }}
            />

            <select
                value={params.personId}
                onChange={(ev) => {
                    setParams({
                        ...params,
                        personId: ev.target.value
                    });
                }}
            >
                {users.map((item: any) => {
                    return <option value={item.id} key={item.id}>{item.name}</option>;
                })}
            </select>
        </>
    );
}
