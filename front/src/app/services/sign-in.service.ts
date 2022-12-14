import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  token: string = ''
  user: User | undefined | null;

  constructor(private http: HttpClient) {

  }

  authenticate(data: any): Observable<any> {
    return this.http.post("./auth/sign-in", data, {responseType: 'json'}).pipe(map((res: any) => {
      if (!!res.token) {
        this.token = res.token
        this.user = res.user
      }
      return res;
    }))
  }

  register(data: any): Observable<any> {
    return this.http.post("./auth/sign-up", data, {responseType: 'json'});
  }
}
