import React, { use } from 'react'
import { Box, Typography, Stack, Divider} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import UserCard from './UserCard'

const SideBar = () => {
  const users = [  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 28,
    password: "123456",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 34,
    password: "123456",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 22,
    password: "123456",
  }]

  return (
    <Box 
    backgroundColor='#f7f7f7'
    height='100vh'
    width='250px'
    padding='10px'
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant='h6'>Chat</Typography>
        <LogoutIcon  /> 
      </Stack>
      <Divider />
      {
        users.map(user =>{
          return <UserCard key={user.id} item={user} />
        })
      }
    </Box>
  )
}

export default SideBar