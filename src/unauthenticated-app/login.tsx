
import React, { FormEvent } from 'react';
import { Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import { LongButton } from "unauthenticated-app/index";

function Login() {
    const { user, login } = useAuth()

    function handleSubmit(value: { username: string, password: string }) {
        // ev.preventDefault();
        // const username = (ev.currentTarget.elements[0] as HTMLInputElement)
        //     .value;
        // const password = (ev.currentTarget.elements[1] as HTMLInputElement)
        //     .value;
        login(value);
    }
    return (
        <Form onFinish={handleSubmit}>
            {user ? ` 登录成功，用户名${user.name}` : null}
            <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
                <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
                <Input placeholder="密码" type="password" />
            </Form.Item>
            <Form.Item>
                <LongButton type="primary" htmlType="submit">登录</LongButton>
            </Form.Item>
        </Form>
    );
}

export default Login;
