import React from 'react'
import { Stack, Avatar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const UserCard = ({item:{name,age,email,id}}) => {
  const navigate = useNavigate()
  return (
    <Stack
        className='usercard'
        direction={'row'}
        spacing={2}
        sx={{py:2}}
        onClick={() => navigate(`/${id}/${name}`)}
    >
        <Avatar 
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${name}`}
        />
        <Typography variant='subtitle2' sx={{py:1}}>{name}</Typography>
    </Stack>
  )
}

export default UserCard