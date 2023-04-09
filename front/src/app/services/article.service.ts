import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpParams} from "@angular/common/http";
import {Article} from "../types/Article";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Recensiya} from "../types/recensiya";
import {Message} from "../types/message";
import {UIConfig} from "../types/ui-config";
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Article[] = []
  recensions: { [key: string]: Recensiya[] } = {}
  messages: { [key: string]: Message[] } = {}
  selectedArticle: Article | null = null
  selectedMessage: Recensiya | null = null;
  loading = false;
  config: UIConfig

  constructor(private http: HttpClient, private mainService: MainService) {
    this.config = this.mainService.config
  }

  createArticle(article: Article) {
    // @ts-ignore
    return this.http.post(this.mainService.config.api + "api/articles/", article, {
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

  createMessage(msg: Message) {
    // @ts-ignore
    return this.http.post(this.mainService.config.api + "api/messages/", msg, {
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

  getAllArticles(page: number, count: number, forUser = false): Observable<any> {
    const params = new HttpParams().append("page", page).append("count", count)
    return this.http.get(this.mainService.config.api + `api/articles/${forUser ? "users" : ""}`, {
      responseType: 'json',
      params
    }).pipe(
      map((res: any) => {
        this.articles = res.articles;
        this.articles.forEach((it) => {
          this.recensions[it._id] = res.recens.filter((r: Recensiya) => r.maqolaid === it._id);
          this.messages[it._id] = res.messages.filter((m: Recensiya) => m.maqolaid === it._id);
        });
        return res;
      }));
  }

  reset() {
    this.articles = []
    this.recensions = {}
    this.messages = {}
    this.selectedArticle = null
    this.selectedMessage = null;
  }
}
