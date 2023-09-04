import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActionTicket from "../../Actions/ticket/ticket.actions";
import { map, mergeMap, tap } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { TicketsService } from "src/app/services/tickets.service";
import { Ticket } from "src/interfaces/ticket.interface";
import { of } from "rxjs";

@Injectable()
export class TicketEffects {
  loadTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.loadTickets),
      mergeMap(() =>
        this.ticketService.listTikets.pipe(
          map((tickets: Ticket[]) =>
            fromActionTicket.loadTicketsSuccess({ tickets })
          ),

          catchError(() => {
            return of(
              fromActionTicket.loadTicketsFailure({
                error: "Erreur de récuperation",
              })
            );
          })
        )
      )
    )
  );

  addTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.addTicket),
      mergeMap(({ description }) =>
        this.ticketService.addTicket(description).pipe(
          map((ticket) => fromActionTicket.addTicketSuccess({ ticket })),
          catchError(() => {
            return of(
              fromActionTicket.loadTicketsFailure({
                error: "Erreur d'Ajout ticket",
              })
            );
          })
        )
      )
    )
  );

  /*filterTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.filterTicket),
      mergeMap(({ critere }) =>
        this.ticketService.filterTicket(+critere).pipe(
          map((ticket: Ticket) => fromActionTicket.filterSuccess({ ticket })),
          catchError(() => {
            return of(
              fromActionTicket.loadTicketsFailure({
                error: "Erreur lors du filtre",
              })
            );
          })
        )
      )
    )
  );*/

  constructor(
    private actions$: Actions,
    private ticketService: TicketsService
  ) {}
}
