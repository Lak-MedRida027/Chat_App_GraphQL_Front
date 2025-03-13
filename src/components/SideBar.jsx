import React, { use, useState } from 'react'
import { Box, Typography, Stack, Divider} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import UserCard from './UserCard'
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';

const SideBar = ({ setLoggedIn }) => {
  const [users, setUsers] = useState([])
    const {loading, data, error} = useQuery(GET_USERS)

    if(loading) return <Typography variant='h6'>Loading chats</Typography>
    if(error){
      console.log(error.message)
    }

  return (
    <Box 
    backgroundColor='#f7f7f7'
    height='100vh'
    width='250px'
    padding='10px'
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant='h6'>Chat</Typography>
        <LogoutIcon className='LogoutIcon' onClick={ ()=>{
          localStorage.removeItem('jwt')
          setLoggedIn(false)
        }} /> 
      </Stack>
      <Divider />
      {
        data.users.map(user =>{
          return <UserCard key={user.id} item={user} />
        })
      }
    </Box>
  )
}

export default SideBar