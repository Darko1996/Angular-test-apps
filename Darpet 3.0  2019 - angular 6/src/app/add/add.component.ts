import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Upload } from '../models/upload.model';
import { UploadService } from '../services/upload-service';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { range, each } from 'lodash';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  animations: [
    trigger('add', [state('', style({
      opacity: 1,
      transform: 'scale(1)'
    })),
    transition('void => *', [style({
      opacity: 0,
      transform: 'scale(1.2)'
    }), animate(500)
    ])
    ])
  ]
})
export class AddComponent implements OnInit {

  files: FileList;
  upload: Upload;

  constructor(private router: Router, private uploadService: UploadService) { }

  handleFiles(event) {
    this.files = event.target.files;
  }

  ngOnInit() {
  }
  onHome() {
    this.router.navigate(['/']);
  }
  //druga verzija bez loadesha
  uploadFiles() {
    for (let i = 0; i < this.files.length; i++) {
      this.upload = new Upload(this.files[i]);
      this.uploadService.uploadFile(this.upload);
    }
    alert("Images added!");
  };

  /* originalna verzija
    uploadFiles(){
    const fileToUpload = this.files;
      const filesIdx = range(fileToUpload.length);
      each(filesIdx, (idx) => {
      this.upload = new Upload(fileToUpload[idx]);
      this.uploadService.uploadFile(this.upload);
  });
  alert("Image added!")
  } */


}
