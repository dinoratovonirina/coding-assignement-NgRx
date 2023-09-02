import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActionTicket from "../../Actions/ticket/ticket.actions";
import { map, mergeMap, tap } from "rxjs/operators";
import { TicketsService } from "src/app/services/tickets.service";
import { Ticket } from "src/interfaces/ticket.interface";

@Injectable()
export class TicketEffects {
  loadTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.loadTickets),
      mergeMap(() =>
        this.ticketService.listTikets.pipe(
          map((tickets: Ticket[]) =>
            fromActionTicket.loadTicketsSuccess({ tickets })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ticketService: TicketsService
  ) {}
}
