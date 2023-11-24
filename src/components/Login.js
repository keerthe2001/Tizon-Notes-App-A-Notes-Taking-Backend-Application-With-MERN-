import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [credencials, setcredencials] = useState({email:"",password:""})
    const navigate = useNavigate();
    const host = "https://tizonnotebook4.onrender.com";
    const handleLogin = async (e)=>{
        e.preventDefault();

        const response =  await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({"email":credencials.email,"password":credencials.password })
          });
          const json = await response.json();
          console.log(json.authtoken)
          if(json.authtoken)
          {
              localStorage.setItem('token',json.authtoken)
              navigate("/");
          }
    }

    const onChange = (e) =>{
        setcredencials({...credencials,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleLogin} method='post'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email:</label>
                    <input type="email" value={credencials.email} onChange = {onChange} name='email' className="form-control" id="email" aria-describedby="emailHelp" />
                  
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Password:</label>
                    <input type="password" value={credencials.password} onChange = {onChange}  name="password" className="form-control" id="password" />
                </div>
               
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
