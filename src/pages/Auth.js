import React, { useState } from 'react'
import API_ENDPOINTS from '../constants/endpoint';
import { extractIdFromToken, storeToken } from '../constants/validation';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

 const [mode, setMode] = useState("login");//login or signup

 const [Email, setEmail] = useState("");
 const [userName, setUserName] = useState("");
 const [Password, setPassword] = useState("");
 const [responseMessage, setResponseMessage] = useState("");

 const handleSubmit = async (e) => {
    const apiUrl = mode==="login"?API_ENDPOINTS.LOG:API_ENDPOINTS.SIGN;

    let formData = {
      email: Email,
      password: Password,
    }
    if(mode==="signup"){
      formData.userName= userName;
    }

    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData), 
      });

      if (response.status === 201) {
        setMode("login");
      }

      const data = await response.json();
      console.log(data);
      if(data){
        storeToken(data.token);
        navigate('/');
      }

      setResponseMessage(`Success`);

    } catch (err) {
      setResponseMessage(`Error`);
    }

  };

 const handleClear = () => {
    setEmail("");
    setPassword("");
 }

  return (
      <div
        style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          width:'100%',
          height:'100vh',
        }} 
      >
          <h2>{mode==="login"?"Login":"Register"}</h2>
          <div
            style={{
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'space-between',
              marginBottom:'20px',
            }}
          >
              <TextField sx={{mt:'20px'}} type="text" value={Email} label="Email" onChange={(e)=>setEmail(e.target.value)}/>
              {mode==="signup"?<TextField sx={{mt:'20px'}} type="text" value={userName} label="User Name" onChange={(e)=>setUserName(e.target.value)}/>:''}
              <TextField sx={{mt:'20px'}} type="password" value={Password} label="Password" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div
            style={{
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between',

            }} 
          >
              <Button sx={{ml:'10px',mr:'10px'}} variant='contained' onClick={handleSubmit}>{mode==="login"?"Login":"Signup"}</Button>
              <Button sx={{ml:'10px',mr:'10px'}} variant='outlined' onClick={handleClear}>Clear</Button>
          </div>

             {mode==="login"? <Typography style={{cursor:'pointer',marginTop:'20px',textDecoration:'underline'}} onClick={()=>setMode("signup")}>No account yet?</Typography>:<Typography style={{cursor:'pointer',marginTop:'20px',textDecoration:'underline'}} onClick={()=>setMode("login")}>Already have an account?</Typography>}
    </div>
  )
}

export default Auth