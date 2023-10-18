import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth.js'
import Cookies from 'js-cookie';
export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
  };

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, setisAuthenticated] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true);

    const singup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setisAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
            //console.error(error.response)
        }
    }

    const singin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setUser(res.data)
            setisAuthenticated(true)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            else{
                setErrors([error.response.data.message])
            }
        }
    }
    const logout = () => {
        Cookies.remove('token')
        setisAuthenticated(false)
        setUser(null)
    }
    useEffect(()=>{
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    },[errors])

    useEffect(() => {
        async function checklogin () {
            const cookies = Cookies.get()
            if (!cookies.token) {
                setisAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }
            try {
                const res = await verifyTokenRequest(cookies.token)
                // console.log(res)
                if (!res.data) {
                    setisAuthenticated(false)
                    setLoading(false)
                    return
                }
                else {
                    setisAuthenticated(true)
                    setUser(res.data)
                    setLoading(false)
                }
            } catch (error) {
                // console.error(error)
                setisAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        checklogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <AuthContext.Provider value={{
            singup,
            singin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors,
        }}>
            { children }
        </AuthContext.Provider>
    )
}