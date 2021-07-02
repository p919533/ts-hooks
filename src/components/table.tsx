export default function CustomTable({list, users}: any){
    return (
        <table>
            <tr>
                <th>团队</th>
                <th>人员</th>
            </tr>
            {
                list.map((item:any)=>{
                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{users.find((u:any)=> u.id === item.personId)?.name}</td>
                        </tr>
                    )
                })
            }

        </table>
    );
};
