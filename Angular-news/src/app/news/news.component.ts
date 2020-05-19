import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { slideIn } from '../animations';
import { NewsService } from './../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  animations: [slideIn]
})
export class NewsComponent implements OnInit {
  news: any[] = [];
  isLoading = false;

  constructor(public http: HttpClient, public newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNews().toPromise().then(data => {
      setTimeout(() => {
        this.isLoading = true;
        this.news = data;
      }, 2000);
    });
  }

}
