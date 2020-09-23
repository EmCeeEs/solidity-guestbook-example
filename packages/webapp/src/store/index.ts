import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { users } from './reducer'
import { watchUsers } from './sagas'
import { createDappInterface } from '../utils/dappInterface'
import { createWeb3 } from '../utils/web3'

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    users,
    applyMiddleware(sagaMiddleware)
  )

  const web3 = createWeb3()
  const dappInterface = createDappInterface(web3)
  sagaMiddleware.run(watchUsers, dappInterface)

  return store
}
