import { getType, Reducer } from "typesafe-actions";
import { createReducer } from "redux-create-reducer";
import * as R from "ramda";

import { actions, Action } from "./actions";

export type User = {
  nickName: string;
  city: string;
  country: string;
};

export const users: Reducer<User[], Action> = createReducer<User[]>([], {
  [getType(actions.setUsers)]: (state, action) => action.payload,
  [getType(actions.addUser)]: (state, action) =>
    R.append<User>(action.payload, state)
});
