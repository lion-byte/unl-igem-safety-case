export const getClient = () => {
  return import(/* webpackChunkName: "client", webpackPreload: true */ './client')
    .then(({ client }) => client)
    .catch(err => {
      throw err
    })
}
