import { IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

function LoginWarn({display,setDisplay}) {

    const handleNavigate=()=>{
        window.location.href='/auth'
    }

  return (
    <div
    style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width:'300px'
      }}
    >
        <p>Please login first</p>
        <div style={{display:'flex',justifyContent:'center'}}>
          <IconButton onClick={handleNavigate} color='primary'>
            <DoubleArrowIcon/>
          </IconButton>
          <IconButton onClick={()=>setDisplay(false)}>
            <CloseIcon />
          </IconButton>
        </div>
    </div>
  )
}

export default LoginWarn