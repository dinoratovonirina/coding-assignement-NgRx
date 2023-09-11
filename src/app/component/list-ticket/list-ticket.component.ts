import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  isLoaderSelector,
  listTicketSelector,
} from "src/app/State/Selectors/ticket/ticket.selectors";
import { Observable, of } from "rxjs";
import { Ticket } from "src/interfaces/ticket.interface";
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
    this.tickets$ = this.store.pipe(select(listTicketSelector));
    this.isLoader$ = this.store.pipe(select(isLoaderSelector));
  }

  onViewDetailTicket(arg: number) {
    this.route.navigate(["detail-ticket", arg]);
  }
}
