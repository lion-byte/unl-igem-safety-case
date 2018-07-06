import gql from 'graphql-tag'

export const USERNAME_QUERY = gql`
  query UserInfo {
    me {
      username
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`
