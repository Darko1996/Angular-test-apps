import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { GalleryImage } from '../models/galleryImage.model';
import { ImageService } from '../services/image-service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnChanges{
  images: Observable<GalleryImage[]>;

  showSpinner: boolean = true;  //loading spinner

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.images = this.imageService.getImages();
    this.images.subscribe(() => this.showSpinner = false) //loading spinner
    
  }
  ngOnChanges() {
    this.images = this.imageService.getImages();
  }
  
  
}
