import gql from 'graphql-tag'

export const USERNAME_QUERY = gql`
  query Username {
    me {
      username
    }
  }
`

export const PERMISSIONS_QUERY = gql`
  query Permissions {
    permissions {
      level
      canRead
      canWrite
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
