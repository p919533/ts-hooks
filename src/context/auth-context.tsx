import React, { useState } from "react";
import * as auth from "auth-provider";
import { FullPageLoading, FullPageErrorFallback } from "components/libs";
import { User } from "components/search";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
interface AuthForm {
    username: string;
    password: string;
}
const AuthContext = React.createContext<
    | {
          user: User | null;
          login: (data: AuthForm) => Promise<void>;
          register: (data: AuthForm) => Promise<void>;
          logout: () => Promise<void>;
      }
    | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const res = await http("me", { token });
        user = res.user;
    }
    return user;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // const [user, serUser] = useState<User | null>(null)
    const {
        run,
        isLoading,
        isIdle,
        data: user,
        setData: serUser,
        isError,
        error,
    } = useAsync<User | null>();
    // point free
    const login = (data: AuthForm) => auth.login(data).then(serUser);
    const register = (data: AuthForm) => auth.register(data).then(serUser);
    const logout = () => auth.logout().then((user) => serUser(null));

    useMount(() => {
        run(bootstrapUser());
    });
    if (isLoading || isIdle) {
        return <FullPageLoading />;
    }

    if (isError) {
        return <FullPageErrorFallback error={error}></FullPageErrorFallback>;
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");
    }
    return context;
};
