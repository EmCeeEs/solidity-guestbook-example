import { all, call, delay, put, takeLeading } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { DappInterface } from '../utils/dappInterface'
import {actions} from './actions'
import { User } from './reducer'
import {PayloadAction} from "typesafe-actions";

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

export function* watchRegistration(dappInterface: DappInterface): SagaIterator {
  const registerUser = function *(action: PayloadAction<"REGISTER_USER", User>) {
    yield call(dappInterface.registerUser, action.payload)
  }
  yield takeLeading('REGISTER_USER', registerUser)
}

export function* rootSaga(dappInterface: DappInterface) {
  yield all([
    watchUsers(dappInterface),
    watchRegistration(dappInterface)
  ])
}