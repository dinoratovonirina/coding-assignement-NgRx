import { createReducer, on, props } from "@ngrx/store";
import { User } from "src/interfaces/user.interface";
import * as fromUserAction from "../Actions/user/user.action";

export const userFeatureKey = "users";

export interface userState {
  readonly [userFeatureKey]: User[];
}

export const initialeState = {
  users: [],
};

export const usersReducer = createReducer<userState>(
  initialeState,
  on(fromUserAction.loadUsers, (state) => {
    return { ...state };
  }),
  on(fromUserAction.loadUsersSuccess, (state, props) => {
    return {
      ...state,
      users: props.users,
    };
  })
);
