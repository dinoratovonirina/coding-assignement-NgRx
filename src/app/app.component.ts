import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { loadTickets } from "./State/Actions/ticket/ticket.actions";
import { loadUsers } from "./State/Actions/user/user.action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Ticket";
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadTickets());
    this.store.dispatch(loadUsers());
  }
}
