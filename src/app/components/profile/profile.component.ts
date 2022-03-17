import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fechaCreate : any = "16/03/2022";
  name : any = "Mezeeeee"
  email : any = "meze@meze.com"

  breakpoint: any;
  constructor() { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
  }

  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }


}
