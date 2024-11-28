import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { Colors } from '../constants/colors'
import { extractNameFromToken, logingOut } from '../constants/validation'
function Header() {

  const [display, setDisplay] = useState(false);

  const handleDisplay=()=>{
    if(extractNameFromToken()==null){
      alert('please login first');
    }else{
      setDisplay(!display)
    }
  }

  const handleLogout=()=>{ 
    logingOut();
    window.location.reload();
  } 

  return (
    <div 
      style={{
        backgroundColor: Colors.HEADER_BG,
        position: 'fixed',
        width: '100%',
        height:'50px',
        top: 0,
        left :0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',marginLeft:'20px'}}>
        <div 
          style={{
            width:'30px',
            height:'30px',
            backgroundImage: `url(/ico.png)`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        >
        </div>
        <Typography variant="h5" style={{paddingRight: '20px'}}>Readerly</Typography>
        </div>

        <div style={{marginRight:'20px',display:'flex',alignItems:'center',position:'relative'}}>
          <Typography variant="p" sx={{mr:'20px'}}>{extractNameFromToken()}</Typography>
          <div style={{height:'40px',width:'40px',backgroundColor:extractNameFromToken()==null?'lightgray':'black',display:'flex',alignItems:'center',justifyContent:'center',color:'white',borderRadius:'50%',fontWeight:'bold',fontSize:'20px',cursor:'pointer'}} onClick={handleDisplay}>
              <p>{extractNameFromToken()==null?'':extractNameFromToken().charAt(0)}</p>
          </div>
          {display?<div style={{position:'absolute',top:'10px',backgroundColor:'white',cursor:'pointer',borderRadius:'5px',zIndex:'10',width:'80px',padding:'2px',left:'-12px'}} onClick={handleLogout}>Log out</div>:''}
        </div>
    </div>
  )
}

export default Header
