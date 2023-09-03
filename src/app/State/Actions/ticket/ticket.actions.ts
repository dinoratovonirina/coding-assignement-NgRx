import { createAction, props } from "@ngrx/store";
import { Ticket } from "src/interfaces/ticket.interface";

export const loadTickets = createAction("[Ticket] Load Tickets");

export const loadTicketsSuccess = createAction(
  "[Ticket] Load Tickets Success",
  props<{ tickets: Ticket[] }>()
);

export const loadTicketsFailure = createAction(
  "[Ticket] Load Tickets Failure",
  props<{ error: Error | string }>()
);

/**************** Add Book *******************/
export const addTicket = createAction(
  "[Ticket] add Ticket",
  props<{ description: string }>()
);

export const addTicketSuccess = createAction(
  "[Ticket] add Tickets Success",
  props<{ ticket: Ticket }>()
);

export const addTicketFailure = createAction(
  "[Ticket] add Tickets Failure",
  props<{ error: Error | string }>()
);
