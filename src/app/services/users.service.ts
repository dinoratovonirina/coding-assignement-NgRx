import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/interfaces/user.interface";
import { BackendService } from "../backend.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private readonly backendService: BackendService) {}

  get listUsers(): Observable<User[]> {
    return this.backendService.users();
  }
}
