import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { getOneTicket } from "../State/Actions/ticket/ticket.actions";
import { listTicketSelector } from "../State/Selectors/ticket/ticket.selectors";
import { loadUserSelect } from "../State/Selectors/user/user.selectors";
import { Observable, combineLatest, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Ticket } from "src/interfaces/ticket.interface";
import { User } from "src/interfaces/user.interface";
import { isNull } from "util";

@Injectable({ providedIn: "root" })
export class DetailTicketResolver implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = +route.params["id"];
    let dataTicket$: Observable<any>;

    combineLatest([
      this.store.pipe(select(listTicketSelector)),
      this.store.pipe(select(loadUserSelect)),
      of(id),
    ])
      .pipe(
        map(([tickets, users, id]) => {
          return tickets
            .filter((ticket: Ticket) => ticket.id == id)
            .map((ticket: Ticket) => {
              return {
                ...ticket,
                assigneeName: !isNull(ticket.assigneeId)
                  ? users.find((user: User) => user.id == ticket.assigneeId)
                      .name
                  : null,
              };
            });
        })
      )
      .subscribe(
        (dataTicket: any) => {
          if (dataTicket) dataTicket$ = dataTicket.shift();
          this.store.dispatch(getOneTicket({ id: id }));
        },
        (error) =>
          alert(
            `Erreur de recupération de détail du ticket n°:${id} => ${error}`
          )
      );

    return dataTicket$;
  }
}
