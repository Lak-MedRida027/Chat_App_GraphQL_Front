import React from 'react'
import { AppBar, Box, Avatar, Typography, TextField } from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import { useParams } from 'react-router-dom'
import MessageCard from './MessageCard';

const ChatScreen = () => {
    const { id, name} = useParams()
  return (
    <Box flexGrow={1}>
        <AppBar position="static" sx={{backgroundColor:'white', boxShadow: 0}}>
            <Toolbar>
                <Avatar 
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${name}`}
                sx={{width: '32px', height: '32px'}}
                />
                <Typography variant='h6' sx={{ color: 'black', ml:2}}>{name}</Typography>
            </Toolbar>
        </AppBar>
        <Box backgroundColor='#f5f5f5' overflow={'auto'} height={'80vh'} padding={'10px'}>
            <MessageCard text={'hi'} date={'2025-10-24'} direction={'start'}/>
            <MessageCard text={'hi'} date={'2025-10-24'} direction={'end'}/>
            <MessageCard text={'hi'} date={'2025-10-24'} direction={'start'}/>
        </Box>
        <TextField 
            placeholder='Enter a message'
            variant='standard'
            fullWidth
            multiline
            rows={2}
        />
    </Box>
  )
}

export default ChatScreen