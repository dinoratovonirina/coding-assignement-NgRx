import { createReducer, MetaReducer, on, props } from "@ngrx/store";
import { Ticket } from "src/interfaces/ticket.interface";
import * as fromAction from "../Actions/ticket/ticket.actions";

export const ticketFeatureKey = "tickets";

export interface TicketState {
  readonly [ticketFeatureKey]: Ticket[];
}

export const initialeState: TicketState = {
  tickets: [],
};

export const reducers = createReducer(
  initialeState,
  on(fromAction.loadTickets, (state) => {
    return {
      ...state,
    };
  }),
  on(fromAction.loadTicketsSuccess, (state, props) => {
    return {
      ...state,
      tickets: props.tickets,
    };
  })
);

export const metaReducers: MetaReducer<TicketState>[] = [];
