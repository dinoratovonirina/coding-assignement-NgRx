import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { reducers } from "./State/reducers/index";
import { EffectsModule } from "@ngrx/effects";
import { ticketFeatureKey } from "./State/reducers/index";
import { ListTicketComponent } from "./component/list-ticket/list-ticket.component";
import { AddTicketComponent } from "./component/add-ticket/add-ticket.component";
import { FilterTicketComponent } from "./component/filter-ticket/filter-ticket.component";
import { TicketEffects } from "./State/Effects/ticket/ticket.effects";
import { FormsModule } from "@angular/forms";
import { DetailTicketComponent } from "./component/detail-ticket/detail-ticket.component";
import { AppRoutingModule } from "./app-routing.module";
import { UsersService } from "./services/users.service";
import { TicketsService } from "./services/tickets.service";
import { DetailTicketResolver } from "./Resolvers/detailTicket.resolver";
import { userFeatureKey, usersReducer } from "./State/reducers/userReducer";
import { UserEffects } from "./State/Effects/user/user.effects";

@NgModule({
  declarations: [
    AppComponent,
    ListTicketComponent,
    AddTicketComponent,
    FilterTicketComponent,
    DetailTicketComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(
      { [ticketFeatureKey]: reducers, [userFeatureKey]: usersReducer },
      {
        runtimeChecks: {
          strictActionTypeUniqueness: true,
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([TicketEffects, UserEffects]),
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    BackendService,
    DetailTicketResolver,
    TicketsService,
    UsersService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
