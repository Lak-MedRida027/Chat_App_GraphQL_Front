import { React, useState } from 'react'
import { AppBar, Box, Avatar, Typography, TextField, Stack } from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import { useParams } from 'react-router-dom'
import MessageCard from './MessageCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import SendIcon from '@mui/icons-material/Send';
import { SEND_MESSAGE } from '../graphql/mutations';

const ChatScreen = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])
    const { id, name} = useParams()

    const {loading, data, error} = useQuery(GET_MESSAGES,{
        variables: { 
            receiverId: +id
        },
        onCompleted(data){
            setMessages(data.messagesOfUser)
        }
    })

    const [sendMessage] = useMutation(SEND_MESSAGE,{
        onCompleted(data){
            setMessages( (prevState) => [ ...prevState, data.createMessage])
        }
    })

    if(error){
        console.log(error.message)
    }

    //! how to consume graphQl manually using fetch and state managment
/*     const [messages, setMessages] = useState([])

    const getAllMessages = () =>{
        fetch('http://localhost:4000', {
            method: 'POST',        //* because we use graphQl it gonna be always POST
            headers:{
                'Content-Type': 'application/json',
                "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoibW9vbkBnbWFpbC5jb20iLCJpYXQiOjE3NDE2OTQyODF9._102n9tsULolV4Hs-JBhLLemCvsg9iDmbPu818xpj3A"
            },
            body: JSON.stringify({
                query:`
                    query MessagesOfUser($receiverId: Int!) {
                    messagesOfUser(receiverId: $receiverId) {
                        id
                        text
                        createdAt
                    }
                    }
                `,
                variables: {
                    receiverId: 1
                },
            })
        }).then( res => res.json()).then( data => console.log(data))
    }

    useEffect(() =>{
        getAllMessages()
    },[]) 
*/


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
            {loading ? 
            <Typography variant='h6'>Loading chats</Typography> 
            :
            messages.map((message) => {
                return <MessageCard
                            key={message.createdAt}
                            text={message.text}
                            date={message.createdAt}
                            direction={message.receiverId === +id ? 'end' : 'start'}
                            dirColor={message.receiverId === +id ? '#baebcf' : 'white'}
                        />
            })
            } 
        </Box>
        <Stack direction={'row'}>
            <TextField 
                placeholder='Enter a message'
                variant='standard'
                fullWidth
                multiline
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
            <SendIcon className='sendIcon' fontSize='large' sx={{mt: 1}} onClick={() =>{
                sendMessage({
                    variables: {
                        receiverId: +id,
                        text
                    }
                })
                setText('')
            }}/>
        </Stack>
    </Box>
  )
}

export default ChatScreen