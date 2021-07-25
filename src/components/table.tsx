import React from "react";
import { Table, TableProps } from "antd";

import { User } from "./search";
import dayjs from "dayjs";

export interface Project {
    id: string;
    name: string;
    personId: string;
    organization: string;
    created: number;
}

interface CustomTableProps extends TableProps<Project> {
    users: User[];
}
export default function CustomTable({ users, ...props }: CustomTableProps) {
    return (
        <Table
            {...props}
            pagination={false}
            rowKey="id"
            columns={[
                {
                    title: "名称",
                    dataIndex: "name",
                    sorter: (a, b) => a.name.localeCompare(b.name),
                },
                {
                    title: "部门",
                    dataIndex: "organization",
                },
                {
                    title: "负责人",
                    render(text, project) {
                        return (
                            users.find((u: any) => u.id === project.personId)
                                ?.name || "未知"
                        );
                    },
                },
                {
                    title: "创建时间",
                    render(text, project) {
                        return project.created
                            ? dayjs(project.created).format("YYYY-MM-DD")
                            : "-";
                    },
                },
            ]}
        />
    );
}
