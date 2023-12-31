import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Ticket } from "src/interfaces/ticket.interface";
import * as fromAction from "../Actions/ticket/ticket.actions";

export const ticketFeatureKey = "tickets";

export interface TicketState {
  readonly [ticketFeatureKey]: Ticket[];
  readonly ticket: Ticket;
  readonly isLoader: boolean;
}

export const initialeState: TicketState = {
  [ticketFeatureKey]: [],
  ticket: {} as Ticket,
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
      [ticketFeatureKey]: props.tickets,
      isLoader: true,
    };
  }),
  on(fromAction.filterTicket, (state, props) => {
    const ticketAfterFilter: Ticket[] = state.tickets.filter(
      (ticket: Ticket) =>
        ticket.description.includes(props.critere) ||
        ticket.id.toString().includes(props.critere)
    );

    return {
      ...state,
      [ticketFeatureKey]: ticketAfterFilter,
    };
  }),
  on(fromAction.addTicketSuccess, (state, props) => {
    return {
      ...state,
      [ticketFeatureKey]: [...state.tickets, props.ticket],
    };
  }),
  on(fromAction.getOneTicketSuccess, (state, props) => {
    return {
      ...state,
      ticket: props.ticket,
    };
  }),
  on(fromAction.updateOneTicketSuccess, (state, props) => {
    const updateOneTicket: Ticket[] = state.tickets.map(
      (ticketForUpdate: Ticket) =>
        ticketForUpdate.id === props.ticket.id ? props.ticket : ticketForUpdate
    );

    return {
      ...state,
      ticket: props.ticket,
      [ticketFeatureKey]: updateOneTicket,
    };
  }),
  on(fromAction.updateCompleteOneTicketSuccess, (state, props) => {
    const updateOneTicket: Ticket[] = state.tickets.map(
      (ticketForUpdate: Ticket) =>
        ticketForUpdate.id === props.ticket.id ? props.ticket : ticketForUpdate
    );
    return {
      ...state,
      ticket: props.ticket,
      [ticketFeatureKey]: updateOneTicket,
    };
  })
);

export const metaReducers: MetaReducer<TicketState>[] = [];
