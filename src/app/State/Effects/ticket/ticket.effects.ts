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
          tap(({ tickets }) => this.ticketService.setListTicket(tickets)),
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
              fromActionTicket.addTicketFailure({
                error: "Erreur d'Ajout ticket",
              })
            );
          })
        )
      )
    )
  );

  getOneTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.getOneTicket),
      mergeMap(({ id }) =>
        this.ticketService.getTicketById(+id).pipe(
          map((ticket: Ticket) =>
            fromActionTicket.getOneTicketSuccess({ ticket })
          ),
          catchError(() => {
            return of(
              fromActionTicket.getOneTicketFailure({
                error: "Erreur lors du filtre",
              })
            );
          })
        )
      )
    )
  );

  updateAssignTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.updateOneTicket),
      mergeMap(({ ticketId, userId }) =>
        this.ticketService.updateTicketOnSelectUser(ticketId, userId).pipe(
          map((ticket: Ticket) =>
            fromActionTicket.updateOneTicketSuccess({ ticket })
          ),
          catchError((error) => {
            return of(
              fromActionTicket.updateOneTicketFailure({
                error: "Erreur de recuperation " + error,
              })
            );
          })
        )
      )
    )
  );

  updateCompleteTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.updateCompleteOneTicket),
      mergeMap(({ ticketId }) =>
        this.ticketService.updateTicketonComplet(ticketId).pipe(
          map((ticket: Ticket) =>
            fromActionTicket.updateCompleteOneTicketSuccess({ ticket })
          ),
          catchError((error) => {
            return of(
              fromActionTicket.updateCompleteOneTicketFailure({
                error: "Erreur de recuperation",
              })
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ticketService: TicketsService
  ) {}
}
