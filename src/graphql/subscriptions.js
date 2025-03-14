import { gql } from '@apollo/client'

export const MESSAGE_SUB = gql`
subscription Subscription {
    messageAdded {
        createdAt
        id
        receiverId
        senderId
        text
    }
}
`