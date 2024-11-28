import React, { useEffect, useState } from 'react'
import API_ENDPOINTS from '../constants/endpoint';
import { useLocation } from 'react-router-dom';
import Review from '../comp/review/Review';
import ReviewForm from '../comp/review/ReviewForm';
import Confirm from '../comp/review/Confirm';
import { extractIdFromToken } from '../constants/validation';
import { IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Colors } from '../constants/colors';
import LoginWarn from '../comp/LoginWarn';

const BookReview = () => {
    const location = useLocation();
    const { state } = location;

    //fetch reviews data=========================
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Review form================================
    const [display, setDisplay] = useState(false);

    //Delete review==============================
    const [deleteId, setDeleteId] = useState("");
    const [deleteConfirmDisplay, setDeleteConfirmDisplay] = useState(false);

    //Edit review================================
    const [editId, setEditId] = useState("");
    const [editReview, setEditReview] = useState("");
    const [editRate, setEditRate] = useState("");
    const [editMode, setEditMode] = useState(false);

    //login check===============================
    const [uId, setUId] = useState(extractIdFromToken());
    const [logDisplay, setLogDisplay] = useState(false);
  
    const fetchData = async () => {
      const apiUrl = API_ENDPOINTS.GET_REVIEWS_BY_BOOK_ID+`/${state}`;
      
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    //review deletetion-------------------------
    const initReviewDelete = (id) => {
        setDeleteId(id);
        setDeleteConfirmDisplay(true);
    }

    //review edit-------------------------------
    const initEdit = (id,review,rate) => {
        setEditId(id);
        setEditReview(review);
        setEditRate(rate);
        setEditMode(true);
        setDisplay(true);
    }

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }

    

  return (
    <div>
        <div style={{marginTop:'120px'}}>
          {data.map((review) => (
              <Review key={review.id} user={review.user} id={review.id} userId={review.userId} uId={uId} review={review.review} date={review.date} rate={review.rate} initDelete={initReviewDelete} initEdit={initEdit}/>
          ))}
        </div>
        
        {deleteConfirmDisplay?<Confirm id={deleteId} setDeleteConfirmDisplay={setDeleteConfirmDisplay}></Confirm>:''}

        {display?
            <div 
                style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'space-between',
                    backgroundColor:Colors.HEADER_BG_BOTTOM,
                    position:'fixed',
                    width:'100%',
                    top:'50px',
                    padding:'10px 40px 10px'
                }}
            >
            {!editMode?<ReviewForm refetch={fetchData} setLogDisplay={setLogDisplay} editMode={editMode} bookId={state} setDisplay={setDisplay} setEditMode={setEditMode} rate={0} review="" reviewId=""></ReviewForm>:''}
            {editMode?<ReviewForm refetch={fetchData} setLogDisplay={setLogDisplay} editMode={editMode} bookId={state} setDisplay={setDisplay} setEditMode={setEditMode} rate={editRate} review={editReview} reviewId={editId}></ReviewForm>:''}
            </div>:''
        }

        {!display?
            <div
              style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:Colors.HEADER_BG_BOTTOM,
                position:'fixed',
                width:'100%',
                top:'50px'
            }}
            >
                <Typography variant='p'>Review list for this book</Typography>
                <IconButton onClick={()=>setDisplay(true)} size='large'>
                    <AddIcon />
                </IconButton>  
            </div>:''
        }
        {logDisplay?<LoginWarn setDisplay={setLogDisplay}></LoginWarn>:''}
    </div>
  )
}

export default BookReview