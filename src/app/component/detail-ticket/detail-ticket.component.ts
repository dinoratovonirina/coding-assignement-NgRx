import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { BehaviorSubject, Observable, combineLatest, of } from "rxjs";
import { filter, map, mergeMap, take, tap } from "rxjs/operators";
import {
  updateCompleteOneTicket,
  updateOneTicket,
} from "src/app/State/Actions/ticket/ticket.actions";
import {
  listTicketSelector,
  selectTicketSelector,
} from "src/app/State/Selectors/ticket/ticket.selectors";
import { loadUserSelect } from "src/app/State/Selectors/user/user.selectors";
import { Ticket } from "src/interfaces/ticket.interface";
import { User } from "src/interfaces/user.interface";
import { isNull } from "util";

@Component({
  selector: "app-detail-ticket",
  templateUrl: "./detail-ticket.component.html",
  styleUrls: ["./detail-ticket.component.css"],
})
export class DetailTicketComponent implements OnInit {
  detailTicket$: Observable<Ticket>;
  selectUserForAssign: number = null;
  private _selectUserForAssign$: BehaviorSubject<number> =
    new BehaviorSubject<number>(null);
  listUser$: Observable<User[]>;
  id: number = this.route.snapshot.params["id"];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.onInitOneTicket();
  }

  get selectUserForAssignObs(): Observable<number> {
    return this._selectUserForAssign$.asObservable();
  }

  getselectUserForAssignObsValue() {
    return this._selectUserForAssign$.value;
  }

  setSelectUserForAssign(arg: number) {
    this._selectUserForAssign$.next(arg);
  }

  onInitOneTicket() {
    this.route.data.subscribe((detaiTicket) => {
      if (!!detaiTicket.ticket) {
        this.detailTicket$ = of(detaiTicket.ticket);
      } else {
        this.detailTicket$ = this.store.pipe(select(selectTicketSelector)).pipe(
          filter((ticket: Ticket) => {
            return Object.keys(ticket).length !== 0;
          }),
          mergeMap((ticket: Ticket) =>
            this.store.pipe(select(loadUserSelect)).pipe(
              filter((users: User[]) => {
                return users.length > 0;
              }),
              map((users: User[]) => {
                return {
                  ...ticket,
                  assigneeName: !isNull(ticket.assigneeId)
                    ? users.find((user: User) => user.id == ticket.assigneeId)
                        .name
                    : null,
                };
              })
            )
          )
        );
      }
      this.listUser$ = this.store.pipe(select(loadUserSelect));
    });
  }

  onSelectUserForAssign() {
    if (this.selectUserForAssign) {
      this.setSelectUserForAssign(this.selectUserForAssign);

      this.store.dispatch(
        updateOneTicket({
          ticketId: +this.id,
          userId: +this.selectUserForAssign,
        })
      );

      if (confirm("Voulez-vous assigner ce ticket à cette personne?")) {
        this.detailTicket$ = this.store.pipe(select(listTicketSelector)).pipe(
          map((tickets: Ticket[]) =>
            tickets.find((ticket: Ticket) => {
              return ticket.id == this.id;
            })
          ),
          take(1),
          mergeMap((ticket: Ticket) =>
            this.store.pipe(select(loadUserSelect)).pipe(
              map((users: User[]) => {
                return {
                  ...ticket,
                  assigneeId: this.selectUserForAssign,
                  assigneeName: users.find(
                    (user: User) => user.id == this.selectUserForAssign
                  ).name,
                };
              })
            )
          )
        );
      }
    }
  }

  onComplete() {
    if (confirm("Voulez-vous fermer ce ticket?")) {
      this.store.dispatch(
        updateCompleteOneTicket({
          ticketId: +this.id,
        })
      );

      combineLatest([
        this.store.pipe(select(listTicketSelector)),
        this.store.pipe(select(loadUserSelect)),
        this.selectUserForAssignObs,
        of(this.id),
      ])
        .pipe(
          map(([tickets, users, selectUserAssign, id]) => {
            return tickets
              .filter((ticket: Ticket) => ticket.id == id)
              .map((ticket: Ticket) => {
                let assigneeIdTicket =
                  selectUserAssign == null
                    ? ticket.assigneeId
                    : selectUserAssign;

                return {
                  ...ticket,
                  assigneeId: +assigneeIdTicket,
                  assigneeName: !isNaN(ticket.assigneeId)
                    ? users
                        .filter((user: User) => +user.id == +assigneeIdTicket)
                        .shift().name
                    : null,
                  completed: true,
                };
              });
          })
        )
        .subscribe(
          (detailOnTicketComplet) => {
            this.detailTicket$ = of(detailOnTicketComplet.shift());
          },
          (error) =>
            alert(`Erreur ${error} de recupération du ticket n°: ${this.id}`)
        );
    }
  }

  onPrecede() {
    this.router.navigate(["/list-ticket"]);
  }
}
