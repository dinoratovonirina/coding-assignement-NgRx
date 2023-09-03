import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromActionTicket from "../../State/Actions/ticket/ticket.actions";
import {
  isLoaderSelector,
  listTicketSelector,
} from "src/app/State/Selectors/ticket/ticket.selectors";
import { Observable } from "rxjs";
import { Ticket } from "src/interfaces/ticket.interface";

@Component({
  selector: "app-list-ticket",
  templateUrl: "./list-ticket.component.html",
  styleUrls: ["./list-ticket.component.css"],
})
export class ListTicketComponent implements OnInit {
  tickets$: Observable<Ticket[]>;
  isLoader$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.iniListTicket();
  }

  iniListTicket() {
    this.store.dispatch(fromActionTicket.loadTickets());

    this.tickets$ = this.store.pipe(select(listTicketSelector));
    this.isLoader$ = this.store.pipe(select(isLoaderSelector));
  }
}