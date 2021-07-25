import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app/index";
import { useAsync } from "utils/use-async";

function Register({ onError }: { onError: (error: Error) => void }) {
    const { user, register } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });

    async function handleSubmit({
        cpassword,
        ...value
    }: {
        username: string;
        password: string;
        cpassword: string;
    }) {
        if (cpassword !== value.password) {
            onError(new Error("请确认两次输入的密码相同"));
            return;
        }
        try {
            await run(register(value));
        } catch (error) {
            onError(error);
        }
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                name="username"
                rules={[{ required: true, message: "请输入用户名" }]}
            >
                <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
            >
                <Input placeholder="密码" type="password" />
            </Form.Item>
            <Form.Item
                name="cpassword"
                rules={[{ required: true, message: "请确认密码" }]}
            >
                <Input placeholder="确认密码" type="cpassword" />
            </Form.Item>
            <Form.Item>
                <LongButton
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                >
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    );
}

export default Register;
