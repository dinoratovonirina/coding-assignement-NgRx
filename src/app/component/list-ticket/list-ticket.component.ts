import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromActionTicket from "../../State/Actions/ticket/ticket.actions";
import {
  isLoaderSelector,
  listTicketSelector,
} from "src/app/State/Selectors/ticket/ticket.selectors";
import { Observable, combineLatest, of } from "rxjs";
import { Ticket } from "src/interfaces/ticket.interface";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-ticket",
  templateUrl: "./list-ticket.component.html",
  styleUrls: ["./list-ticket.component.css"],
})
export class ListTicketComponent implements OnInit {
  tickets$: Observable<Ticket[]>;
  isLoader$: Observable<boolean>;
  argFilterTicket$: Observable<any>;

  constructor(private store: Store, private route: Router) {}

  ngOnInit(): void {
    this.iniListTicket();
  }

  iniListTicket() {
    this.store.dispatch(fromActionTicket.loadTickets());

    this.tickets$ = this.store.pipe(select(listTicketSelector));
    this.isLoader$ = this.store.pipe(select(isLoaderSelector));
  }

  onFilterTicket(arg: any) {
    this.argFilterTicket$ = of(arg);
    if (!!arg) {
      this.tickets$ = this.filterTicket(this.tickets$, this.argFilterTicket$);
    } else {
      this.iniListTicket();
    }
  }

  private filterTicket(
    listTicket$: Observable<Ticket[]>,
    argFilter$: Observable<any>
  ) {
    return combineLatest([listTicket$, argFilter$], (listTicket, argFilter) => {
      return listTicket.filter(
        (ticket: Ticket) =>
          ticket.description.includes(argFilter) ||
          ticket.id.toString().includes(argFilter)
      );
    });
  }

  onViewDetailTicket(arg: number) {
    this.route.navigate(["detail-ticket", arg]);
  }
}
