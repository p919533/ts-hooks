import React from 'react'
import { Table } from 'antd';

import {User} from './search'
import { render } from '@testing-library/react';
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
        <Table pagination={false} dataSource={list} columns={[
            {
                title:'团队',
                dataIndex: 'name',
                sorter:(a,b) => a.name.localeCompare(b.name)
            },
            {
                title: '人员',
                render(text, project){
                    return users.find((u:any)=> u.id === project.personId)?.name || '未知'
                }
            }
        ]}/>
    );
};
