import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListTicketComponent } from "./component/list-ticket/list-ticket.component";
import { DetailTicketComponent } from "./component/detail-ticket/detail-ticket.component";
import { DetailTicketResolver } from "./Resolvers/detailTicket.resolver";

const routes: Routes = [
  {
    path: "",
    redirectTo: "list-ticket",
    pathMatch: "full",
  },
  {
    path: "list-ticket",
    component: ListTicketComponent,
  },
  {
    path: "detail-ticket/:id",
    component: DetailTicketComponent,
    resolve: { ticket: DetailTicketResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
