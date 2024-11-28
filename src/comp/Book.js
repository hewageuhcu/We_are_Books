import { Typography } from '@mui/material'
import React from 'react'
import { Colors } from '../constants/colors'

const Book = ({id,name,author,rate,handleClick}) => {
  return (
    <div 
        style={{
            borderWidth:'1px',
            borderStyle:'solid',
            borderColor:Colors.BOOK_BORDER,
            padding: '10px',
            margin: '10px',
            cursor: 'pointer',
            borderRadius: '5px',
        }}
        onClick={()=>handleClick(id)}
    >
        <Typography variant='h6'>{name}</Typography>
        <p>{`by ${author}`}</p>
        <p>{rate}</p>
    </div>
  )
}

export default Book
