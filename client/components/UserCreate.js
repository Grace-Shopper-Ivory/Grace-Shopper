import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { Link,} from "react-router-dom";
import {signup} from '../store'

function UserCreate(){
    const dispatch = useDispatch()
    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        img: "",
    })

    function handleSubmit(event) {
        event.preventDefault();
        if(user.password===user.confirmpassword){
            let addUser = {}
            for (let key in user){
                console.log(user[key])
                if(user[key] && key!=="confirmpassword"){
                    addUser[key] = user[key]
                }
            }
            dispatch(signup({ ...user }));
        }else{
            console.log("password mismatch")
        }
    }

    console.log(user)
    return(
        <form id='todo-form' onSubmit={handleSubmit}>
            <label htmlFor='firstName'>first name:</label>
            <input name='firstName' value={user.firstName} onChange={(event)=>setUser({...user, firstName:event.target.value})}/>

            <label htmlFor='lastName'>last name:</label>
            <input name='lastName' value={user.lastName} onChange={(event)=>setUser({...user, lastName:event.target.value})}/>

            <label htmlFor='email'>email:</label>
            <input name='email' value={user.email} onChange={(event)=>setUser({...user, email:event.target.value})}/>

            <label htmlFor='username'>username:</label>
            <input name='username' value={user.username} onChange={(event)=>setUser({...user, username:event.target.value})}/>

            <label htmlFor='password'>password:</label>
            <input name='password' type="password" value={user.password} onChange={(event)=>setUser({...user, password:event.target.value})}/>

            <label htmlFor='confirmPassword'>confirm password:</label>
            <input name='confirmPassword' type="password" value={user.confirmPassword} onChange={(event)=>setUser({...user, confirmPassword:event.target.value})}/>

            <label htmlFor='img'>image URL:</label>
            <input name='img' value={user.img} onChange={(event)=>setUser({...user, img:event.target.value})}/>
  
            <button type='submit'>submit</button>
            <Link to='/'>cancel</Link>
        </form>
    )

}

export default UserCreate