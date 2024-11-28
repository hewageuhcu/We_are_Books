import React, { useEffect, useState } from 'react'
import API_ENDPOINTS from '../constants/endpoint';
import { extractIdFromToken } from '../constants/validation';
import { Button, IconButton, TextField } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Colors } from '../constants/colors';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';
import LoginWarn from './LoginWarn';

const BookHeader = ({data,setFilteredData,refetch}) => {

  const [display, setDisplay] = useState(false);

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [genere, setGenere] = useState("");

  const [searchdata, setSearchData] = useState("");

  const handleCancel=()=>{
    setDisplay(false);
    setBookName("");
    setAuthor("");
    setGenere("");
  }

  const [responseMessage, setResponseMessage] = useState("");
  const [logDisplay, setLogDisplay] = useState(false);

  const handleSubmit = async (e) => {
    const apiUrl = API_ENDPOINTS.POST_BOOK;

    let formData = {
      name: bookName,
      author: author,
      genre: genere,
      rate :""
    }

    if(extractIdFromToken()==null){
      setLogDisplay(true);
      return;
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
        refetch();
      }

      setResponseMessage(`Success`);

    } catch (err) {
      setResponseMessage(`Error`);
    }

  };

  const filterData = () => {
    setFilteredData(data.filter(
      (book)=>
        book.name.toLowerCase().includes(searchdata.toLowerCase())||
        book.author.toLowerCase().includes(searchdata.toLowerCase())
      ));
  }

  useEffect(()=>{
    filterData();
  },[searchdata])

  return (
    <div 
      style={{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'column',
        alignItems: 'center',
        width:'100%',
        position:'fixed',
        top:'50px',
        margin:0,
        backgroundColor:Colors.HEADER_BG_BOTTOM,
      }}
    >

    {display?  
      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
      <div
        style={{
          display:'flex',
          alignContent:'center',
          padding:'10px 40px 10px'
        }} 
      >
        <TextField sx={{flex:'2',ml:'5px',mr:'5px'}} type="text" size="small" label="Title" onChange={(e)=>setBookName(e.target.value)}/>
        <TextField sx={{flex:'2',ml:'5px',mr:'5px'}} type="text" size="small" label="Author" onChange={(e)=>setAuthor(e.target.value)}/>
        <TextField sx={{flex:'1',ml:'5px',mr:'5px'}} type="text" size="small" label="Genere" onChange={(e)=>setGenere(e.target.value)}/>
      </div>
          <IconButton onClick={handleSubmit} color='primary'>
            <TaskAltIcon />
          </IconButton>
          <IconButton onClick={handleCancel}>
            <CloseIcon></CloseIcon>
          </IconButton>
      </div>:

      <div 
        style={{
          display:'flex',
          justifyContent:'flex-end',
          alignSelf:'flex-end',
          padding:'10px 40px 10px',
        }}
      >
    
          <TextField type="text" size="small" label="Search by Title / Author" onChange={(e)=>setSearchData(e.target.value)} sx={{width:'250px'}}></TextField>
          <IconButton aria-label="delete" onClick={()=>setDisplay(true)}>
            <PostAddIcon />
          </IconButton>

        </div>
    }
    {logDisplay?<LoginWarn display={logDisplay} setDisplay={setLogDisplay}></LoginWarn>:''}
  </div>
  )
}

export default BookHeader