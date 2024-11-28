import React, { useState } from 'react'
import API_ENDPOINTS from '../../constants/endpoint';
import { extractIdFromToken } from '../../constants/validation';
import { IconButton, Rating, TextField } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';
import { Colors } from '../../constants/colors';

const ReviewForm = ({editMode,setDisplay,setEditMode,bookId,userId,rate,review,reviewId,setLogDisplay,refetch}) => {

  const [rateData, setRateData] = useState(rate);
  const [reviewData, setReviewData] = useState(review);
  const [responseMessage, setResponseMessage] = useState("");


  const handleCancel = () => {
    setDisplay(false);
    setEditMode(false);
  }

  const handleSubmit = async (e) => {
    const apiUrl = !editMode?API_ENDPOINTS.POST_REVIEW:API_ENDPOINTS.POST_REVIEW+`/${reviewId}`;

    let formData = {
      rate: rateData,
      review: reviewData,
    }
    const uId=extractIdFromToken()
    if(uId==null){
      setLogDisplay(true);
      return;
    }
    if(!editMode){
      formData.bookId= bookId;
      formData.userId= uId;
    }

    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: editMode?"PUT":"POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if(response.status === 201){
        refetch();
      }

      setResponseMessage(`Success`);

    } catch (err) {
      setResponseMessage(`Error`);
    }
    setDisplay(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width:'100%',
        backgroundColor:Colors.HEADER_BG_BOTTOM,
      }}
    >
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width:'70%',
        }}
      >
        <TextField type="text"  value={reviewData} label="Your review" onChange={(e)=>setReviewData(e.target.value)} multiline sx={{width:'100%'}} rows={5}/>
      <div style={{display:'flex',alignItems:'center',alignSelf:'start'}}>
          <p style={{marginRight:'20px'}}>Rate this book</p>
          <Rating
              name="Rate"
              value={rateData}
              onChange={(event, newValue) => {
                setRateData(newValue);
              }}
            />
      </div>
      <div style={{display:'flex',alignSelf:'end',paddingTop:'10px'}}>
        <IconButton onClick={handleSubmit}>
          <TaskAltIcon></TaskAltIcon>
        </IconButton>
        <IconButton onClick={handleCancel}>
          <CloseIcon></CloseIcon>
        </IconButton>
      </div>
      </div>
    </div>
  )
}

export default ReviewForm
