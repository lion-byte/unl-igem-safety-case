import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
query CurrentUser {
  me {
    username
  }
}
`

export class User extends React.PureComponent {
  render () {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) {
            return <span>Loading...</span>
          } else if (error) {
            return <span>Guest</span>
          } else {
            return <span>{data.me.username}</span>
          }
        }}
      </Query>
    )
  }
}
