import {Component, OnInit} from '@angular/core';
import {Message} from "../../types/message";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../types/Article";
import {FormControl, FormGroup} from "@angular/forms";
import {Passport} from "../../types/user";
import {SignInService} from "../../services/sign-in.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  article: Article | undefined | null;
  messageText = new FormControl('');
  messageForm = new FormGroup({
    message: this.messageText,
  });
  passport: Passport | undefined | null = null;
  title: string = '';

  constructor(private articleService: ArticleService, private loginService: SignInService) {
    this.article = this.articleService.selectedArticle;
    if (this.article) {
      this.title = this.article.basedata[0].title || ''
      // @ts-ignore
      this.messages = this.articleService.messages[this.article._id];
    }
    this.passport = this.loginService.user?.passports[0];
  }

  ngOnInit(): void {
  }

  onSaveClick() {

  }
}
