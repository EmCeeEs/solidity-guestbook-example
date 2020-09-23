import { createAction, ActionType } from 'typesafe-actions'
import { User } from './reducer'

const addUser = createAction('ADD_USER')<User>()
const setUsers = createAction('SET_USERS')<User[]>()

export const actions = {
  addUser,
  setUsers,
}

export type Action = ActionType<typeof actions>
