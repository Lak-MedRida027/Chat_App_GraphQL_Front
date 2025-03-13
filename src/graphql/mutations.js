import { gql } from '@apollo/client'

export const SIGNUP_USER = gql`
mutation SignUpUser($userNew: UserInput!) {
    signUpUser(userNew: $userNew) {
        id
        name
        email
        age  
    }
}
`

export const LOGIN_USER = gql`
mutation LogInUser($userData: UserLogInInput!) {
    logInUser(userData: $userData) {
        token
    }
}
`

export const SEND_MESSAGE = gql`
mutation CreateMessage($receiverId: Int!, $text: String!) {
    createMessage(receiverId: $receiverId, text: $text) {
        id
        text
        senderId
        receiverId
        createdAt
    }
}
`