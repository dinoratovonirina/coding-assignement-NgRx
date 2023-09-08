import { Injectable } from "@angular/core";
import { BackendService } from "../backend.service";
import { BehaviorSubject } from "rxjs";
import { Ticket } from "src/interfaces/ticket.interface";
import { catchError } from "rxjs/operators";
import { error } from "console";

@Injectable({
  providedIn: "root",
})
export class TicketsService {
  private _listTicket$: BehaviorSubject<Ticket[]> = new BehaviorSubject<
    Ticket[]
  >([]);

  constructor(private readonly backendService: BackendService) {}

  get listTikets() {
    return this.backendService
      .tickets()
      .pipe(catchError((error) => `Erreur : ${error}`));
  }

  get listTicketBehavior() {
    return this._listTicket$;
  }

  setListTicket(arg: Ticket[]) {
    this._listTicket$.next(arg);
  }

  getValueListTicket(): Ticket[] {
    return this._listTicket$.value;
  }

  addTicket(description) {
    return this.backendService
      .newTicket({ description: description })
      .pipe(catchError((error) => `Erreur : ${error}`));
  }

  getTicketById(arg: number) {
    return this.backendService
      .ticket(arg)
      .pipe(catchError((error) => `Erreur : ${error}`));
  }

  updateTicketonComplet(ticketId: number) {
    return this.backendService
      .complete(ticketId, true)
      .pipe(catchError((error) => `Erreur : ${error}`));
  }

  updateTicketOnSelectUser(ticketId: number, userId: number) {
    return this.backendService
      .assign(ticketId, userId)
      .pipe(catchError((error) => `Erreur : ${error}`));
  }
}
