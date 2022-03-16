import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  breakpoint: any;
  constructor() { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
  }

  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }

}
