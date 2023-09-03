import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { addTicket } from "src/app/State/Actions/ticket/ticket.actions";

@Component({
  selector: "app-add-ticket",
  templateUrl: "./add-ticket.component.html",
  styleUrls: ["./add-ticket.component.css"],
})
export class AddTicketComponent implements OnInit {
  private _description: string = "";
  constructor(private store: Store) {}

  ngOnInit(): void {}

  get description(): string {
    return this._description;
  }

  set description(arg: string) {
    this._description = arg;
  }

  onAddTicket() {
    this.store.dispatch(addTicket({ description: this.description }));
  }
}
