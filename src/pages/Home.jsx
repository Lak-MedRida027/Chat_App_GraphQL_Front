import React from 'react'
import { Box } from '@mui/material'
import SideBar from '../components/SideBar'
import { Route, Routes} from 'react-router-dom'
import Welcome from '../components/Welcome'
import ChatScreen from '../components/ChatScreen'



const AllRoutes = () =>{
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/:id/:name' element={<ChatScreen />} />
    </Routes>
  )
}

const Home = ({ setLoggedIn }) => {
  return (
    <Box display={'flex'}>
        <SideBar setLoggedIn={setLoggedIn}/>
        <AllRoutes />
    </Box>
  )
}

export default Home