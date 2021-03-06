import {
  Component,
  OnInit
} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {NgForm} from '@angular/forms';
import {Tag} from '../../../models/tag';
import * as moment from 'moment';
import {Rank} from '../../../models/rank';
import {
  Document,
  Status
} from '../../../models/document';
import {AuthService} from '../../../core/services/auth.service';
import {Location} from '@angular/common';
import * as uuid from 'uuid';
import {DocumentLog} from '../../../models/document-log';
import {DocumentService} from '../../../services/document.service';

@Component({
  selector: 'app-create-doc',
  templateUrl: './create-doc.component.html',
  styleUrls: ['./create-doc.component.css']
})
export class CreateDocComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000'});

  tags: Tag[];
  ranks: Rank[];
  primary: any[];
  secondary: any[];
  content: string = '<span>My Document\'s Title</span>';
  initVersion: string = "1.0.0";

  constructor(private docService: DocumentService,
              private auth: AuthService,
              private location: Location) {
  }

  ngOnInit() {
    this.tags = JSON.parse(localStorage.getItem('tags'));
    this.ranks = JSON.parse(localStorage.getItem('ranks'));
  }

  public refreshPrimary(value: any): void {
    this.primary = value;
  }

  public refreshSecondary(value: any): void {
    this.secondary = value;
  }

  cancel() {
    this.location.back();
  }

  createDoc(form: NgForm) {
    if (form.valid) {
      const newDoc: Document = {
        id: uuid.v4(),
        name: form.value.regulationName as string,
        status: Status[Status.Draft],
        version: this.initVersion,
        isFile: !!this.uploader.queue.length,
        content: this.content,
        date: moment().format(),
        updated: moment().format(),
        comments: form.value.comments as string,
        primary: this.primary,
        secondary: this.secondary,
        tags: form.value.freeTags as string[],
        owner: this.auth.getUser()
      };
      try {
        this.docService.createDoc(newDoc);
        const documentLog: DocumentLog = {
          id: uuid.v4(),
          user: this.auth.getUser(),
          document: newDoc,
          changes: 'Document Created',
          date: Date.now()
        };
        this.docService.createDocumentLog(documentLog);
        this.location.back();
      } catch ($e) {
      }
    }
  }
}
