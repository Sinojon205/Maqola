import { Component, OnInit } from '@angular/core';
import {LocaleProp} from "../../types/locale-prop";
import {LocaleService} from "../../services/locale.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-help-view',
  templateUrl: './help-view.component.html',
  styleUrls: ['./help-view.component.scss']
})
export class HelpViewComponent implements OnInit {

  props: LocaleProp | null = {};
  showHelp = 1;

  constructor(private locale: LocaleService, private router: Router) {
    this.props = this.locale.props;
  }
  ngOnInit(): void {
  }

}
