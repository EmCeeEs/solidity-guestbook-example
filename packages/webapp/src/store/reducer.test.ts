import { getType } from 'typesafe-actions'
import assert from 'assert'
import * as R from 'ramda'

import { User, users } from './reducer'
import { actions } from './actions'

const USER_1: User = {
  nickName: 'Alice',
  city: 'NY',
  country: 'USA',
}
const USER_2: User = {
  nickName: 'Bob',
  city: 'Berlin',
  country: 'Germany',
}
export const USERS = [USER_1, USER_2]

describe('users', () => {
  test(getType(actions.setUsers), () => {
    const state = users(undefined, actions.setUsers(USERS))
    assert.deepStrictEqual(state, USERS)
  })
  test(getType(actions.addUser), () => {
    const state = R.reduce(users, undefined, [actions.addUser(USER_1), actions.addUser(USER_2)])
    assert.deepStrictEqual(state, USERS)
  })
})
