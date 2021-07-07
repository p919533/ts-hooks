

export interface User {
    id: string,
    name: string
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
                <option value='' >负责人</option>;
                {users.map((item) => {
                    return <option value={item.id} key={item.id}>{item.name}</option>;
                })}
            </select>
        </>
    );
}
