export const getClient = async () => {
  const {
    client
  } = await import(/* webpackChunkName: "client", webpackPreload: true */ './client')

  return client
}
