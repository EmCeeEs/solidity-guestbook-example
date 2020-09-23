import { call, delay, put } from "redux-saga/effects";

import { DappInterface } from "../utils/dappInterface";
import { watchUsers, REFETCH_CYCLE} from './sagas'
import { actions } from './actions'
import { USERS } from "./reducer.test";

import assert from 'assert'

const dummyDappInterface:DappInterface = {
  getAccount: (): any => Promise.resolve(),
  getNetworkId: (): any => Promise.resolve(),
  getGuestbook: (): any => Promise.resolve(),
  getUsers: (): any => Promise.resolve(),
}

describe('sagas', () => {
  test('watchUsers', () => {
    const gen = watchUsers(dummyDappInterface)
    assert.deepStrictEqual(
      gen.next().value,
      call(dummyDappInterface.getUsers),
    )
    assert.deepStrictEqual(
      gen.next(USERS).value,
      put(actions.setUsers(USERS)),
    )
    assert.deepStrictEqual(
      gen.next().value,
      delay(REFETCH_CYCLE),
    )
    assert.deepStrictEqual(
      gen.next().value,
      call(dummyDappInterface.getUsers),
    )
    // ...
  })
})
