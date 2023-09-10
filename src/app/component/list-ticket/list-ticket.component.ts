import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  isLoaderSelector,
  listTicketSelector,
} from "src/app/State/Selectors/ticket/ticket.selectors";
import { Observable, of } from "rxjs";
import { Ticket } from "src/interfaces/ticket.interface";
import { Router } from "@angular/router";
import {
  filterTicket,
  loadTickets,
} from "src/app/State/Actions/ticket/ticket.actions";

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
    //this.tickets$ = this.ticketService.listTicketBehavior.asObservable();
    this.tickets$ = this.store.pipe(select(listTicketSelector));
    this.isLoader$ = this.store.pipe(select(isLoaderSelector));
  }

  onFilterTicket(arg: string) {
    this.argFilterTicket$ = of(arg);
    if (!!arg) {
      //this.tickets$ = this.filterTicket(this.tickets$, this.argFilterTicket$);
      this.store.dispatch(filterTicket({ critere: arg }));
    } else {
      this.store.dispatch(loadTickets());
    }
    this.tickets$ = this.store.pipe(select(listTicketSelector));
  }

  /*private filterTicket(
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
  }*/

  onViewDetailTicket(arg: number) {
    this.route.navigate(["detail-ticket", arg]);
  }
}
