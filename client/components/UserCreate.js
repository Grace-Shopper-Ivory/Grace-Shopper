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
    const [hideRequiredFlag,setHideRequiredFlag] = useState(true)

    function handleSubmit(event) {
        event.preventDefault();
        
        if(user.password===user.confirmPassword){
            let trigger = true
            let addUser ={}
            for (let key in user){
                if(user[key]){
                    if(key!=="confirmPassword"){
                        addUser[key] = user[key]
                    }
                }
                else if(!user[key] && key !== "img"){
                    trigger = false
                }
            }
            if (trigger){
                dispatch(signup({ ...user }))
            }else{
                setHideRequiredFlag(false)
                setUser({...user,password:"",confirmPassword:""})
                alert("please fill in required fields")
            }
        }else{
            alert("passwords do not match")
            setUser({...user,password:"",confirmPassword:""})
        }
    }
    
    return(
        <div id='user-create'>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='firstName'>first name {hideRequiredFlag ? "" : <span className = "required"> *required</span>}</label>
                    <input name='firstName' value={user.firstName} onChange={(event)=>setUser({...user, firstName:event.target.value})}/>
                </div>

                <div>
                    <label htmlFor='lastName'>last name {hideRequiredFlag ? "" : <span className = "required"> *required</span>}</label>
                    <input name='lastName' value={user.lastName} onChange={(event)=>setUser({...user, lastName:event.target.value})}/>
                </div>

                <div>
                    <label htmlFor='email'>email {hideRequiredFlag ? "" : <span className = "required"> *required</span>}</label>
                    <input name='email' type="email" value={user.email} onChange={(event)=>setUser({...user, email:event.target.value})}/>
                </div>

                <div>
                    <label htmlFor='username'>username {hideRequiredFlag ? "" : <span className = "required"> *required</span>}</label>
                    <input name='username' value={user.username} onChange={(event)=>setUser({...user, username:event.target.value})}/>
                </div>

                <div>
                    <label htmlFor='password'>password {hideRequiredFlag ? "" : <span className = "required"> *required</span>}</label>
                    <input name='password' type="password" value={user.password} onChange={(event)=>setUser({...user, password:event.target.value})}/>
                </div>

                <div>
                    <label htmlFor='confirmPassword'>confirm password {hideRequiredFlag ? "" : <span className = "required"> *required</span>}</label>
                    <input name='confirmPassword' type="password" value={user.confirmPassword} onChange={(event)=>setUser({...user, confirmPassword:event.target.value})}/>
                </div>

                <div>
                    <label htmlFor='img'>image URL</label>
                    <input name='img' value={user.img} onChange={(event)=>setUser({...user, img:event.target.value})}/>
                </div>

                <div className="submit-buttons">
                    <button type='submit'>submit</button>
                    <button type='button'><Link to='/'>cancel</Link></button>
                </div>
            </form>
        </div>
    )

}

export default UserCreate