import React, { useState, useRef, useEffect } from 'react'
import { Box, Stack, Typography, Button, TextField, Card, Alert, CircularProgress} from '@mui/material'
import { useMutation } from '@apollo/client'
import { LOGIN_USER, SIGNUP_USER } from '../graphql/mutations'

const AuthScreen = ({setLoggedIn}) => {
    const [showLogin, setShowLogin] = useState(true)
    const [formData, setFormData] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isErr, setIsErr] = useState(false)
    const [isErrMsg, setIsErrMsg] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [successName, setSuccessName] = useState("")
    const authForm = useRef(null)
    
    const [signUpUser, {data:signUpData, error:e1}] = useMutation(SIGNUP_USER, {
        onCompleted: (data) => {
            setIsSubmitting(false)
            setSuccessName(data.signUpUser.name)
            setShowSuccessMessage(true)
        },
        onError: (error) => {
            setIsSubmitting(false)
            setIsErr(true)
            setIsErrMsg(error.message)
        }
    })

    const [logInUser, {data:loginData, error:e2}] = useMutation(LOGIN_USER, {
        onCompleted: (data) => {
            localStorage.setItem('jwt', data.logInUser.token)
            setIsSubmitting(false)
            setLoggedIn(true)
        },
        onError: (error) => {
            setIsSubmitting(false)
            setIsErr(true)
            setIsErrMsg(error.message)
        }
    })
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSbmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        if(showLogin){
            logInUser({
                variables: {
                    userData: formData
                }
            })
        } else {
            //* Create a copy of formData with age as number
            const userData = {
                ...formData,
                age: formData.age ? parseInt(formData.age, 10) : 0
            }
            
            signUpUser({
                variables: {
                    userNew: userData
                }
            })
        }
    }
    
    return (
        <Box ref={authForm} component='form' onSubmit={handleSbmit} height='80vh' alignItems='center' justifyContent='center' display='flex' spacing={2}>
            <Card variant='outlined' sx={{padding:'20px'}}>
                <Stack direction='column' spacing={2} sx={{width: '400px'}}>
                    {showSuccessMessage && 
                        <Alert severity="success">{successName} is Signed Up successfully!</Alert>}
                    {isErr && 
                        <Alert severity="error">{isErrMsg}</Alert>}
                    <Typography variant='h5'>{showLogin ? "LogIn" : "SignUp"}</Typography>
                    
                    {isSubmitting ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                            <CircularProgress />
                            <Typography variant='h6' sx={{ mt: 2 }}>Please wait while we authenticate...</Typography>
                        </Box>
                    ) : (
                        <>
                            {!showLogin && (
                                <>
                                    <TextField
                                        name='name'
                                        label='Name'
                                        variant='standard'
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        name='age'
                                        label='Age'
                                        variant='standard'
                                        type="number"
                                        onChange={handleChange}
                                        required
                                    />
                                </>
                            )}
                            <TextField
                                type='email'
                                name='email'
                                label='Email'
                                variant='standard'
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                type='password'
                                name='password'
                                label='Password'
                                variant='standard'
                                onChange={handleChange}
                                required
                            />
                            <Typography 
                                variant='subtitle1' 
                                sx={{color: 'blue', cursor: 'pointer'}} 
                                onClick = {() =>{
                                    setShowLogin(!showLogin)
                                    setFormData({})
                                    setShowSuccessMessage(false)
                                    setIsErr(false)
                                    authForm.current.reset()
                                }}
                            >
                                {showLogin ? "Create an account?" : "LogIn ?"}
                            </Typography>
                            <Button variant='outlined' type='submit'>{showLogin ? "LOGIN" : "SignUp"}</Button>
                        </>
                    )}
                </Stack>
            </Card>
        </Box>
    )
}

export default AuthScreen