import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LocaleProp} from "../../types/locale-prop";
import {LocaleService} from "../../services/locale.service";

export interface AlertData {
  header: string;
  message: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @ViewChild('firstElement', {static: true}) firstElement: ElementRef | undefined;
  props: LocaleProp | null = {};

  constructor(public dialogRef: MatDialogRef<AlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AlertData,
              locale: LocaleService) {
    this.props = locale.props;
  }

  onClose() {
    this.dialogRef.close();
  }
}
