import React from 'react'
import { Colors } from '../../constants/colors'
import { IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarIcon from '@mui/icons-material/Star';

const Review = ({id,userId,uId,user,review,rate,initDelete,initEdit,date}) => {


  return (
    <div
        style={{
            borderBottomWidth:'1px',
            borderBottomStyle:'solid',
            borderBottomColor:Colors.DIVIDER,
            padding: '10px',
            margin: '10px 10px 10px 10px',
            position:'relative'
        }}
    >
        <div>
            <p>{`by ${user}`}</p>
            <p>{`on ${date}`}</p>
            <Typography variant='p'>{review}</Typography>
        </div>
        {userId===uId?
            <div 
                style={{
                    cursor:'pointer',
                    position :'absolute',
                    top:'5px',
                    right:'2px'

                }}
            >
                <IconButton onClick={()=>initEdit(id,review,rate)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={()=>initDelete(id)}>
                    <DeleteForeverIcon />
                </IconButton>
        </div>:''}
        <div style={{display:'flex',position:'absolute',bottom:'5px',right:'15px'}}>
            {Array.from({ length: rate }).map((_, index) => (
                <StarIcon key={index} sx={{width:'15px',height:'15px'}}/>
            ))}
        </div>
    </div>
  )
}

export default Review