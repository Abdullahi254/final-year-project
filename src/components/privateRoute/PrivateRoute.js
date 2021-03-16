import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
export default function PrivateRoute({component:Component,...rest}) {
    const {currentUser} = useAuth()
    async function user(){
        try{
            return await currentUser
        }catch(er){
            console.log(er)
        }
    }
    return (
        <Route {...rest} render={props=>user()?<Component {...props}/>:
            <Redirect to="/login"/>}>
        </Route>
    )
}
