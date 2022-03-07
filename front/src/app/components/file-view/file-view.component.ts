import {Component, EventEmitter, Input, OnInit, Output, Sanitizer} from '@angular/core';
import {isImageFile} from "../../utils/check-utils";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit {
  @Input() file: File | undefined;
  @Output() actionEmit: EventEmitter<string> = new EventEmitter<string>()
  imgUrl: SafeUrl = './assets/file.jpg';
  fileType = '';

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    if (!this.file) {
      return
    }
    const name = this.file.name
    if (isImageFile(name)) {
      this.fileType = name.substring(name.lastIndexOf('.' + 1))
      this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.file));
    }
  }

  onDeleteFile() {
    this.actionEmit.emit(this.file?.name);
  }
}
