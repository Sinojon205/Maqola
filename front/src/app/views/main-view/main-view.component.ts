import {Component, OnInit} from '@angular/core';
import {LocaleService} from "../../services/locale.service";
import {Router} from "@angular/router";
import {LocaleProp} from "../../types/locale-prop";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  props: LocaleProp | null = {};
  showHelp = false;

  constructor(private locale: LocaleService, private router: Router) {
    this.props = this.locale.props;
  }

  ngOnInit(): void {
  }
}
