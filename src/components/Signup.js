import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [credencials, setcredencials] = useState({name:"",email:"",password:"",cpassword:""})
    const navigate = useNavigate();
   const handlesignup = async(e) =>{

    e.preventDefault();
    const response =  await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({"name":credencials.name,"email":credencials.email,"password":credencials.password})
          });
          const json = await response.json();
          console.log(json.authtoken)

          if(json.authtoken)
          {
              navigate("/login");
          }

   }
   const onChange = (e) =>{
    setcredencials({...credencials,[e.target.name]:e.target.value})
}
  return (
    <div>
        <form method='post' onSubmit={handlesignup}>
  <div  className="mb-3">
    <label for="name" className="form-label">Email address</label>
    <input type="text" name="name" onChange={onChange} value={credencials.name} className="form-control" id="name" aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3">
    <label for="email" className="form-label">Email address</label>
    <input type="email" name="email" onChange={onChange} value={credencials.email} className="form-control" id="email" aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" onChange={onChange} className="form-control" value={credencials.password} id="password" name="password" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label for="cpassword" className="form-label">Confirm Password</label>
    <input type="password" onChange={onChange} className="form-control" value={credencials.cpassword} id="cpassword" name="cpassword" minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Signup</button>
</form>
    </div>
  )
}
