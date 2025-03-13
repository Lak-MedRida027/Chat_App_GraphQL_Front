import { Box, Typography } from '@mui/material'
import React from 'react'

const MessageCard = ({ text, date, direction, dirColor}) => {
  return (
    <Box 
    display={'flex'}
    justifyContent={direction}
    >
        <Box>
            <Typography 
            variant='subtitle2'
            backgroundColor={dirColor}
            padding={'5px 10px'} 
            border={'1px solid gray'}
            borderRadius={'10px'}
            >{text}</Typography>
            <Typography 
            variant='caption'
            >{new Date(date).toLocaleTimeString()}</Typography>
        </Box>
    </Box>
  )
}

export default MessageCard