// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
import {User} from 'components/search'

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__"


export const getToken = () => window.localStorage.getItem(localStorageKey);


export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || "");
    return user;
};


export function login(params: { username: string; password: string }) {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json())
        }
        else {
            return Promise.reject(await response.json())
        }
    });
}


export function register(params: { username: string; password: string }) {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json())
        }
        else {
            return Promise.reject(await response.json())
        }
    });
}


export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);