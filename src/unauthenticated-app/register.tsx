
import React, { FormEvent } from 'react';
import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from "unauthenticated-app/index";

function Register() {
    const { user, register } = useAuth()
    function handleSubmit(value: { username: string, password: string }) {
        register(value);
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
                <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
                <Input placeholder="密码" type="password" />
            </Form.Item>
            <Form.Item>
                <LongButton type="primary" htmlType="submit">注册</LongButton>
            </Form.Item>
        </Form>
    );
}

export default Register;
