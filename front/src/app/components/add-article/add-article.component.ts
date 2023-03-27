import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LocaleProp} from "../../types/locale-prop";
import {LocaleService} from "../../services/locale.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Passport, User} from "../../types/user";
import {cleanSubscription} from "../../utils/subscription-util";
import {catchError, first, from, fromEvent, Observable, Subscription, timer} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ArticleService} from "../../services/article.service";
import * as JSZip from "jszip";
import {UserService} from "../../services/user.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertComponent} from "../alert/alert.component";

// @ts-ignore

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit, AfterViewInit {
  @ViewChild('openDialog', {static: true}) inputFile: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('inputBtn', {static: true}) inputBtnRef: ElementRef<HTMLButtonElement> | undefined;
  openDialog: HTMLInputElement | undefined;
  inputBtn: HTMLButtonElement | undefined;
  props: LocaleProp | null = {};
  authors: User [] = []
  files: any = {}
  udk = new FormControl('', [Validators.required]);
  financing = new FormControl('');
  title = new FormControl('', [Validators.required]);
  title1 = new FormControl('', [Validators.required]);
  annotation = new FormControl('');
  annotation1 = new FormControl('');
  keywords = new FormControl('', [Validators.required]);
  keywords1 = new FormControl('', [Validators.required]);
  liter = new FormControl('');
  liter1 = new FormControl('');
  ruInfoForm = new FormGroup({
    title: this.title,
    annotation: this.annotation,
    keywords: this.keywords,
    liter: this.liter
  });
  enInfoForm = new FormGroup({
    title: this.title1,
    annotation: this.annotation1,
    keywords: this.keywords1,
    liter: this.liter1
  });
  isAddUserOpen = false;
  authorName = '';
  otherDataForm = new FormGroup({
    udk: this.udk,
    financing: this.financing
  });
  private dialogSub: Subscription | undefined;
  private saveSub: Subscription | undefined;
  users: User[] = [];

  constructor(private locale: LocaleService,
              private router: Router,
              private dialog: MatDialog,
              private dlgRef: MatDialogRef<AddArticleComponent>,
              private userService: UserService,
              private articleService: ArticleService) {
    this.props = locale.props;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.inputFile && this.inputFile.nativeElement) {
      this.openDialog = this.inputFile.nativeElement;
    }
    if (this.inputBtnRef && this.inputBtnRef.nativeElement) {
      this.inputBtn = this.inputBtnRef.nativeElement;
    }
  }

  addUserClick() {
    this.isAddUserOpen = true;
  }

  selectUser(user: User) {
    if (!this.authors.find(it => it._id === user._id)) {
      this.authors.push(user)
    }
    this.authorName = '';
    this.isAddUserOpen = false;
  }

  onUploadClick(prop: string, type: string, isMultiple = true) {
    if (!this.openDialog) {
      return
    }
    cleanSubscription(this.dialogSub);
    this.dialogSub = fromEvent(this.openDialog, 'change').pipe(
      first(),
      tap(() => {
        if (!this.openDialog?.files) {
          return
        }
        // @ts-ignore
        if (!this.files[prop]) {
          this.files[prop] = [];
        }
        // @ts-ignore
        this.files[prop].push(...this.openDialog?.files)
      })).subscribe(result => {
      if (this.openDialog) {
        this.openDialog.multiple = false;
      }
    });
    this.openDialog.multiple = true;
    this.simulateClick(type, isMultiple);
  }

  private simulateClick(acceptType: string, isMultiple = false): void {
    if (!this.openDialog || !this.inputBtn) {
      return
    }
    this.openDialog.value = '';
    this.openDialog.accept = acceptType;
    this.openDialog.multiple = isMultiple
    this.openDialog.onchange = null;
    this.openDialog.oninput = null;
    const evt: MouseEvent = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    this.inputBtn.dispatchEvent(evt);
  }

  onSaveClick() {
    this.articleService.loading = true
    const article: any = this.otherDataForm.value
    article['basedata'] = [this.ruInfoForm.value, this.enInfoForm.value]
    const zip = new JSZip()
    for (const prop in this.files) {
      // @ts-ignore
      for (const file of this.files[prop]) {
        // @ts-ignore
        zip.folder(prop).file(file.name, file)
      }
    }
    cleanSubscription(this.saveSub);
    this.saveSub = from(zip.generateAsync({type: 'uint8array'})).pipe(mergeMap((res) => {
      article.files = Array.from(res)
      return this.articleService.createArticle(article)
    }), catchError(err => this.showAlert("Error", err.message))).subscribe((res: any) => {
      console.log(res)
      this.articleService.loading = false
      this.router.navigate(['main-view']).catch(() => '');
    }, (err) => {
      this.articleService.loading = false
      console.log(err)
    })
  }

  onActionEmit(evt: string, prop: string) {
    this.files[prop] = this.files[prop].filter((f: File) => f.name != evt)
  }

  onChangeUserInput(evt: any) {
    this.authorName = evt.target?.value || '';
    if (!this.authorName) {
      this.users = this.userService.users
    } else {
      this.users = this.userService.users.filter((it: User) => !!it.passports.find((p: Passport) => p.name.includes(this.authorName) ||
        p.familia.includes(this.authorName)))
    }
    this.users = this.users.filter(it => !this.authors.find(itt => it._id === itt._id))
  }

  delSelUser(id: number): void {
    this.authors.splice(id, 1);
  }

  onUsersBlur() {
    timer(400).subscribe(() => {
      this.users = [];
    });
  }

  private showAlert(header: string, message: string): Observable<any> {
    return this.dialog.open(AlertComponent, {
      width: '400px',
      disableClose: true,
      data: {header, message}
    }).afterClosed()
  }
}
