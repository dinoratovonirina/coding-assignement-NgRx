import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Ticket } from "src/interfaces/ticket.interface";
import * as fromAction from "../Actions/ticket/ticket.actions";

export const ticketFeatureKey = "tickets";

export interface TicketState {
  readonly [ticketFeatureKey]: Ticket[];
  readonly isLoader: boolean;
}

export const initialeState: TicketState = {
  [ticketFeatureKey]: [],
  isLoader: false,
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
      isLoader: true,
    };
  }),
  on(fromAction.addTicketSuccess, (state, props) => {
    return {
      ...state,
      tickets: [...state.tickets, props.ticket],
    };
  })
  /*on(fromAction.filterSuccess, (state, props) => {
    return {
      ...state,
      tickets: [props.ticket],
    };
  })*/
);

export const metaReducers: MetaReducer<TicketState>[] = [];
