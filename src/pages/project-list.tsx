import React, { useState, useEffect } from "react";
import { Typography, Space } from "antd";
import Search from "components/search";
import CustomTable from "components/table";
import { clearObject, useMount, useDebounce, useDocumentTitle } from "utils";
import { Params } from "components/search";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import qs from "qs";
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";

function ProjectList() {
    const [params, setParams] = useState({
        name: "",
        personId: "",
    });

    // const [users, setUsers] = useState([]);

    // const [list, setList] = useState([]);

    const debounceParams = useDebounce<Params>(params, 200);

    const { isLoading, error, data: list } = useProjects(debounceParams);

    const { data: users } = useUsers();

    useDocumentTitle("项目列表");

    return (
        <Container className="App">
            <h1>项目列表</h1>
            <Search params={params} setParams={setParams} users={users || []} />
            <Typography.Text type="danger">{error?.message}</Typography.Text>
            <CustomTable
                users={users || []}
                dataSource={list || []}
                loading={isLoading}
            />
        </Container>
    );
}

export default ProjectList;
const Container = styled.div`
    padding: 3.2rem;
`;
