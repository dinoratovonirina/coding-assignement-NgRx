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
      { [ticketFeatureKey]: reducers },
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
    EffectsModule.forRoot([TicketEffects]),
    FormsModule,
    AppRoutingModule,
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
