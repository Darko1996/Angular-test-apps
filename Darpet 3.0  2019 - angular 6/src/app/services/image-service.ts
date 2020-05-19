import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { AngularFireAuth } from  "@angular/fire/auth";
import { GalleryImage } from '../models/galleryImage.model';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';//OVO OBAVEZNO DODATNO DA SE UBACI DA BI RADILO
import { map } from 'rxjs/operators/map' //OVO OBAVEZNO DODATNO DA SE UBACI DA BI RADILO

@Injectable()
export class ImageService {
    galleryRef: AngularFireList<GalleryImage>; 
    images: Observable<GalleryImage[]>;//OVO OBAVEZNO DODATNO DA SE UBACI DA BI RADILO

    private uid: string;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
        this.galleryRef = this.db.list('Projects'); //OVO OBAVEZNO DODATNO DA SE UBACI DA BI RADILO
        this.afAuth.authState.subscribe(auth => {
            if (auth !== undefined && auth !== null) {
                this.uid = auth.uid;
            }
        });
    }

    //OVO OBAVEZNO DODATNO DA SE UBACI DA BI RADILO
    getImages(): Observable<GalleryImage[]> {
        return this.galleryRef
            .snapshotChanges()
            .pipe(
                map(changes =>
                    changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
                )
            );
    }
}