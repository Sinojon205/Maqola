import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {Article} from "../types/Article";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Recensiya} from "../types/recensiya";
import {Message} from "../types/message";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Article[] = []
  recensions: { [key: string]: Recensiya[] } = {}
  messages: { [key: string]: Message[] } = {}
  selectedArticle: Article | null = null
  selectedMessage: Recensiya | null = null;

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

  createMessage(msg: Message) {
    // @ts-ignore
    return this.http.post("/api/messages/", msg, {
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

  getAllArticles(): Observable<Article[]> {
    if (this.articles && this.articles.length > 0) {
      return of(this.articles);
    }
    return this.http.get("/api/articles/", {
      responseType: 'json'
    }).pipe(
      map((res: any) => {
        this.articles = res.articles;
        this.articles.forEach((it) => {
          this.recensions[it._id] = res.recens.filter((r: Recensiya) => r.maqolaid === it._id);
          this.messages[it._id] = res.messages.filter((m: Recensiya) => m.maqolaid === it._id);
        });
        return this.articles;
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
