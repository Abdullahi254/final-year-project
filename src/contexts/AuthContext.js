import React,{useContext, useState,useEffect} from 'react'
import {auth} from '../firebase'
import {Spinner} from 'react-bootstrap'

export const AuthContext = React.createContext()

export function useAuth (){
    return useContext(AuthContext)
}

export  function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState('')
    const [loading,setLoading] = useState(true)
    function signUp(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }
    function logout(){
        return auth.signOut()
    }
    useEffect(()=>{
       const unsubscribe = auth.onAuthStateChanged(user=>{
           setLoading(false)
           setCurrentUser(user)
       })
       return unsubscribe 
    },[])
    const value = {
        currentUser,
        signUp,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {loading ?<div style={{display:'flex',minHeight:'100vh', justifyContent:'center', alignItems:'center'}}>
                <Spinner animation="grow" style={{height:'20rem', width:'20rem'}}/>
                </div>:children}
        </AuthContext.Provider>
    )
}
