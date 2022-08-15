import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!, $channel: String!, $genre: String!) {
  addUser(username: $username, email: $email, password: $password, channel: $channel, genre: $genre) {
    token
    user {
      _id
      username
      email
      channel
      genre
    }
  }
}`

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}`