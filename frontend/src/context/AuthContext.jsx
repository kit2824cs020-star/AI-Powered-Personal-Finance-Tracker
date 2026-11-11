import { createContext, useContext, useEffect, useState } from 'react'
import { api, getToken, setToken } from '../services/api'
const AuthContext=createContext(null)
export function AuthProvider({children}){
 const [user,setUser]=useState(null),[loading,setLoading]=useState(true)
 useEffect(()=>{if(!getToken()){setLoading(false);return}api('/me').then(setUser).catch(()=>{setToken(null);setUser(null)}).finally(()=>setLoading(false))},[])
 const login=async(email,password)=>{const d=await api('/auth/login',{method:'POST',body:JSON.stringify({email,password})});setToken(d.token);setUser(d.user);return d.user}
 const register=async(name,email,password)=>{const d=await api('/auth/register',{method:'POST',body:JSON.stringify({name,email,password})});setToken(d.token);setUser(d.user);return d.user}
 const logout=()=>{setToken(null);setUser(null)}
 return <AuthContext.Provider value={{user,loading,login,register,logout}}>{children}</AuthContext.Provider>
}
export function useAuth(){const c=useContext(AuthContext);if(!c)throw new Error('useAuth must be used inside AuthProvider');return c}
