import { gql } from '@apollo/client'

export const GET_USERS = gql`
query getUsers {
    users {
        id
        name
        email
        age
    }
}
`

export const GET_MESSAGES = gql`
query MessagesOfUser($receiverId: Int!) {
    messagesOfUser(receiverId: $receiverId) {
        id
        text
        createdAt
        receiverId
        senderId
    }
}
`