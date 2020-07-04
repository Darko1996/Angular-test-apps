import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  animations:[
    trigger('about-us', [state('', style({
      opacity: 1,
      transform: 'transformX(0)'
    })),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'transformX(-100px)'
      }), animate(700)
    ])
  ])
  ]
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}
