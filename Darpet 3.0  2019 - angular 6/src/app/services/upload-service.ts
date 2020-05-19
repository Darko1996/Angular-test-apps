import { Injectable } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { GalleryImage } from '../models/galleryImage.model';
import { Upload } from '../models/upload.model';
import firebase from '@firebase/app';
import '@firebase/storage';
import {AngularFireList, AngularFireDatabase } from 'angularfire2/database';//OVO OBAVEZNO DODATNO DA SE UBACI DA BI RADILO


@Injectable({
    providedIn: 'root'
})
export class UploadService {
    
    private basePath = '/Projects';

    private uploads: AngularFireList<GalleryImage[]>;//OVO OBAVEZNO DODATNO DA SE UBACI DA BI RADILO

    constructor(private ngFire: AngularFireModule, private db: AngularFireDatabase) { }

    uploadFile(upload: Upload) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            //three observers

            // 1.) state_changed observer
            (snapshot) => {
                // upload in progress
                upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
                console.log(upload.progress);
            },
            //2.)error observer
            (error) => {
                //error upload failed
                console.log(error);
            },
            // 3.) succes observer

            (): any => {
                //OVO OBAVEZNO DODATNO DA SE UBACI DA BI RADILO!!!!
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    upload.url = downloadURL;
                    upload.name = upload.file.name;
                    this.saveFileData(upload);
                });
            }
        );
    }
    private saveFileData(upload: Upload) {
        this.db.list(`${this.basePath}/`).push(upload);
        console.log("Files saved!:" + upload.url);
    }

}