import React, { useState } from 'react'
import API_ENDPOINTS from '../../constants/endpoint';
import { IconButton } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';

const Confirm = ({id,setDeleteConfirmDisplay}) => {

    const [deleteResponseMessage, setDeleteResponseMessage] = useState("");

    const handleReviewDelete = async (e, id) => {
        const apiUrl = API_ENDPOINTS.POST_REVIEW+`/${id}`;
        e.preventDefault();
        try {
          const response = await fetch(apiUrl, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json", 
            }
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          setDeleteResponseMessage(`Success`);
    
        } catch (err) {
          setDeleteResponseMessage(`Error`);
        }
    
      };

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
        justifyContent: 'center'
      }}
    >
        <p>Are you sure you want to delete this?</p>
        <div style={{display:'flex',justifyContent:'center'}}>
          <IconButton onClick={(e)=>handleReviewDelete(e,id)}>
            <TaskAltIcon />
          </IconButton>
          <IconButton onClick={()=>setDeleteConfirmDisplay(false)}>
            <CloseIcon />
          </IconButton>
        </div>
    </div>
  )
}

export default Confirm