import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TicketState, ticketFeatureKey } from "../../reducers";

const selectTicket = createFeatureSelector<TicketState>(ticketFeatureKey);

export const listTicketSelector = createSelector(
  selectTicket,
  (ticket) => ticket.tickets
);
