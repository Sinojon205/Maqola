import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocaleService} from "../../services/locale.service";
import {Router} from "@angular/router";
import {LocaleProp} from "../../types/locale-prop";
import {ArticleService} from "../../services/article.service";
import {Subscription} from "rxjs";
import {cleanSubscription} from "../../utils/subscription-util";
import {UserService} from "../../services/user.service";
import {mergeMap} from "rxjs/operators";
import {Article} from "../../types/Article";
import {Recensiya} from "../../types/recensiya";
import {Message} from "../../types/message";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, OnDestroy {
  props: LocaleProp | null = {};
  showHelp = false;
  articles: Article[] = []
  recensions: { [p: string]: Recensiya[] } = {};
  messages: { [p: string]: Message[] } = {};
  itemsType = 'all';
  pages: number[] = [];
  page = 1
  private count = 5
  private userSub: Subscription | null | undefined;
  private getSub: Subscription | null | undefined;

  constructor(private locale: LocaleService,
              private router: Router,
              private articleService: ArticleService,
              private userService: UserService) {
    this.props = this.locale.props;
    this.userSub = this.userService.getUsers().subscribe()
    this.getData(this.page)
  }

  get loading(): boolean {
    return this.articleService.loading;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.getSub = cleanSubscription(this.getSub);
    this.userSub = cleanSubscription(this.userSub);
  }

  onOpenRecensiya(a: Article, r: Recensiya) {
    this.articleService.selectedArticle = a;
    this.articleService.selectedMessage = r;
  }

  onOpenMessages(r: Article) {
    this.articleService.selectedArticle = r;
    this.router.navigate(['/messages']);
  }

  getData(i: number, itemsType = 'all') {
    this.itemsType = itemsType
    this.page = i
    cleanSubscription(this.getSub);
    this.getSub = this.articleService.getAllArticles(this.page, this.count, itemsType !== 'all')
      .subscribe((res: any) => {
        this.articles = res.articles;
        this.recensions = this.articleService.recensions;
        this.messages = this.articleService.messages;
        const pc = Math.ceil(res.total / this.count)
        this.pages = [];
        for (let i = 1; i <= pc; i++) {
          this.pages.push(i);
        }
      })
  }
}
