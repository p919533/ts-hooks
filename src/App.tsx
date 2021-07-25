import React from "react";
import UnauthenticatedApp from "unauthenticated-app";
import AuthenticatedApp from "authenticated-app";
import { useAuth } from "context/auth-context";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback, FullPageLoading } from "components/libs";
import "./App.css";

function App() {
    const { user } = useAuth();
    return (
        <div className="App">
            {/* 事件的错误不会捕获 ，ui的才会 */}
            <button
                onClick={() => {
                    throw new Error("错误");
                }}
            >
                错误捕获
            </button>
            <ErrorBoundary fallbackRender={FullPageErrorFallback}>
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </ErrorBoundary>
            {/* <Register/> */}
        </div>
    );
}

export default App;
