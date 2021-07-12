import React from "react";
import { Table } from "antd";

import { User } from "./search";
import dayjs from "dayjs";

interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}
interface CustomTableProps {
  users: User[];
  list: Project[];
}
export default function CustomTable({ list, users }: CustomTableProps) {
  return (
    <Table
      pagination={false}
      dataSource={list}
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
              users.find((u: any) => u.id === project.personId)?.name || "未知"
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
