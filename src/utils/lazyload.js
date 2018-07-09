// @ts-ignore
import Loadable from 'react-loadable'

import { Loading, LoadingPage } from '../components/ui'

/**
 * Lazy loads a component
 * @param {() => Promise<any>} loader
 */
export const asyncComponent = loader =>
  Loadable({
    loader,
    loading: Loading
  })

/**
 * Lazy loads a page
 * @param {() => Promise<any>} loader
 */
export const asyncPage = loader =>
  Loadable({
    loader,
    loading: LoadingPage
  })
