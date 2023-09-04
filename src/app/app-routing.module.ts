import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListTicketComponent } from "./component/list-ticket/list-ticket.component";
import { DetailTicketComponent } from "./component/detail-ticket/detail-ticket.component";

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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
