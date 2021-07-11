import React from 'react'
import ProjectList from 'pages/project-list'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'

export default function AuthenticatedApp(){
    const { logout } = useAuth()
    return <>
        <PageHeader>
            <button onClick={()=>logout()}>登出</button>
        </PageHeader>
        <Main>
            <ProjectList />
        </Main>
    </>
}

const PageHeader = styled.header`
    height: 6rem;
`
const Main = styled.div`
    height: calc(100vh-6rem);
`

