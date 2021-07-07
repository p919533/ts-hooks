import {User} from './search'
interface Project{
    id: number,
    name: string,
    personId: number,
    organization: string,
    created: number
}
interface CustomTableProps {
    users: User[],
    list: Project[]
}
export default function CustomTable({list, users}: CustomTableProps){
    return (
        <table >
            <thead>
                <tr>
                    <th>团队</th>
                    <th>人员</th>
                </tr>
            </thead>
            <tbody>
            {
                list.map((item:any)=>{
                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{users.find((u:any)=> u.id === item.personId)?.name || '未知'}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    );
};
