import { call, delay, put } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { DappInterface } from '../utils/dappInterface'
import { actions } from './actions'
import { User } from './reducer'

export const REFETCH_CYCLE = 1000 // in ms

export function* watchUsers(dappInterface: DappInterface): SagaIterator {
  while (true) {
    try {
      const users: User[] = yield call(dappInterface.getUsers)
      yield put(actions.setUsers(users))
    } catch (error) {
      throw error
    }

    yield delay(REFETCH_CYCLE)
  }
}
