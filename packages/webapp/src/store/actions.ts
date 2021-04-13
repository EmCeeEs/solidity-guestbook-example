import { createAction, ActionType } from "typesafe-actions";
import { User } from "./reducer";

const addUser = createAction("ADD_USER")<User>();
const setUsers = createAction("SET_USERS")<User[]>();
const registerUser = createAction("REGISTER_USER")<User>();

export const actions = {
  addUser,
  setUsers,
  registerUser
};

export type Action = ActionType<typeof actions>;
