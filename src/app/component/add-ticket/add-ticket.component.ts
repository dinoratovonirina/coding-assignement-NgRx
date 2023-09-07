import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { of } from "rxjs";
import { concatMap, map, take, tap } from "rxjs/operators";
import { addTicket } from "src/app/State/Actions/ticket/ticket.actions";
import { listTicketSelector } from "src/app/State/Selectors/ticket/ticket.selectors";
import { TicketsService } from "src/app/services/tickets.service";
import { Ticket } from "src/interfaces/ticket.interface";

@Component({
  selector: "app-add-ticket",
  templateUrl: "./add-ticket.component.html",
  styleUrls: ["./add-ticket.component.css"],
})
export class AddTicketComponent implements OnInit {
  private _description: string = "";
  constructor(private store: Store, private ticketService: TicketsService) {}

  ngOnInit(): void {}

  get description(): string {
    return this._description;
  }

  set description(arg: string) {
    this._description = arg;
  }

  onAddTicket() {
    of(this.description)
      .pipe(
        concatMap((description) =>
          this.store.pipe(select(listTicketSelector)).pipe(
            map((tickets: Ticket[]) => {
              return [
                ...tickets,
                {
                  id: tickets.length,
                  completed: false,
                  assigneeId: null,
                  description: description,
                },
              ];
            })
          )
        ),
        take(1),
        tap((ticketList) => {
          this.ticketService.setListTicket(ticketList);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.store.dispatch(addTicket({ description: this.description }));
          this.description = "";
        }
        (error) => `Erreur lors de l'ajout ticket ${error}`;
      });
  }
}
