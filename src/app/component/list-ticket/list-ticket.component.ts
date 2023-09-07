import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  isLoaderSelector,
  listTicketSelector,
} from "src/app/State/Selectors/ticket/ticket.selectors";
import { Observable, combineLatest, of } from "rxjs";
import { Ticket } from "src/interfaces/ticket.interface";
import { Router } from "@angular/router";
import { TicketsService } from "src/app/services/tickets.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-list-ticket",
  templateUrl: "./list-ticket.component.html",
  styleUrls: ["./list-ticket.component.css"],
})
export class ListTicketComponent implements OnInit {
  tickets$: Observable<any>;
  isLoader$: Observable<boolean>;
  argFilterTicket$: Observable<any>;

  constructor(
    private store: Store,
    private route: Router,
    private ticketService: TicketsService
  ) {}

  ngOnInit(): void {
    this.iniListTicket();
  }

  iniListTicket() {
    this.tickets$ = this.ticketService.listTicketBehavior.asObservable();
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
