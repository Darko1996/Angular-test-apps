import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations:[
    trigger('header', [state('', 
    style({
      opacity:1,
      transform: 'translateY(0)'
    })),
    transition('void => *', [
      style({
        opacity:0,
        transform: 'translateY(-100px)'
      }), animate(500)
    ])
  ])
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    
  }
}
