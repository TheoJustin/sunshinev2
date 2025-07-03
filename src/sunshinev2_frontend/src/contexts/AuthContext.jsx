import { Identity, UseAuthReturnType } from "@ic-reactor/react/dist/types"
import { createContext, useContext } from "react";
import { User } from "../../../declarations/sunshinev2_backend/sunshinev2_backend.did";

const AuthContext = createContext(null)

export const useCustomAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Error");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const { login, logout, identity, error: authError, authenticating } = useAuth();
    const { call, data, error: backendError, refetch, loading: backendLoading } = useQueryCall({
        functionName: 'getUser',
    });
    const response = data;

    useEffect(() => {
        if (identity) {
            if (!response) {
                call();
            } else {
                refetch();
            }
        }
    }, [identity]);

    return <AuthContext.Provider value={{
        user,
        error: customError,
        loading,
        login: customLogin,
        logout,
        identity
    }}>
        {children}
    </AuthContext.Provider>
}