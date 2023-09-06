import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "src/app/services/users.service";
import * as fromUserAction from "../../Actions/user/user.action";
import { catchError, map, mergeMap } from "rxjs/operators";
import { User } from "src/interfaces/user.interface";
import { of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromUserAction.loadUsers),
      mergeMap(() =>
        this.userService.listUsers.pipe(
          map((users: User[]) =>
            fromUserAction.loadUsersSuccess({ users: users })
          ),
          catchError((error) =>
            of(fromUserAction.loadUsersFailure({ error: error }))
          )
        )
      )
    )
  );

  constructor(private action$: Actions, private userService: UsersService) {}
}
