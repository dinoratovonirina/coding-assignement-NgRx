import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { getOneTicket } from "../State/Actions/ticket/ticket.actions";

@Injectable({ providedIn: "root" })
export class DetailTicketResolver implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = +route.params["id"];
    return this.store.dispatch(getOneTicket({ id: id }));
  }
}
