import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
import {Article} from "../types/Article";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {

  }

  createArticle(article: Article) {
    // @ts-ignore
    return this.http.post("/api/articles/", article, {
      responseType: 'json',
      observe: 'events',
      reportProgress: true
    }).pipe(
      map((res: any) => {
        if (res.type === HttpEventType.UploadProgress) {
          return Math.round(100 * res.loaded / (res.total ?? 0))
        } else if (res.type === HttpEventType.Sent) {
          return 0
        } else if (res.type === HttpEventType.Response) {
          return res
        }
      })
    )
  }
}
