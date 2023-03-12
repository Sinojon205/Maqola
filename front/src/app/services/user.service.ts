import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "../types/user";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: any

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    if (this.users) {
      return of(this.users);
    }
    return this.http.get("/api/users/", {
      responseType: 'json',
    }).pipe(
      map((res: any) => {
        this.users = res.users;
        return this.users
      }));
  }

  updateUser(user: User): Observable<any> {
    return this.http.post("/api/users/update-user/" + user._id, user)
  }
}
