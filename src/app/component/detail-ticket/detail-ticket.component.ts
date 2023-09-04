import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectTicketSelector } from "src/app/State/Selectors/ticket/ticket.selectors";
import { Ticket } from "src/interfaces/ticket.interface";
import { User } from "src/interfaces/user.interface";

@Component({
  selector: "app-detail-ticket",
  templateUrl: "./detail-ticket.component.html",
  styleUrls: ["./detail-ticket.component.css"],
})
export class DetailTicketComponent implements OnInit {
  detailTicket$: Observable<Ticket>;
  selectUserForAssign: number = null;
  listUser$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.onInitOneTicket();
  }

  onInitOneTicket() {
    this.detailTicket$ = this.store.pipe(select(selectTicketSelector));
  }

  onSelectUserForAssign() {}

  onPrecede() {
    this.router.navigate(["/list-ticket"]);
  }

  onComplete() {}
}
