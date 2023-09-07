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
import { map, mergeMap, tap } from "rxjs/operators";
import { Ticket } from "src/interfaces/ticket.interface";
import { User } from "src/interfaces/user.interface";
import { isNull } from "util";

@Injectable({ providedIn: "root" })
export class DetailTicketResolver implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Ticket> {
    const id = +route.params["id"];
    let dataTicket$: Observable<any>;
    this.store.dispatch(getOneTicket({ id }));

    of(id)
      .pipe(
        mergeMap((id) =>
          this.store
            .pipe(select(listTicketSelector))
            .pipe(
              map((ticket: Ticket[]) =>
                ticket.find((ticket: Ticket) => ticket.id === id)
              )
            )
        ),
        mergeMap((ticket: Ticket) =>
          this.store.pipe(select(loadUserSelect)).pipe(
            map((users: User[]) => {
              return {
                ...ticket,
                assigneeName: !isNull(ticket.assigneeId)
                  ? users.find((user: User) => user.id == ticket.assigneeId)
                      .name
                  : null,
              };
            })
          )
        )
      )
      .subscribe((ticketDetail) => {
        if (ticketDetail) {
          dataTicket$ = of(ticketDetail);
        }

        (error) => alert(`Erreur de récuperation d'un ticket ${error}`);
      });

    return dataTicket$;
  }
}
