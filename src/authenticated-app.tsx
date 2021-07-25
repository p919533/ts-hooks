import React from "react";
import { Button, Dropdown, Menu } from "antd";
import ProjectList from "pages/project-list";
import ProjectDetails from "pages/project-details";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Row } from "components/libs";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

export default function AuthenticatedApp() {
    return (
        <>
            <PageHeader />
            <Main>
                <Router>
                    <Routes>
                        <Route path={"/projects"} element={<ProjectList />} />
                        <Route
                            path={"/projects/:projectId/*"}
                            element={<ProjectDetails />}
                        />
                        {/* <Navigate to={"/projects"} /> */}
                    </Routes>
                </Router>
            </Main>
        </>
    );
}

const PageHeader = () => {
    const { logout, user } = useAuth();

    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key={"logout"}>
                                <Button onClick={logout} type={"link"}>
                                    登出
                                </Button>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <Button type={"link"} onClick={(e) => e.preventDefault()}>
                        Hi, {user?.name}
                    </Button>
                </Dropdown>
            </HeaderRight>
        </Header>
    );
};

const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.div`
    height: calc(100vh-6rem);
`;
