import React, { useState, useRef } from 'react'
import { Box, Stack, Typography, Button, TextField, Card} from '@mui/material'

const AuthScreen = () => {
    const [showLogin, setShowLogin] = useState(true)
    const [formData, setFormData] = useState({})
    const authForm = useRef(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,  //* to create copy from the lastest one and add the new data
            [e.target.name]: e.target.value
        })
    }

    const handleSbmit = (e) =>{
        e.preventDefault()
        console.log(formData)
    }

  return (
    <Box ref={authForm} component='form' onSubmit={handleSbmit} height='80vh' alignItems='center' justifyContent='center' display='flex' spacing={2}>
        <Card variant='outlined' sx={{padding:'20px'}}>
            <Stack direction='column' spacing={2} sx={{width: '400px'}}>
                <Typography variant='h5'>{showLogin ? "LogIn" : "SignUp"}</Typography>
                {showLogin ? 
                <></> 
                : 
                <TextField
                name='name'
                label='Name'
                variant='standard'
                onChange={handleChange}
                />}
                <TextField
                type='email'
                name='email'
                label='Email'
                variant='standard'
                onChange={handleChange}
                />
                <TextField
                type='password'
                name='password'
                label='Password'
                variant='standard'
                onChange={handleChange}
                />
                <Typography variant='subtitle1' sx={{color: 'blue'}} onClick = {() =>{
                    setShowLogin(!showLogin) //* or put (preValue) => !preValue 
                    setFormData({})
                    authForm.current.reset() //* to reset the form fields to empty string
                }}>{showLogin ? "Create an account?" : "LogIn ?"}</Typography>
                <Button variant='outlined' type='submit'>{showLogin ? "LOGIN" : "SignUp"}</Button>
            </Stack>
        </Card>
    </Box>
  )
}

export default AuthScreen