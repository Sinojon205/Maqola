import {Component, OnInit} from '@angular/core';
import {Message} from "../../types/message";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../types/Article";
import {FormControl, FormGroup} from "@angular/forms";
import {Passport} from "../../types/user";
import {SignInService} from "../../services/sign-in.service";
import {HttpEventType} from "@angular/common/http";

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
    messageText: this.messageText,
  });
  passport: Passport | undefined | null = null;
  title: string = '';

  constructor(private articleService: ArticleService, private loginService: SignInService) {
    this.article = this.articleService.selectedArticle;
    if (this.article) {
      console.log(this.article);
      this.title = this.article.basedata[0].title || ''
      // @ts-ignore
      this.messages = this.articleService.messages[this.article._id];
    }
    this.passport = this.loginService.user?.passports[0];
  }

  ngOnInit(): void {
  }

  onSaveClick() {
    let msg = new Message();
    msg.maqolaid = this.article?._id;
    msg.addingdate = Date.now()
    msg.message = this.messageText.value;
    this.articleService.createMessage(msg).subscribe((res) => {
      if (res.type === HttpEventType.Response && this.article) {
        msg._id = res.body.id
        this.messages.push(msg);
      }
    });
  }
}
