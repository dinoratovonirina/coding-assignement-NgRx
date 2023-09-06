import { Injectable } from "@angular/core";
import { BackendService } from "../backend.service";

@Injectable({
  providedIn: "root",
})
export class TicketsService {
  constructor(private readonly backendService: BackendService) {}

  get listTikets() {
    return this.backendService.tickets();
  }

  addTicket(description) {
    return this.backendService.newTicket({ description: description });
  }

  getTicketById(arg: number) {
    return this.backendService.ticket(arg);
  }

  updateTicketonComplet(ticketId: number) {
    return this.backendService.complete(ticketId, true);
  }

  updateTicketOnSelectUser(ticketId: number, userId: number) {
    return this.backendService.assign(ticketId, userId);
  }
}
