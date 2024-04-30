import { createContext, useContext, useState } from "react";
import { getLocale, setLocale } from "../utils/helpers";


const AuthContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
    const initialToken = getLocale('token') || ''
    const [token, setToken] = useState(initialToken);

    function addToken(token) {
        setToken(token)
        setLocale('token', token)
    }

    return (
        <AuthContext.Provider value={{ addToken, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider