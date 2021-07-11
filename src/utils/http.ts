import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL



interface Config extends RequestInit {
    data?: object,
    token?: string
}
export const http = (url: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": data ? "application/json" : "",
        },
        ...customConfig,
    };
    if (config.method.toUpperCase() === "GET") {
        url += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }
    return window.fetch(`${apiUrl}/${url}`, config)
        .then(async (response) => {
            if (response.status === 401) {
                await auth.logout();
                window.location.reload();
                return Promise.reject({ message: "请重新登录" });
            }
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
        });

}

export const useHttp = () => {
    const { user } = useAuth()
    // todo ts操作符 工具类
    // Parameters Partial Omit介绍
    // Utility Types-Pick、Exclude、Partial和Omit实现
    return (...[url, config]: Parameters<typeof http>) => http(url, { ...config, token: user?.token })

}
