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
    return this.backendService.newTicket({ description });
  }
}
