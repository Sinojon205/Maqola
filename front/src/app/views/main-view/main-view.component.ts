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
  getSub: Subscription | null | undefined;
  articles: Article[] = []
  recensions: { [p: string]: Recensiya[] } = {};
  messages: { [p: string]: Message[] } = {};

  constructor(private locale: LocaleService,
              private router: Router,
              private articleService: ArticleService,
              private userService: UserService) {
    this.props = this.locale.props;
    this.getSub = this.userService.getUsers()
      .pipe(mergeMap(() => this.articleService.getAllArticles()))
      .subscribe((res: any) => {
        this.articles = res;
        this.recensions = this.articleService.recensions;
        this.messages = this.articleService.messages;
      })
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.getSub = cleanSubscription(this.getSub);
  }

  onOpenRecensiya(a: Article, r: Recensiya) {
    this.articleService.selectedArticle = a;
    this.articleService.selectedMessage = r;
  }

  onOpenMessages(r: Article) {
    this.articleService.selectedArticle = r;
    this.router.navigate(['/messages']);
  }
}
